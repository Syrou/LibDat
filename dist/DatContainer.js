"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Dictionary_1 = require("./Dictionary");
const RecordData_1 = require("./RecordData");
const path = require("path");
const fs = require("fs");
const RecordFactory_1 = require("./RecordFactory");
const util_1 = require("util");
const io_1 = require("./io");
const List_1 = require("./List");
const Long = require("long");
const _ = require("lodash");
const mkdirp = require("mkdirp");
class DatContainer {
    constructor(directory, filePath, x) {
        this.DataSectionDataLength = 0;
        if (filePath !== undefined && filePath.length > 0) {
            this.Directory = directory;
            this.DatName = path.basename(filePath, ".dat");
            this.Path = directory;
            RecordFactory_1.default.initialize();
            try {
                var recordGuard = RecordFactory_1.default.GetRecordInfo(this.DatName);
                if (util_1.isNullOrUndefined(recordGuard)) {
                    var errorString = `Could not find records for file: ${this.DatName}`;
                    this.SaveError(errorString);
                    throw new Error(errorString);
                }
                this.RecordInfo = recordGuard;
                DatContainer.DataEntries = new Dictionary_1.default();
                DatContainer.DataPointers = new Dictionary_1.default();
                var fileToRead = `${directory}/${filePath}`;
                var fileBytes = fs.readFile(fileToRead, (err, data) => {
                    var br = new io_1.BinaryReader(data, true);
                    this.Read(br);
                    x(this);
                });
            }
            catch (e) {
                console.log(e);
            }
        }
    }
    SaveError(errorString) {
        var pathToCreate = path.join(this.Directory, "error");
        mkdirp.sync(pathToCreate);
        var workingFile = this.DatName;
        var errorPath = path.join(this.Directory, "error", `${workingFile}.txt`);
        fs.writeFile(errorPath, errorString, { flag: 'w' }, function (err) {
            if (err)
                throw err;
            console.log(`Error details saved for file: ${workingFile}`);
        });
    }
    Read(inStream) {
        try {
            this.Length = inStream.buffer.capacity();
            DatContainer.DataSectionOffset = 0;
            if (util_1.isNullOrUndefined(this.RecordInfo)) {
                var errorString = `Missing dat parser for file: ${this.DatName}`;
                this.SaveError(errorString);
                throw new Error(errorString);
            }
            this.Count = inStream.ReadInt32();
            //find record length
            var actualRecordLength = this.FindRecordLength(inStream, this.Count);
            var errorString = `Actual record length = ${actualRecordLength} not equal length by the sum of each record in the xml specification: ${this.RecordInfo.Length}`;
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
    }
    SaveToCsv() {
        console.log("Converting Records to CSV...");
        fs.writeFile(`./${this.DatName}.csv`, this.GetCsvFormat(), function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });
    }
    SaveToJson() {
        console.log("Converting Records to JSON...");
        var pathToCreate = path.join(this.Path, "json");
        mkdirp.sync(pathToCreate);
        var jsonPath = `${this.Path}/json/${this.DatName}.json`;
        var jsonToWrite = this.GetJsonFormat();
        fs.writeFile(jsonPath, jsonToWrite, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });
        return `/json/${this.DatName}.json`;
    }
    constructJson(csv) {
        const content = csv.split('\r\n');
        const header = content[0].split(',');
        return _.tail(content).map((row) => {
            return _.zipObject(header, row.split(','));
        });
    }
    FindRecordLength(inStream, numberOfEntries) {
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
    }
    GetJsonFormat() {
        var jsonArray = [];
        var result = "";
        var json = {};
        if (this.Records && this.RecordInfo) {
            this.Records.toArray().forEach(recordData => {
                json = {};
                json["Row"] = this.Records.indexOf(recordData);
                recordData.FieldsData.toArray().forEach(fieldData => {
                    json[fieldData.FieldInfo.Id] = fieldData.Data.GetValueString();
                });
                jsonArray.push(json);
            });
        }
        return JSON.stringify(jsonArray, null, "\t");
    }
    GetCsvFormat() {
        const separator = ",";
        var csv = "";
        if (this.Records && this.RecordInfo) {
            var fieldInfos = this.RecordInfo.Fields;
            if (this.RecordInfo.Length === 0) {
                var line = `Count: ${this.Count}`;
                csv = csv.concat(line);
                return csv;
            }
            //add header
            var line = `Rows${separator}`;
            csv = csv.concat(line);
            fieldInfos.toArray().forEach(field => {
                var line = `${field.Id}${separator}`;
                csv = csv.concat(line);
            });
            //Remove last comma
            csv = csv.replace(/,\s*$/, "");
            csv = csv.concat("\r\n");
            this.Records.toArray().forEach(recordData => {
                //Add index
                //console.log("RECORD DATA:", recordData);
                var line = `${this.Records.indexOf(recordData)}${separator}`;
                csv = csv.concat(line);
                //recordData.RecordInfo.Fields.toArray().forEach(test => {
                //	console.log("RECORD INFO FIELD: ", test);
                //})
                //Add fields
                recordData.FieldsData.toArray().forEach(fieldData => {
                    var line = `${this.getCsvString(fieldData)}${separator}`;
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
    }
    getCsvString(fieldData) {
        var str = fieldData.Data.GetValueString();
        var match = new RegExp(/(?:\r|\n|,)/gm);
        if (match.test(str)) {
            var replacement = str.replace("\"", "\"\"");
            str = `\"${replacement}\"`;
        }
        return str;
    }
}
DatContainer.DataSectionOffset = 0;
exports.DatContainer = DatContainer;
//# sourceMappingURL=DatContainer.js.map