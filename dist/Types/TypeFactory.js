"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DatContainer_1 = require("../DatContainer");
var BaseDataType_1 = require("./BaseDataType");
var RegularExpressions_1 = require("typescript-dotnet-umd/System/Text/RegularExpressions");
var util_1 = require("util");
var PointerDataType_1 = require("./PointerDataType");
var ListDataType_1 = require("./ListDataType");
var ListData_1 = require("../Data/ListData");
var Dictionary_1 = require("../Dictionary");
var PointerData_1 = require("../Data/PointerData");
var ByteData_1 = require("../Data/ByteData");
var ShortData_1 = require("../Data/ShortData");
var UShortData_1 = require("../Data/UShortData");
var FloatData_1 = require("../Data/FloatData");
var Int32Data_1 = require("../Data/Int32Data");
var Int64Data_1 = require("../Data/Int64Data");
var UInt64Data_1 = require("../Data/UInt64Data");
var StringData_1 = require("../Data/StringData");
var BooleanData_1 = require("../Data/BooleanData");
var TypeFactory = /** @class */ (function () {
    function TypeFactory() {
    }
    TypeFactory.GetDataSectionOffset = function (reader) {
        return reader.position() - DatContainer_1.DatContainer.DataSectionOffset;
    };
    TypeFactory.ParseType = function (fieldType) {
        if (this.HasTypeInfo(fieldType)) {
            return this.GetTypeInfo(fieldType);
        }
        var type;
        var match = new RegularExpressions_1.Regex(/(\w+\|)?(.+)/);
        if (match.isMatch(fieldType)) {
            var test = match.match(fieldType);
            var matches = match.matches(fieldType);
            if (util_1.isNullOrUndefined(matches[0].groups[1].value)) {
                type = this.ParseValueType(matches[0].groups[2].value);
            }
            else {
                var pointerString = matches[0].groups[1].value;
                var refTypeString = matches[0].groups[2].value;
                if (pointerString === "ref|") { //Pointer
                    var refType = this.ParseType(refTypeString);
                    type = new PointerDataType_1.default(fieldType, refType.PointerWidth, 4, refType);
                }
                else if (pointerString === "list|") {
                    var listType = this.ParseType(refTypeString);
                    type = new ListDataType_1.ListDataType(fieldType, -1, 8, listType);
                }
                else {
                    throw new Error("Unknown complex type name: " + pointerString);
                }
            }
        }
        else {
            throw new Error("String is not a valid type definition ${fieldType}");
        }
        match = null;
        if (type !== null || type !== undefined) {
            this._types.setValue(fieldType, type);
        }
        return type;
    };
    TypeFactory.ParseValueType = function (fieldType) {
        var match = new RegularExpressions_1.Regex("^(\w+)$");
        if (match.isMatch(fieldType)) {
            return this.GetTypeInfo(match.matches(fieldType)[0].value);
        }
        match = null;
        throw new Error("Not a valid value type definitation ${fieldType}");
    };
    TypeFactory.LoadValueTypes = function () {
        this._types = new Dictionary_1.default();
        this._types.setValue("bool", new BaseDataType_1.BaseDataType("bool", 1, 4));
        this._types.setValue("byte", new BaseDataType_1.BaseDataType("byte", 1, 4));
        this._types.setValue("short", new BaseDataType_1.BaseDataType("short", 2, 4));
        this._types.setValue("int", new BaseDataType_1.BaseDataType("int", 4, 4));
        this._types.setValue("float", new BaseDataType_1.BaseDataType("float", 4, 4));
        this._types.setValue("uint", new BaseDataType_1.BaseDataType("uint", 4, 4));
        this._types.setValue("long", new BaseDataType_1.BaseDataType("long", 8, 4));
        this._types.setValue("ulong", new BaseDataType_1.BaseDataType("ulong", 8, 4));
        this._types.setValue("string", new BaseDataType_1.BaseDataType("string", -1, 4));
    };
    TypeFactory.HasTypeInfo = function (type) {
        return this._types.containsKey(type);
    };
    TypeFactory.GetTypeInfo = function (type) {
        if (!this.HasTypeInfo(type)) {
            throw new Error("Unknown data type: " + type);
        }
        var result = this._types.getValue(type);
        if (!util_1.isNullOrUndefined(result)) {
            return result;
        }
        throw new Error("Could not find value for type: " + type);
    };
    TypeFactory.CreateData = function (type, inStream, options) {
        if (type instanceof ListDataType_1.ListDataType) {
            return new ListData_1.default(type, inStream, options);
        }
        if (type instanceof PointerDataType_1.default) {
            return new PointerData_1.default(type, inStream, options);
        }
        var data;
        switch (type.Name) {
            case "bool": {
                data = new BooleanData_1.default(type, inStream, options);
                break;
            }
            case "byte": {
                data = new ByteData_1.default(type, inStream, options);
                break;
            }
            case "short": {
                data = new ShortData_1.default(type, inStream, options);
                break;
            }
            case "float": {
                data = new FloatData_1.default(type, inStream, options);
                break;
            }
            case "int": {
                data = new Int32Data_1.default(type, inStream, options);
                break;
            }
            case "uint": {
                data = new UShortData_1.default(type, inStream, options);
                break;
            }
            case "long": {
                data = new Int64Data_1.default(type, inStream, options);
                break;
            }
            case "ulong": {
                data = new UInt64Data_1.default(type, inStream, options);
                break;
            }
            case "string": {
                data = new StringData_1.default(type, inStream, options);
                break;
            }
            default: {
                var error = "Unknown value type name: " + type.Name;
                throw new Error(error);
            }
        }
        return data;
    };
    return TypeFactory;
}());
exports.default = TypeFactory;
//# sourceMappingURL=TypeFactory.js.map