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
var AbstractData_1 = require("./AbstractData");
var DatContainer_1 = require("../DatContainer");
var ShortData = /** @class */ (function (_super) {
    __extends(ShortData, _super);
    function ShortData(type, reader, options) {
        var _this = _super.call(this, type) || this;
        if (!options.containsKey("offset")) {
            throw new Error("Wrong parameters for reading ShortData");
        }
        _this.Offset = options.getValue("offset");
        reader.seek(DatContainer_1.DatContainer.DataSectionOffset + _this.Offset);
        _this.Value = reader.ReadInt16();
        _this.Length = type.Width;
        return _this;
    }
    ShortData.prototype.GetValueString = function () {
        return this.Value.toString();
    };
    return ShortData;
}(AbstractData_1.default));
exports.default = ShortData;
//# sourceMappingURL=ShortData.js.map