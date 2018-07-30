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
var Dictionary_1 = require("../Dictionary");
var ListDataType = /** @class */ (function (_super) {
    __extends(ListDataType, _super);
    function ListDataType(name, width, pointerWidth, listType) {
        var _this = _super.call(this, name, width, pointerWidth) || this;
        _this.ListType = listType;
        return _this;
    }
    ListDataType.prototype.ReadPointer = function (reader) {
        var dictionary = new Dictionary_1.default();
        var num = reader.ReadInt32();
        var num2 = reader.ReadInt32();
        dictionary.setValue("count", num);
        dictionary.setValue("offset", num2);
        return dictionary;
    };
    return ListDataType;
}(BaseDataType_1.BaseDataType));
exports.ListDataType = ListDataType;
//# sourceMappingURL=ListDataType.js.map