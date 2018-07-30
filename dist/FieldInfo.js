"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PointerDataType_1 = require("./Types/PointerDataType");
var FieldInfo = /** @class */ (function () {
    function FieldInfo(type, index, recordOffset, id, description, isUser) {
        if (isUser === void 0) { isUser = false; }
        this.Index = index;
        this.Id = id;
        this.RecordOffset = recordOffset;
        this.Description = description;
        this.IsUser = isUser;
        this.IsPointer = type instanceof PointerDataType_1.default;
        this.FieldType = type;
    }
    FieldInfo.prototype.GetFullName = function (delimiter) {
        return this.Id + delimiter + this.FieldType.Name + delimiter + (this.FieldType.Width === 1 ? "byte" : "bytes");
    };
    return FieldInfo;
}());
exports.default = FieldInfo;
//# sourceMappingURL=FieldInfo.js.map