"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Dictionary_1 = require("./Dictionary");
var RecordData_1 = require("./RecordData");
var path = require("path");
var fs = require("fs");
var RecordFactory_1 = require("./RecordFactory");
var util_1 = require("util");
var io_1 = require("./io");
var List_1 = require("./List");
var Long = require("long");
var _ = require("lodash");
var mkdirp = require("mkdirp");
var DatContainer = /** @class */ (function () {
    function DatContainer(directory, filePath, x) {
        var _this = this;
        this.DataSectionDataLength = 0;
        if (filePath !== undefined && filePath.length > 0) {
            this.Directory = directory;
            this.DatName = path.basename(filePath, ".dat");
            this.Path = directory;
            RecordFactory_1.default.initialize();
            try {
                var recordGuard = RecordFactory_1.default.GetRecordInfo(this.DatName);
                if (util_1.isNullOrUndefined(recordGuard)) {
                    var errorString = "Could not find records for file: " + this.DatName;
                    this.SaveError(errorString);
                    throw new Error(errorString);
                }
                this.RecordInfo = recordGuard;
                DatContainer.DataEntries = new Dictionary_1.default();
                DatContainer.DataPointers = new Dictionary_1.default();
                var fileToRead = directory + "/" + filePath;
                var fileBytes = fs.readFile(fileToRead, function (err, data) {
                    var br = new io_1.BinaryReader(data, true);
                    _this.Read(br);
                    x(_this);
                });
            }
            catch (e) {
                console.log(e);
            }
        }
    }
    DatContainer.prototype.SaveError = function (errorString) {
        var pathToCreate = path.join(this.Directory, "error");
        mkdirp.sync(pathToCreate);
        var workingFile = this.DatName;
        var errorPath = path.join(this.Directory, "error", workingFile + ".txt");
        fs.writeFile(errorPath, errorString, { flag: 'w' }, function (err) {
            if (err)
                throw err;
            console.log("Error details saved for file: " + workingFile);
        });
    };
    DatContainer.prototype.Read = function (inStream) {
        try {
            this.Length = inStream.buffer.capacity();
            DatContainer.DataSectionOffset = 0;
            if (util_1.isNullOrUndefined(this.RecordInfo)) {
                var errorString = "Missing dat parser for file: " + this.DatName;
                this.SaveError(errorString);
                throw new Error(errorString);
            }
            this.Count = inStream.ReadInt32();
            //find record length
            var actualRecordLength = this.FindRecordLength(inStream, this.Count);
            var errorString = "Actual record length = " + actualRecordLength + " not equal length by the sum of each record in the xml specification: " + this.RecordInfo.Length;
            if (actualRecordLength != this.RecordInfo.Length) {
                this.SaveError(errorString);
                throw new Error(errorString);
            }
            DatContainer.DataSectionOffset = this.Count * actualRecordLength + 4;
            this.DataSectionDataLength = this.Length - DatContainer.DataSectionOffset - 8;
            inStream.seek(DatContainer.DataSectionOffset);
            var pattern = Long.fromNumber(0xBBbbBBbbBBbbBBbb, true);
            if (inStream.ReadUInt64().toNumber() !== pattern.toNumber()) {
                throw new Error("Missing magic number after records");
            }
            inStream.seek(0);
            this._originalData = inStream.ReadBytes(this.Length);
            //read records
            if (actualRecordLength === 0) {
                this.Records = new List_1.default();
                return;
            }
            this.Records = new List_1.default();
            for (var i = 0; i < this.Count; i++) {
                console.log("Processing record index:", i, " out of:", this.Count);
                var recordData = new RecordData_1.default(this.RecordInfo, inStream, i);
                this.Records.add(recordData);
                recordData = null;
            }
        }
        catch (e) {
            console.log(e);
        }
    };
    DatContainer.prototype.SaveToCsv = function () {
        console.log("Converting Records to CSV...");
        fs.writeFile("./" + this.DatName + ".csv", this.GetCsvFormat(), function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });
    };
    DatContainer.prototype.SaveToJson = function () {
        console.log("Converting Records to JSON...");
        var pathToCreate = path.join(this.Path, "json");
        mkdirp.sync(pathToCreate);
        var jsonPath = this.Path + "/json/" + this.DatName + ".json";
        var jsonToWrite = this.GetJsonFormat();
        fs.writeFile(jsonPath, jsonToWrite, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });
        return "/json/" + this.DatName + ".json";
    };
    DatContainer.prototype.constructJson = function (csv) {
        var content = csv.split('\r\n');
        var header = content[0].split(',');
        return _.tail(content).map(function (row) {
            return _.zipObject(header, row.split(','));
        });
    };
    DatContainer.prototype.FindRecordLength = function (inStream, numberOfEntries) {
        if (numberOfEntries === 0) {
            return 0;
        }
        if (util_1.isNullOrUndefined(inStream)) {
            return 0;
        }
        inStream.seek(4);
        var stringLength = inStream.buffer.capacity();
        var recordLength = 0;
        for (var i = 0; inStream.position() <= stringLength - 8; i++) {
            var ul = inStream.ReadUInt64();
            var pattern = Long.fromNumber(0xBBbbBBbbBBbbBBbb, true);
            if (ul.toNumber() === pattern.toNumber()) {
                recordLength = i;
                break;
            }
            inStream.seek(inStream.position() - 8 + numberOfEntries);
        }
        return recordLength;
    };
    DatContainer.prototype.GetJsonFormat = function () {
        var _this = this;
        var jsonArray = [];
        var result = "";
        var json = {};
        if (this.Records && this.RecordInfo) {
            this.Records.toArray().forEach(function (recordData) {
                json = {};
                json["Row"] = _this.Records.indexOf(recordData);
                recordData.FieldsData.toArray().forEach(function (fieldData) {
                    json[fieldData.FieldInfo.Id] = fieldData.Data.GetValueString();
                });
                jsonArray.push(json);
            });
        }
        return JSON.stringify(jsonArray, null, "\t");
    };
    DatContainer.prototype.GetCsvFormat = function () {
        var _this = this;
        var separator = ",";
        var csv = "";
        if (this.Records && this.RecordInfo) {
            var fieldInfos = this.RecordInfo.Fields;
            if (this.RecordInfo.Length === 0) {
                var line = "Count: " + this.Count;
                csv = csv.concat(line);
                return csv;
            }
            //add header
            var line = "Rows" + separator;
            csv = csv.concat(line);
            fieldInfos.toArray().forEach(function (field) {
                var line = "" + field.Id + separator;
                csv = csv.concat(line);
            });
            //Remove last comma
            csv = csv.replace(/,\s*$/, "");
            csv = csv.concat("\r\n");
            this.Records.toArray().forEach(function (recordData) {
                //Add index
                //console.log("RECORD DATA:", recordData);
                var line = "" + _this.Records.indexOf(recordData) + separator;
                csv = csv.concat(line);
                //recordData.RecordInfo.Fields.toArray().forEach(test => {
                //	console.log("RECORD INFO FIELD: ", test);
                //})
                //Add fields
                recordData.FieldsData.toArray().forEach(function (fieldData) {
                    var line = "" + _this.getCsvString(fieldData) + separator;
                    //console.log("FIELD DATA: ", fieldData);
                    csv = csv.concat(line);
                });
                csv = csv.replace(/,\s*$/, "");
                csv = csv.concat("\r\n");
            });
            csv = csv.replace(/,\s*$/, "");
            csv = csv.concat("\r\n");
        }
        return csv;
    };
    DatContainer.prototype.getCsvString = function (fieldData) {
        var str = fieldData.Data.GetValueString();
        var match = new RegExp(/(?:\r|\n|,)/gm);
        if (match.test(str)) {
            var replacement = str.replace("\"", "\"\"");
            str = "\"" + replacement + "\"";
        }
        return str;
    };
    DatContainer.DataSectionOffset = 0;
    return DatContainer;
}());
exports.DatContainer = DatContainer;
//# sourceMappingURL=DatContainer.js.map