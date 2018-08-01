"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Dictionary_1 = require("./Dictionary");
const RecordInfo_1 = require("./RecordInfo");
const TypeFactory_1 = require("./Types/TypeFactory");
const fs = require("fs");
const path = require("path");
const util_1 = require("util");
const FieldInfo_1 = require("./FieldInfo");
const List_1 = require("./List");
class RecordFactory {
    static initialize() {
        this.UpdateRecordsInfo();
    }
    static UpdateRecordsInfo() {
        this.Records = new Dictionary_1.default();
        TypeFactory_1.default.LoadValueTypes();
        var definitionPath = path.join(__dirname, "./DatDefinitions.json");
        var data = fs.readFileSync(definitionPath);
        var dataAsJson = JSON.parse(data);
        var records = dataAsJson.definitions.records;
        if (records === null) {
            throw new Error("Did not find any record definitions in json file");
        }
        records.forEach((element) => {
            this.ProcessRecordDefinition(element);
        });
        dataAsJson = null;
    }
    static ProcessRecordDefinition(object) {
        var file = object.file;
        if (util_1.isNullOrUndefined(file)) {
            var error = `Invalid Record: record has wrong attribute 'id': ${object}`;
            throw new Error(error);
        }
        //var lengthString = this.GetAttributeValue(element, "length");
        /*if(isNullOrUndefined(lengthString)){
            var error = `Invalid XML: record has wrong attribute 'length': ${element}`
            throw new Error(error);
        }
        var length:number = Number(lengthString)
        if(length === 0){
            this.Records.setValue(file, new RecordInfo(file));
            return;
        }*/
        var fields = new List_1.default();
        var index = 0;
        var totalLength = 0;
        if (object.fields && object.fields.length > 0) {
            object.fields.forEach((field, iteration) => {
                var fieldId = field.id;
                if (util_1.isNullOrUndefined(fieldId)) {
                    throw new Error(`Invalid Json: field with index ${iteration} has no 'id'`);
                }
                var fieldType = field.type;
                if (util_1.isNullOrUndefined(fieldType)) {
                    throw new Error(`Invalid Json: field with index ${iteration} has no 'type'`);
                }
                var dataType = TypeFactory_1.default.ParseType(fieldType);
                var fieldDescription = field.description;
                var isUserString = field.isUser;
                var isUser = this.isNullOrEmpty(isUserString);
                fields.add(new FieldInfo_1.default(dataType, index, totalLength, fieldId, fieldDescription, isUser));
                index++;
                totalLength += dataType.Width;
            });
            this.Records.setValue(file, new RecordInfo_1.default(file, totalLength, fields));
        }
    }
    static isNullOrEmpty(s) {
        if (util_1.isUndefined(s)) {
            return true;
        }
        return !s;
    }
    static HasRecordInfo(fileName) {
        fileName = path.basename(fileName, '.dat');
        return this.Records.containsKey(fileName);
    }
    static GetRecordInfo(datName) {
        if (!this.Records.containsKey(datName)) {
            //throw new Error("Not defined parser for filename: "+datName);
        }
        console.log("RECORDS LENGTH: ", this.Records.size());
        console.log("DOES IT?: ", this.Records.containsKey(datName));
        console.log("HMMM: ", this.Records.getValue(datName));
        return this.Records.getValue(datName);
    }
}
RecordFactory.Records = new Dictionary_1.default();
exports.default = RecordFactory;
//# sourceMappingURL=RecordFactory2.js.map