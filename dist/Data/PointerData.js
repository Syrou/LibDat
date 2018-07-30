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
var TypeFactory_1 = require("../Types/TypeFactory");
var PointerData = /** @class */ (function (_super) {
    __extends(PointerData, _super);
    function PointerData(dataType, reader, options) {
        var _this = _super.call(this, dataType) || this;
        var flag = !options.containsKey("offset");
        if (flag) {
            throw new Error("Wrong parameters for reading PointerData");
        }
        _this.RefType = dataType.RefType;
        _this.Length = _this.RefType.PointerWidth;
        _this.Offset = options.getValue("offset");
        reader.seek(DatContainer_1.DatContainer.DataSectionOffset + _this.Offset);
        var refParams = _this.RefType.ReadPointer(reader);
        _this.RefData = TypeFactory_1.default.CreateData(_this.RefType, reader, refParams);
        DatContainer_1.DatContainer.DataPointers.setValue(_this.Offset, _this);
        return _this;
    }
    PointerData.prototype.GetValueString = function () {
        return this.RefData.GetValueString();
    };
    return PointerData;
}(AbstractData_1.default));
exports.default = PointerData;
//# sourceMappingURL=PointerData.js.map