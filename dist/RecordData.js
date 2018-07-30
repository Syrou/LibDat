"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FieldData_1 = require("./FieldData");
var List_1 = require("./List");
var RecordData = /** @class */ (function () {
    function RecordData(recordInfo, inStream, index) {
        var _this = this;
        this.RecordInfo = recordInfo;
        this.Index = index;
        this.FieldsData = new List_1.default();
        inStream.seek(4 + recordInfo.Length * index);
        var startOffset = inStream.position();
        this.RecordInfo.Fields.toArray().forEach(function (element) {
            var elementOffset = (startOffset + element.RecordOffset);
            inStream.seek(elementOffset);
            var fieldData = new FieldData_1.default(element, inStream);
            _this.FieldsData.add(fieldData);
            fieldData = null;
        });
    }
    return RecordData;
}());
exports.default = RecordData;
//# sourceMappingURL=RecordData.js.map