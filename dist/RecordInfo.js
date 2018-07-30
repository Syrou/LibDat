"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var List_1 = require("./List");
var RecordInfo = /** @class */ (function () {
    function RecordInfo(fileName, length, fields) {
        if (length === void 0) { length = 0; }
        if (fields === void 0) { fields = new List_1.default(); }
        this.FileName = fileName;
        this.Length = length;
        this.Fields = fields;
        for (var i = 0; i < this.Fields.size(); i++) {
            var elem = this.Fields.get(i);
            if (elem !== undefined && elem.IsPointer) {
                this.HasPointers = true;
            }
        }
        this.HasPointers = this.Fields.toArray().some(function (elem) { return elem.IsPointer; });
    }
    return RecordInfo;
}());
exports.default = RecordInfo;
//# sourceMappingURL=RecordInfo.js.map