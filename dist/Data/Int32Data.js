"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractData_1 = require("./AbstractData");
const DatContainer_1 = require("../DatContainer");
class Int32Data extends AbstractData_1.default {
    constructor(type, reader, options) {
        super(type);
        if (!options.containsKey("offset")) {
            throw new Error("Wrong parameters for reading Int32Data");
        }
        this.Offset = options.getValue("offset");
        reader.seek(DatContainer_1.DatContainer.DataSectionOffset + this.Offset);
        this.Value = reader.ReadInt32();
        this.Length = type.Width;
    }
    GetValueString() {
        return this.Value == -16843010 ? "-1" : this.Value.toString();
    }
}
exports.default = Int32Data;
//# sourceMappingURL=Int32Data.js.map