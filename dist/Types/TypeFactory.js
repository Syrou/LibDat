"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DatContainer_1 = require("../DatContainer");
const BaseDataType_1 = require("./BaseDataType");
const RegularExpressions_1 = require("typescript-dotnet-umd/System/Text/RegularExpressions");
const util_1 = require("util");
const PointerDataType_1 = require("./PointerDataType");
const ListDataType_1 = require("./ListDataType");
const ListData_1 = require("../Data/ListData");
const Dictionary_1 = require("../Dictionary");
const PointerData_1 = require("../Data/PointerData");
const ByteData_1 = require("../Data/ByteData");
const ShortData_1 = require("../Data/ShortData");
const UShortData_1 = require("../Data/UShortData");
const FloatData_1 = require("../Data/FloatData");
const Int32Data_1 = require("../Data/Int32Data");
const Int64Data_1 = require("../Data/Int64Data");
const UInt64Data_1 = require("../Data/UInt64Data");
const StringData_1 = require("../Data/StringData");
const BooleanData_1 = require("../Data/BooleanData");
class TypeFactory {
    static GetDataSectionOffset(reader) {
        return reader.position() - DatContainer_1.DatContainer.DataSectionOffset;
    }
    static ParseType(fieldType) {
        if (this.HasTypeInfo(fieldType)) {
            return this.GetTypeInfo(fieldType);
        }
        let type;
        let match = new RegularExpressions_1.Regex(/(\w+\|)?(.+)/);
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
        this.lastSuccessfullyParsedType = type;
        return type;
    }
    static ParseValueType(fieldType) {
        var match = new RegularExpressions_1.Regex("^(\w+)$");
        if (match.isMatch(fieldType)) {
            return this.GetTypeInfo(match.matches(fieldType)[0].value);
        }
        match = null;
        throw new Error("Not a valid value type definitation ${fieldType}");
    }
    static LoadValueTypes() {
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
    }
    static HasTypeInfo(type) {
        return this._types.containsKey(type);
    }
    static GetTypeInfo(type) {
        if (!this.HasTypeInfo(type)) {
            throw new Error(`Unknown data type: ${type}`);
        }
        var result = this._types.getValue(type);
        if (!util_1.isNullOrUndefined(result)) {
            return result;
        }
        throw new Error(`Could not find value for type: ${type}`);
    }
    static CreateData(type, inStream, options, fieldIndex) {
        if (fieldIndex) {
            this.currentFieldIndex = fieldIndex;
        }
        if (inStream.position() > inStream.buffer.capacity()) {
            var error = `Trying to read outside record length, this usually indicates records being assigned to wrong type!\nType was: ${this.lastSuccessfullyParsedType.Name} found at field entry number: ${this.currentFieldIndex}`;
            throw new Error(error);
        }
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
                var error = `Unknown value type name: ${type.Name}`;
                throw new Error(error);
            }
        }
        return data;
    }
}
exports.default = TypeFactory;
//# sourceMappingURL=TypeFactory.js.map