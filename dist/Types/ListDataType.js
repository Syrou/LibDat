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
        var count = reader.ReadInt32();
        var offset = reader.ReadInt32();
        console.log("COUNT: ", count, " OFFSET: ", offset, "BUFFER POSITION: ", reader.position());
        dictionary.setValue("count", count);
        dictionary.setValue("offset", offset);
        return dictionary;
    }
}
exports.ListDataType = ListDataType;
//# sourceMappingURL=ListDataType.js.map