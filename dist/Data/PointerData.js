"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractData_1 = require("./AbstractData");
const DatContainer_1 = require("../DatContainer");
const TypeFactory_1 = require("../Types/TypeFactory");
class PointerData extends AbstractData_1.default {
    constructor(dataType, reader, options) {
        super(dataType);
        var flag = !options.containsKey("offset");
        if (flag) {
            throw new Error("Wrong parameters for reading PointerData");
        }
        this.RefType = dataType.RefType;
        this.Length = this.RefType.PointerWidth;
        this.Offset = options.getValue("offset");
        reader.seek(DatContainer_1.DatContainer.DataSectionOffset + this.Offset);
        var refParams = this.RefType.ReadPointer(reader);
        this.RefData = TypeFactory_1.default.CreateData(this.RefType, reader, refParams);
        DatContainer_1.DatContainer.DataPointers.setValue(this.Offset, this);
    }
    GetValueString() {
        return this.RefData.GetValueString();
    }
}
exports.default = PointerData;
//# sourceMappingURL=PointerData.js.map