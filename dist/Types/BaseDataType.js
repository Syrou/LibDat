"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Dictionary_1 = require("../Dictionary");
var BaseDataType = /** @class */ (function () {
    function BaseDataType(name, width, pointerWidth) {
        this.Name = name;
        this.Width = width;
        this.PointerWidth = pointerWidth;
    }
    BaseDataType.prototype.ReadPointer = function (reader) {
        var dictionary = new Dictionary_1.default();
        var offset = reader.ReadInt32();
        dictionary.setValue("offset", offset);
        return dictionary;
    };
    return BaseDataType;
}());
exports.BaseDataType = BaseDataType;
//# sourceMappingURL=BaseDataType.js.map