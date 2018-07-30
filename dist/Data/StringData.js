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
var StringData = /** @class */ (function (_super) {
    __extends(StringData, _super);
    function StringData(type, reader, options) {
        var _this = _super.call(this, type) || this;
        if (!options.containsKey("offset")) {
            throw new Error("Wrong parameters for reading StringData");
        }
        _this.Offset = options.getValue("offset");
        //console.log("OFFSET: ", this.Offset);
        reader.seek(DatContainer_1.DatContainer.DataSectionOffset + _this.Offset);
        _this.Value = reader.ReadString();
        //console.log("STRING VAL: ", this.Value);
        _this.Length = 2 * type.Width + 4;
        //console.log("WIDTH: ", this.Length);
        DatContainer_1.DatContainer.DataEntries.setValue(_this.Offset, _this);
        return _this;
    }
    StringData.prototype.GetValueString = function () {
        return this.Value.toString();
    };
    return StringData;
}(AbstractData_1.default));
exports.default = StringData;
//# sourceMappingURL=StringData.js.map