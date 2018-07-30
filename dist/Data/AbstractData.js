"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractData = /** @class */ (function () {
    function AbstractData(type) {
        this.Offset = 0;
        this.Length = 0;
        this.Type = type;
    }
    AbstractData.prototype.WritePointer = function (writer) {
        writer.WriteByte(this.Offset);
    };
    AbstractData.prototype.WritePointerOffset = function (writer, NewOffset) {
        this.Offset = NewOffset;
        writer.WriteByte(this.Offset);
    };
    AbstractData.prototype.GetValueString = function () {
        throw new Error("Not implemented");
    };
    return AbstractData;
}());
exports.default = AbstractData;
//# sourceMappingURL=AbstractData.js.map