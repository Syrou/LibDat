"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseDataType_1 = require("./BaseDataType");
const Dictionary_1 = require("../Dictionary");
class ListDataType extends BaseDataType_1.BaseDataType {
    constructor(name, width, pointerWidth, listType) {
        super(name, width, pointerWidth);
        this.ListType = listType;
    }
    ReadPointer(reader) {
        var dictionary = new Dictionary_1.default();
        var num = reader.ReadInt32();
        var num2 = reader.ReadInt32();
        dictionary.setValue("count", num);
        dictionary.setValue("offset", num2);
        return dictionary;
    }
}
exports.ListDataType = ListDataType;
//# sourceMappingURL=ListDataType.js.map