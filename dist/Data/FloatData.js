"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractData_1 = require("./AbstractData");
const DatContainer_1 = require("../DatContainer");
class FloatData extends AbstractData_1.default {
    constructor(type, reader, options) {
        super(type);
        if (!options.containsKey("offset")) {
            throw new Error("Wrong parameters for reading FloatData");
        }
        this.Offset = options.getValue("offset");
        reader.seek(DatContainer_1.DatContainer.DataSectionOffset + this.Offset);
        this.Value = reader.ReadFloat();
        this.Length = type.Width;
    }
    GetValueString() {
        return this.Value == -16843010 ? "-1" : String(this.Value);
    }
}
exports.default = FloatData;
//# sourceMappingURL=FloatData.js.map