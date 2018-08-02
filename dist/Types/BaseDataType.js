"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Dictionary_1 = require("../Dictionary");
class BaseDataType {
    constructor(name, width, pointerWidth) {
        this.Name = name;
        this.Width = width;
        this.PointerWidth = pointerWidth;
    }
    ReadPointer(reader) {
        var dictionary = new Dictionary_1.default();
        var offset = reader.ReadInt32();
        dictionary.setValue("offset", offset);
        console.log("OFFSET: ", offset, "BUFFER POSITION: ", reader.position());
        return dictionary;
    }
}
exports.BaseDataType = BaseDataType;
//# sourceMappingURL=BaseDataType.js.map