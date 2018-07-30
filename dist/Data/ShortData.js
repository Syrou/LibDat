"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractData_1 = require("./AbstractData");
const DatContainer_1 = require("../DatContainer");
class ShortData extends AbstractData_1.default {
    constructor(type, reader, options) {
        super(type);
        if (!options.containsKey("offset")) {
            throw new Error("Wrong parameters for reading ShortData");
        }
        this.Offset = options.getValue("offset");
        reader.seek(DatContainer_1.DatContainer.DataSectionOffset + this.Offset);
        this.Value = reader.ReadInt16();
        this.Length = type.Width;
    }
    GetValueString() {
        return this.Value.toString();
    }
}
exports.default = ShortData;
//# sourceMappingURL=ShortData.js.map