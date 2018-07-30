"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Dictionary_1 = require("./Dictionary");
var RecordInfo_1 = require("./RecordInfo");
var TypeFactory_1 = require("./Types/TypeFactory");
var xmldoc_1 = require("xmldoc");
var fs = require("fs");
var path = require("path");
var util_1 = require("util");
var FieldInfo_1 = require("./FieldInfo");
var List_1 = require("./List");
var RecordFactory = /** @class */ (function () {
    function RecordFactory() {
    }
    RecordFactory.initialize = function () {
        this.UpdateRecordsInfo();
    };
    RecordFactory.UpdateRecordsInfo = function () {
        var _this = this;
        this.Records = new Dictionary_1.default();
        TypeFactory_1.default.LoadValueTypes();
        var definitionPath = path.join(__dirname, "./DatDefinitions.xml");
        var data = fs.readFileSync(definitionPath);
        var results = new xmldoc_1.XmlDocument(data.toString());
        var records = results.childNamed("records");
        var nodes = records.childrenNamed("record");
        if (util_1.isNullOrUndefined(nodes)) {
            throw new Error("Did not find any record definitions in xml file");
        }
        nodes.forEach(function (element) {
            _this.ProcessRecordDefinition(element);
        });
        results = null;
    };
    RecordFactory.ProcessRecordDefinition = function (element) {
        var _this = this;
        var file = this.GetAttributeValue(element, "file");
        if (util_1.isNullOrUndefined(file)) {
            var error = "Invalid XML: record has wrong attribute 'id': " + element;
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
        element.children.forEach(function (field) {
            if (field.name === "field") {
                var fieldName = field.name;
                if (fieldName !== "field") {
                    throw new Error("Invalid XML: <record> contain wrong element number: " + fieldName);
                }
                var fieldId = _this.GetAttributeValue(field, "id");
                if (util_1.isNullOrUndefined(fieldId)) {
                    throw new Error("Invalid XML: field has wrong attribute 'id': " + fieldName);
                }
                var fieldType = _this.GetAttributeValue(field, "type");
                if (util_1.isNullOrUndefined(fieldType)) {
                    throw new Error("Invalid XML: couldn't find type for field: " + fieldName);
                }
                var dataType = TypeFactory_1.default.ParseType(fieldType);
                var fieldDescription = _this.GetAttributeValue(field, "description");
                var isUserString = _this.GetAttributeValue(field, "isUser");
                var isUser = _this.isNullOrEmpty(isUserString);
                fields.add(new FieldInfo_1.default(dataType, index, totalLength, fieldId, fieldDescription, isUser));
                index++;
                totalLength += dataType.Width;
            }
        });
        //Checking if the length of the fields matches the xml length, seems foobar, the length is set arbitrary by
        //manual user edit, it really does nothing.
        /*if(totalLength != length){
            var error = `Total length of fields: ${totalLength} not equal to record length ${length} for file: ${file}`;
            var errorFields = ""
            fields.toArray().forEach(field => {
                var errorField = `${field.FieldType.Name} = ${field.FieldType.Width}`;
                errorFields += errorField;
                console.log(errorField);
            });
            var errorText = error + errorFields + "\n";
            var errorPath = path.join(process.cwd(), "assets/error", `${file}.json`);
            fs.writeFile(errorPath, errorText, { flag: 'w' }, function (err) {
              if (err) throw err;
              console.log(`Error details saved for file: ${file}`);
            });
            //throw new Error(error);
        }*/
        //this.Records.setValue(file, new RecordInfo(file, length, fields));
        this.Records.setValue(file, new RecordInfo_1.default(file, totalLength, fields));
    };
    RecordFactory.isNullOrEmpty = function (s) {
        if (util_1.isUndefined(s)) {
            return true;
        }
        return !s;
    };
    RecordFactory.HasRecordInfo = function (fileName) {
        fileName = path.basename(fileName, '.dat');
        return this.Records.containsKey(fileName);
    };
    RecordFactory.GetRecordInfo = function (datName) {
        if (!this.Records.containsKey(datName)) {
            //throw new Error("Not defined parser for filename: "+datName);
        }
        return this.Records.getValue(datName);
    };
    RecordFactory.GetAttributeValue = function (element, attributeName) {
        if (util_1.isNullOrUndefined(element)) {
            throw new Error("Can not get attribute from an empty element");
        }
        var attributes = element.attr;
        if (util_1.isNullOrUndefined(attributes)) {
            return "";
        }
        var attribute = attributes[attributeName];
        return util_1.isNullOrUndefined(attribute) ? undefined : attribute;
    };
    RecordFactory.Records = new Dictionary_1.default();
    return RecordFactory;
}());
exports.default = RecordFactory;
//# sourceMappingURL=RecordFactory.js.map