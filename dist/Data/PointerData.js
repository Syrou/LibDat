"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractData_1 = require("./AbstractData");
const DatContainer_1 = require("../DatContainer");
const TypeFactory_1 = require("../Types/TypeFactory");
class PointerData extends AbstractData_1.default {
    constructor(dataType, reader, options) {
        super(dataType);
        this.RefData = undefined;
        var flag = !options.containsKey("offset");
        if (flag) {
            throw new Error("Wrong parameters for reading PointerData");
        }
        this.RefType = dataType.RefType;
        this.Length = this.RefType.PointerWidth;
        this.Offset = options.getValue("offset");
        reader.seek(DatContainer_1.DatContainer.DataSectionOffset + this.Offset);
        var refParams = this.RefType.ReadPointer(reader);
        var readPointerOffset = refParams.getValue("offset");
        if (readPointerOffset >= 8 && reader.position() + readPointerOffset <= reader.buffer.capacity()) {
            this.RefData = TypeFactory_1.default.CreateData(this.RefType, reader, refParams, 1);
        }
        else {
            console.error("Trying to read outside data section, usually an indicator that the specificed type is not a ref| type");
            //console.log("DATA SECTION: ", DatContainer.DataSectionOffset);
            //console.log("READER OFFSET:", readPointerOffset, " POSITION: ", reader.position(), " CAP: ", reader.buffer.capacity());
        }
    }
    GetValueString() {
        var result = this.RefData ? this.RefData.GetValueString() : "";
        return result;
    }
}
exports.default = PointerData;
//# sourceMappingURL=PointerData.js.map