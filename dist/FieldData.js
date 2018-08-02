"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TypeFactory_1 = require("./Types/TypeFactory");
const Dictionary_1 = require("./Dictionary");
const util_1 = require("util");
class FieldData {
    constructor(fieldInfo, reader, fieldIndex) {
        this.FieldInfo = fieldInfo;
        var offset = TypeFactory_1.default.GetDataSectionOffset(reader);
        var dictionary = new Dictionary_1.default();
        dictionary.setValue("offset", offset);
        this.Data = TypeFactory_1.default.CreateData(fieldInfo.FieldType, reader, dictionary, fieldIndex);
    }
    GetOffsetPrefix() {
        if (!this.FieldInfo.IsPointer) {
            return "";
        }
        var pData = this.Data;
        if (util_1.isNullOrUndefined(pData)) {
            throw new Error("FieldData of pointer type doesn't have data of PointerData class");
        }
        if (this.FieldInfo.FieldType.Width != 8) {
            return `${pData.RefData.Offset}`;
        }
        var lData = pData.RefData;
        if (util_1.isNullOrUndefined(lData)) {
            throw new Error("Didn't find ListData data at offset of FieldData of pointer to list type");
        }
        return `[${lData.Count}]${pData.RefData.Offset}`;
    }
}
exports.default = FieldData;
//# sourceMappingURL=FieldData.js.map