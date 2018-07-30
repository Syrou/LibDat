"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractData_1 = require("./AbstractData");
const DatContainer_1 = require("../DatContainer");
class StringData extends AbstractData_1.default {
    constructor(type, reader, options) {
        super(type);
        if (!options.containsKey("offset")) {
            throw new Error("Wrong parameters for reading StringData");
        }
        this.Offset = options.getValue("offset");
        //console.log("OFFSET: ", this.Offset);
        reader.seek(DatContainer_1.DatContainer.DataSectionOffset + this.Offset);
        this.Value = reader.ReadString();
        //console.log("STRING VAL: ", this.Value);
        this.Length = 2 * type.Width + 4;
        //console.log("WIDTH: ", this.Length);
        DatContainer_1.DatContainer.DataEntries.setValue(this.Offset, this);
    }
    GetValueString() {
        return this.Value.toString();
    }
}
exports.default = StringData;
//# sourceMappingURL=StringData.js.map