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
var Dictionary_1 = require("../Dictionary");
var List_1 = require("../List");
var ListData = /** @class */ (function (_super) {
    __extends(ListData, _super);
    function ListData(type, reader, options) {
        var _this = _super.call(this, type) || this;
        _this.Count = 0;
        var flag = !options.containsKey("count") || !options.containsKey("offset");
        if (flag) {
            throw new Error("Wrong parameters for reading ListData");
        }
        _this.ListType = type.ListType;
        _this.Offset = options.getValue("offset");
        reader.seek(DatContainer_1.DatContainer.DataSectionOffset + _this.Offset);
        _this.Count = options.getValue("count");
        _this.List = new List_1.default();
        _this.Length = _this.ListType.Width * _this.Count;
        var flag2 = _this.Count === 0;
        if (!flag2) {
            var currentOffset = TypeFactory_1.default.GetDataSectionOffset(reader);
            for (var i = 0; i < _this.Count; i++) {
                var listEntryOffset = currentOffset + i * _this.ListType.Width;
                var dictionary = new Dictionary_1.default();
                dictionary.setValue("offset", listEntryOffset);
                var item = TypeFactory_1.default.CreateData(_this.ListType, reader, dictionary);
                _this.List.add(item);
            }
            DatContainer_1.DatContainer.DataEntries.setValue(_this.Offset, _this);
            _this.List.clear();
        }
        return _this;
    }
    ListData.prototype.WritePointer = function (writer) {
        writer.WriteByte(this.Count);
        writer.WriteByte(this.Offset);
    };
    ListData.prototype.GetValueString = function () {
        var list = this.List.toArray().filter(function (x) { return x.GetValueString(); }).join();
        var contents = "[" + list + "]";
        return contents;
    };
    return ListData;
}(AbstractData_1.default));
exports.default = ListData;
//# sourceMappingURL=ListData.js.map