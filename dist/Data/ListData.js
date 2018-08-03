"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractData_1 = require("./AbstractData");
const DatContainer_1 = require("../DatContainer");
const TypeFactory_1 = require("../Types/TypeFactory");
const Dictionary_1 = require("../Dictionary");
const List_1 = require("../List");
class ListData extends AbstractData_1.default {
    constructor(type, reader, options) {
        super(type);
        this.Count = 0;
        var flag = !options.containsKey("count") || !options.containsKey("offset");
        if (flag) {
            throw new Error("Wrong parameters for reading ListData");
        }
        this.ListType = type.ListType;
        this.Offset = options.getValue("offset");
        reader.seek(DatContainer_1.DatContainer.DataSectionOffset + this.Offset);
        this.Count = options.getValue("count");
        this.List = new List_1.default();
        this.Length = this.ListType.Width * this.Count;
        var flag2 = this.Count === 0;
        if (!flag2) {
            var currentOffset = TypeFactory_1.default.GetDataSectionOffset(reader);
            for (var i = 0; i < this.Count; i++) {
                var listEntryOffset = currentOffset + i * this.ListType.Width;
                var dictionary = new Dictionary_1.default();
                dictionary.setValue("offset", listEntryOffset);
                var item = TypeFactory_1.default.CreateData(this.ListType, reader, dictionary, i);
                this.List.add(item);
            }
            //this.List.clear();
        }
    }
    GetValueString() {
        var list = this.List.toArray().map(item => {
            return item.GetValueString();
        });
        return list;
    }
}
exports.default = ListData;
//# sourceMappingURL=ListData.js.map