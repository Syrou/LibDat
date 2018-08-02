"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FieldData_1 = require("./FieldData");
const List_1 = require("./List");
class RecordData {
    constructor(recordInfo, inStream, index) {
        this.RecordInfo = recordInfo;
        this.Index = index;
        this.FieldsData = new List_1.default();
        inStream.seek(4 + recordInfo.Length * index);
        let startOffset = inStream.position();
        this.RecordInfo.Fields.toArray().forEach((element, fieldIndex) => {
            var elementOffset = (startOffset + element.RecordOffset);
            inStream.seek(elementOffset);
            var fieldData = new FieldData_1.default(element, inStream, fieldIndex);
            this.FieldsData.add(fieldData);
            fieldData = null;
        });
    }
}
exports.default = RecordData;
//# sourceMappingURL=RecordData.js.map