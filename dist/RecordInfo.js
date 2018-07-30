"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const List_1 = require("./List");
class RecordInfo {
    constructor(fileName, length = 0, fields = new List_1.default()) {
        this.FileName = fileName;
        this.Length = length;
        this.Fields = fields;
        for (var i = 0; i < this.Fields.size(); i++) {
            var elem = this.Fields.get(i);
            if (elem !== undefined && elem.IsPointer) {
                this.HasPointers = true;
            }
        }
        this.HasPointers = this.Fields.toArray().some((elem) => { return elem.IsPointer; });
    }
}
exports.default = RecordInfo;
//# sourceMappingURL=RecordInfo.js.map