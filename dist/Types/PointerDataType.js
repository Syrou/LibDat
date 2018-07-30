"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BaseDataType_1 = require("./BaseDataType");
var PointerDataType = /** @class */ (function (_super) {
    __extends(PointerDataType, _super);
    function PointerDataType(name, width, pointerWidth, refType) {
        var _this = _super.call(this, name, width, pointerWidth) || this;
        _this.RefType = refType;
        return _this;
    }
    return PointerDataType;
}(BaseDataType_1.BaseDataType));
exports.default = PointerDataType;
//# sourceMappingURL=PointerDataType.js.map