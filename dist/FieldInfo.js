"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PointerDataType_1 = require("./Types/PointerDataType");
class FieldInfo {
    constructor(type, index, recordOffset, id, description, isUser = false) {
        this.Index = index;
        this.Id = id;
        this.RecordOffset = recordOffset;
        this.Description = description;
        this.IsUser = isUser;
        this.IsPointer = type instanceof PointerDataType_1.default;
        this.FieldType = type;
    }
    GetFullName(delimiter) {
        return this.Id + delimiter + this.FieldType.Name + delimiter + (this.FieldType.Width === 1 ? "byte" : "bytes");
    }
}
exports.default = FieldInfo;
//# sourceMappingURL=FieldInfo.js.map