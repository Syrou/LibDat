"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AbstractData {
    constructor(type) {
        this.Offset = 0;
        this.Length = 0;
        this.Type = type;
    }
    GetValueString() {
        throw new Error("Not implemented");
    }
}
exports.default = AbstractData;
//# sourceMappingURL=AbstractData.js.map