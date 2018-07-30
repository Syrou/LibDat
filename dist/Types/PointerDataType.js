"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseDataType_1 = require("./BaseDataType");
class PointerDataType extends BaseDataType_1.BaseDataType {
    constructor(name, width, pointerWidth, refType) {
        super(name, width, pointerWidth);
        this.RefType = refType;
    }
}
exports.default = PointerDataType;
//# sourceMappingURL=PointerDataType.js.map