"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractData_1 = require("./AbstractData");
const DatContainer_1 = require("../DatContainer");
const Long = require("long");
class UInt64Data extends AbstractData_1.default {
    constructor(type, reader, options) {
        super(type);
        if (!options.containsKey("offset")) {
            throw new Error("Wrong parameters for reading Int64Data");
        }
        this.Offset = options.getValue("offset");
        reader.seek(DatContainer_1.DatContainer.DataSectionOffset + this.Offset);
        this.Value = reader.ReadUInt64();
        this.Length = type.Width;
    }
    GetValueString() {
        return this.Value.equals(Long.fromString("-72340172838076674", true)) ? Number("-1") : Number(this.Value.toString());
    }
}
exports.default = UInt64Data;
//# sourceMappingURL=UInt64Data.js.map