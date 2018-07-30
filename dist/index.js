define("io", ["require", "exports", "bytebuffer"], function (require, exports, ByteBuffer) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BinaryReader {
        constructor(data, littleEndian) {
            this.buffer = ByteBuffer.wrap(data, littleEndian);
            this.buffer.offset = 0;
            this.LittleEndian = littleEndian;
        }
        seek(position) {
            this.buffer.offset = position;
        }
        position() {
            return this.buffer.offset;
        }
        readUInt8() {
            var value = this.buffer.readUint8();
            return value;
        }
        ReadUInt32() {
            var s_Val = this.buffer.readUint32();
            return s_Val;
        }
        ReadBoolean() {
            var value = this.buffer.readByte();
            return value != 0;
        }
        ReadInt8() {
            var s_Val = this.buffer.readInt8();
            return s_Val;
        }
        ReadInt16() {
            return this.buffer.readInt16();
            ;
        }
        ReadUInt16() {
            return this.buffer.readUint16();
        }
        ReadInt32() {
            return this.buffer.readInt32();
        }
        ReadUInt64() {
            return this.buffer.readUint64();
        }
        ReadInt64() {
            return this.buffer.readInt64();
        }
        ReadFloat() {
            return this.buffer.readFloat();
        }
        ReadDouble() {
            return this.buffer.readDouble();
        }
        ReadByte() {
            return this.buffer.readByte();
        }
        ReadBytes(length) {
            return this.buffer.readBytes(length);
        }
        ReadString() {
            var strb = "";
            var chr;
            while ((chr = this.buffer.readInt16()) != 0) {
                strb = strb.concat(String.fromCharCode(chr));
            }
            if (chr != 0) {
                console.log("OOOPS?");
            }
            return strb;
        }
    }
    exports.BinaryReader = BinaryReader;
    class BinaryWriter {
        constructor(capacity, endianness) {
            this.ByteBuffer = new ByteBuffer(capacity, endianness);
            this.Endianness = endianness;
        }
        WriteBoolean(value) {
            var boolByte = value ? 1 : 0;
            this.ByteBuffer.writeByte(boolByte);
        }
        WriteUInt8(value) {
            this.ByteBuffer.writeUint8(value);
        }
        WriteUInt16(value) {
            this.ByteBuffer.writeUint16(value);
        }
        WriteUInt32(value) {
            this.ByteBuffer.writeUint32(value);
        }
        WriteInt8(value) {
            this.ByteBuffer.writeInt8(value);
        }
        WriteInt16(value) {
            this.ByteBuffer.writeInt16(value);
        }
        WriteInt32(value) {
            this.ByteBuffer.writeInt32(value);
        }
        WriteInt64(value) {
            this.ByteBuffer.writeInt64(value);
        }
        WriteUInt64(value) {
            this.ByteBuffer.writeUint64(value);
        }
        WriteFloat(value) {
            this.ByteBuffer.writeFloat(value);
        }
        WriteDouble(value) {
            this.ByteBuffer.writeDouble(value);
        }
        WriteBytes(value, endcoding) {
            this.ByteBuffer.writeBytes(value, endcoding);
        }
        WriteByte(value) {
            this.ByteBuffer.writeByte(value);
        }
        WriteString(value) {
            this.ByteBuffer.writeCString(value);
        }
    }
    exports.BinaryWriter = BinaryWriter;
});
define("Dictionary", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Dictionary {
        constructor() {
            this.map = new Map();
        }
        setValue(key, value) {
            this.map.set(key, value);
        }
        remove(key) {
            this.map.delete(key);
        }
        getValue(key) {
            return this.map.get(key);
        }
        containsKey(key) {
            return this.map.has(key);
        }
    }
    exports.default = Dictionary;
});
define("Types/BaseDataType", ["require", "exports", "Dictionary"], function (require, exports, Dictionary_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BaseDataType {
        constructor(name, width, pointerWidth) {
            this.Name = name;
            this.Width = width;
            this.PointerWidth = pointerWidth;
        }
        ReadPointer(reader) {
            var dictionary = new Dictionary_1.default();
            var offset = reader.ReadInt32();
            dictionary.setValue("offset", offset);
            return dictionary;
        }
    }
    exports.BaseDataType = BaseDataType;
});
define("Data/AbstractData", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class AbstractData {
        constructor(type) {
            this.Offset = 0;
            this.Length = 0;
            this.Type = type;
        }
        WritePointer(writer) {
            writer.WriteByte(this.Offset);
        }
        WritePointerOffset(writer, NewOffset) {
            this.Offset = NewOffset;
            writer.WriteByte(this.Offset);
        }
        GetValueString() {
            throw new Error("Not implemented");
        }
    }
    exports.default = AbstractData;
});
define("Types/PointerDataType", ["require", "exports", "Types/BaseDataType"], function (require, exports, BaseDataType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class PointerDataType extends BaseDataType_1.BaseDataType {
        constructor(name, width, pointerWidth, refType) {
            super(name, width, pointerWidth);
            this.RefType = refType;
        }
    }
    exports.default = PointerDataType;
});
define("Types/ListDataType", ["require", "exports", "Types/BaseDataType", "Dictionary"], function (require, exports, BaseDataType_2, Dictionary_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ListDataType extends BaseDataType_2.BaseDataType {
        constructor(name, width, pointerWidth, listType) {
            super(name, width, pointerWidth);
            this.ListType = listType;
        }
        ReadPointer(reader) {
            var dictionary = new Dictionary_2.default();
            var num = reader.ReadInt32();
            var num2 = reader.ReadInt32();
            dictionary.setValue("count", num);
            dictionary.setValue("offset", num2);
            return dictionary;
        }
    }
    exports.ListDataType = ListDataType;
});
define("List", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class List {
        constructor() {
            this.items = [];
        }
        size() {
            return this.items.length;
        }
        add(value) {
            this.items.push(value);
        }
        get(index) {
            return this.items[index];
        }
        toArray() {
            return this.items;
        }
        indexOf(element) {
            return this.items.indexOf(element);
        }
        clear() {
            this.items.splice(0, this.items.length);
        }
    }
    exports.default = List;
});
define("Data/ListData", ["require", "exports", "Data/AbstractData", "DatContainer", "Types/TypeFactory", "Dictionary", "List"], function (require, exports, AbstractData_1, DatContainer_1, TypeFactory_1, Dictionary_3, List_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
                    var dictionary = new Dictionary_3.default();
                    dictionary.setValue("offset", listEntryOffset);
                    var item = TypeFactory_1.default.CreateData(this.ListType, reader, dictionary);
                    this.List.add(item);
                }
                DatContainer_1.DatContainer.DataEntries.setValue(this.Offset, this);
                this.List.clear();
            }
        }
        WritePointer(writer) {
            writer.WriteByte(this.Count);
            writer.WriteByte(this.Offset);
        }
        GetValueString() {
            var list = this.List.toArray().filter(function (x) { return x.GetValueString(); }).join();
            var contents = `[${list}]`;
            return contents;
        }
    }
    exports.default = ListData;
});
define("Data/ByteData", ["require", "exports", "Data/AbstractData", "DatContainer"], function (require, exports, AbstractData_2, DatContainer_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ByteData extends AbstractData_2.default {
        constructor(type, reader, options) {
            super(type);
            if (!options.containsKey("offset")) {
                throw new Error("Wrong parameters for reading ByteData");
            }
            this.Offset = options.getValue("offset");
            reader.seek(DatContainer_2.DatContainer.DataSectionOffset + this.Offset);
            this.Value = reader.ReadByte();
            this.Length = type.Width;
        }
        GetValueString() {
            return this.Value.toString();
        }
    }
    exports.default = ByteData;
});
define("Data/ShortData", ["require", "exports", "Data/AbstractData", "DatContainer"], function (require, exports, AbstractData_3, DatContainer_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ShortData extends AbstractData_3.default {
        constructor(type, reader, options) {
            super(type);
            if (!options.containsKey("offset")) {
                throw new Error("Wrong parameters for reading ShortData");
            }
            this.Offset = options.getValue("offset");
            reader.seek(DatContainer_3.DatContainer.DataSectionOffset + this.Offset);
            this.Value = reader.ReadInt16();
            this.Length = type.Width;
        }
        GetValueString() {
            return this.Value.toString();
        }
    }
    exports.default = ShortData;
});
define("Data/UShortData", ["require", "exports", "Data/AbstractData", "DatContainer"], function (require, exports, AbstractData_4, DatContainer_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UShortData extends AbstractData_4.default {
        constructor(type, reader, options) {
            super(type);
            if (!options.containsKey("offset")) {
                throw new Error("Wrong parameters for reading UShortData");
            }
            this.Offset = options.getValue("offset");
            reader.seek(DatContainer_4.DatContainer.DataSectionOffset + this.Offset);
            this.Value = reader.ReadUInt16();
            this.Length = type.Width;
        }
        GetValueString() {
            return this.Value.toString();
        }
    }
    exports.default = UShortData;
});
define("Data/FloatData", ["require", "exports", "Data/AbstractData", "DatContainer"], function (require, exports, AbstractData_5, DatContainer_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class FloatData extends AbstractData_5.default {
        constructor(type, reader, options) {
            super(type);
            if (!options.containsKey("offset")) {
                throw new Error("Wrong parameters for reading FloatData");
            }
            this.Offset = options.getValue("offset");
            reader.seek(DatContainer_5.DatContainer.DataSectionOffset + this.Offset);
            this.Value = reader.ReadFloat();
            this.Length = type.Width;
        }
        GetValueString() {
            return this.Value == -16843010 ? "-1" : this.Value.toString();
        }
    }
    exports.default = FloatData;
});
define("Data/Int32Data", ["require", "exports", "Data/AbstractData", "DatContainer"], function (require, exports, AbstractData_6, DatContainer_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Int32Data extends AbstractData_6.default {
        constructor(type, reader, options) {
            super(type);
            if (!options.containsKey("offset")) {
                throw new Error("Wrong parameters for reading Int32Data");
            }
            this.Offset = options.getValue("offset");
            reader.seek(DatContainer_6.DatContainer.DataSectionOffset + this.Offset);
            this.Value = reader.ReadInt32();
            this.Length = type.Width;
        }
        GetValueString() {
            return this.Value == -16843010 ? "-1" : this.Value.toString();
        }
    }
    exports.default = Int32Data;
});
define("Data/Int64Data", ["require", "exports", "Data/AbstractData", "DatContainer", "long"], function (require, exports, AbstractData_7, DatContainer_7, Long) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Int64Data extends AbstractData_7.default {
        constructor(type, reader, options) {
            super(type);
            if (!options.containsKey("offset")) {
                throw new Error("Wrong parameters for reading Int64Data");
            }
            this.Offset = options.getValue("offset");
            reader.seek(DatContainer_7.DatContainer.DataSectionOffset + this.Offset);
            this.Value = reader.ReadInt64();
            this.Length = type.Width;
        }
        GetValueString() {
            return this.Value == Long.fromValue("-72340172838076674") ? "-1" : this.Value.toString();
        }
    }
    exports.default = Int64Data;
});
define("Data/UInt64Data", ["require", "exports", "Data/AbstractData", "DatContainer", "long"], function (require, exports, AbstractData_8, DatContainer_8, Long) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UInt64Data extends AbstractData_8.default {
        constructor(type, reader, options) {
            super(type);
            if (!options.containsKey("offset")) {
                throw new Error("Wrong parameters for reading Int64Data");
            }
            this.Offset = options.getValue("offset");
            reader.seek(DatContainer_8.DatContainer.DataSectionOffset + this.Offset);
            this.Value = reader.ReadUInt64();
            this.Length = type.Width;
        }
        GetValueString() {
            return this.Value.equals(Long.fromString("-72340172838076674", true)) ? "-1" : this.Value.toString();
        }
    }
    exports.default = UInt64Data;
});
define("Data/StringData", ["require", "exports", "Data/AbstractData", "DatContainer"], function (require, exports, AbstractData_9, DatContainer_9) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class StringData extends AbstractData_9.default {
        constructor(type, reader, options) {
            super(type);
            if (!options.containsKey("offset")) {
                throw new Error("Wrong parameters for reading StringData");
            }
            this.Offset = options.getValue("offset");
            //console.log("OFFSET: ", this.Offset);
            reader.seek(DatContainer_9.DatContainer.DataSectionOffset + this.Offset);
            this.Value = reader.ReadString();
            //console.log("STRING VAL: ", this.Value);
            this.Length = 2 * type.Width + 4;
            //console.log("WIDTH: ", this.Length);
            DatContainer_9.DatContainer.DataEntries.setValue(this.Offset, this);
        }
        GetValueString() {
            return this.Value.toString();
        }
    }
    exports.default = StringData;
});
define("Data/BooleanData", ["require", "exports", "Data/AbstractData", "DatContainer"], function (require, exports, AbstractData_10, DatContainer_10) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BooleanData extends AbstractData_10.default {
        constructor(type, reader, options) {
            super(type);
            if (!options.containsKey("offset")) {
                throw new Error("Wrong parameters for reading BooleanData");
            }
            this.Offset = options.getValue("offset");
            reader.seek(DatContainer_10.DatContainer.DataSectionOffset + this.Offset);
            this.Value = reader.ReadBoolean();
            this.Length = type.Width;
        }
        GetValueString() {
            return this.Value.toString();
        }
    }
    exports.default = BooleanData;
});
define("Types/TypeFactory", ["require", "exports", "DatContainer", "Types/BaseDataType", "typescript-dotnet-umd/System/Text/RegularExpressions", "util", "Types/PointerDataType", "Types/ListDataType", "Data/ListData", "Dictionary", "Data/PointerData", "Data/ByteData", "Data/ShortData", "Data/UShortData", "Data/FloatData", "Data/Int32Data", "Data/Int64Data", "Data/UInt64Data", "Data/StringData", "Data/BooleanData"], function (require, exports, DatContainer_11, BaseDataType_3, RegularExpressions_1, util_1, PointerDataType_1, ListDataType_1, ListData_1, Dictionary_4, PointerData_1, ByteData_1, ShortData_1, UShortData_1, FloatData_1, Int32Data_1, Int64Data_1, UInt64Data_1, StringData_1, BooleanData_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class TypeFactory {
        static GetDataSectionOffset(reader) {
            return reader.position() - DatContainer_11.DatContainer.DataSectionOffset;
        }
        static ParseType(fieldType) {
            if (this.HasTypeInfo(fieldType)) {
                return this.GetTypeInfo(fieldType);
            }
            let type;
            let match = new RegularExpressions_1.Regex(/(\w+\|)?(.+)/);
            if (match.isMatch(fieldType)) {
                var test = match.match(fieldType);
                var matches = match.matches(fieldType);
                if (util_1.isNullOrUndefined(matches[0].groups[1].value)) {
                    type = this.ParseValueType(matches[0].groups[2].value);
                }
                else {
                    var pointerString = matches[0].groups[1].value;
                    var refTypeString = matches[0].groups[2].value;
                    if (pointerString === "ref|") { //Pointer
                        var refType = this.ParseType(refTypeString);
                        type = new PointerDataType_1.default(fieldType, refType.PointerWidth, 4, refType);
                    }
                    else if (pointerString === "list|") {
                        var listType = this.ParseType(refTypeString);
                        type = new ListDataType_1.ListDataType(fieldType, -1, 8, listType);
                    }
                    else {
                        throw new Error("Unknown complex type name: " + pointerString);
                    }
                }
            }
            else {
                throw new Error("String is not a valid type definition ${fieldType}");
            }
            match = null;
            if (type !== null || type !== undefined) {
                this._types.setValue(fieldType, type);
            }
            return type;
        }
        static ParseValueType(fieldType) {
            var match = new RegularExpressions_1.Regex("^(\w+)$");
            if (match.isMatch(fieldType)) {
                return this.GetTypeInfo(match.matches(fieldType)[0].value);
            }
            match = null;
            throw new Error("Not a valid value type definitation ${fieldType}");
        }
        static LoadValueTypes() {
            this._types = new Dictionary_4.default();
            this._types.setValue("bool", new BaseDataType_3.BaseDataType("bool", 1, 4));
            this._types.setValue("byte", new BaseDataType_3.BaseDataType("byte", 1, 4));
            this._types.setValue("short", new BaseDataType_3.BaseDataType("short", 2, 4));
            this._types.setValue("int", new BaseDataType_3.BaseDataType("int", 4, 4));
            this._types.setValue("float", new BaseDataType_3.BaseDataType("float", 4, 4));
            this._types.setValue("uint", new BaseDataType_3.BaseDataType("uint", 4, 4));
            this._types.setValue("long", new BaseDataType_3.BaseDataType("long", 8, 4));
            this._types.setValue("ulong", new BaseDataType_3.BaseDataType("ulong", 8, 4));
            this._types.setValue("string", new BaseDataType_3.BaseDataType("string", -1, 4));
        }
        static HasTypeInfo(type) {
            return this._types.containsKey(type);
        }
        static GetTypeInfo(type) {
            if (!this.HasTypeInfo(type)) {
                throw new Error(`Unknown data type: ${type}`);
            }
            var result = this._types.getValue(type);
            if (!util_1.isNullOrUndefined(result)) {
                return result;
            }
            throw new Error(`Could not find value for type: ${type}`);
        }
        static CreateData(type, inStream, options) {
            if (type instanceof ListDataType_1.ListDataType) {
                return new ListData_1.default(type, inStream, options);
            }
            if (type instanceof PointerDataType_1.default) {
                return new PointerData_1.default(type, inStream, options);
            }
            var data;
            switch (type.Name) {
                case "bool": {
                    data = new BooleanData_1.default(type, inStream, options);
                    break;
                }
                case "byte": {
                    data = new ByteData_1.default(type, inStream, options);
                    break;
                }
                case "short": {
                    data = new ShortData_1.default(type, inStream, options);
                    break;
                }
                case "float": {
                    data = new FloatData_1.default(type, inStream, options);
                    break;
                }
                case "int": {
                    data = new Int32Data_1.default(type, inStream, options);
                    break;
                }
                case "uint": {
                    data = new UShortData_1.default(type, inStream, options);
                    break;
                }
                case "long": {
                    data = new Int64Data_1.default(type, inStream, options);
                    break;
                }
                case "ulong": {
                    data = new UInt64Data_1.default(type, inStream, options);
                    break;
                }
                case "string": {
                    data = new StringData_1.default(type, inStream, options);
                    break;
                }
                default: {
                    var error = `Unknown value type name: ${type.Name}`;
                    throw new Error(error);
                }
            }
            return data;
        }
    }
    exports.default = TypeFactory;
});
define("Data/PointerData", ["require", "exports", "Data/AbstractData", "DatContainer", "Types/TypeFactory"], function (require, exports, AbstractData_11, DatContainer_12, TypeFactory_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class PointerData extends AbstractData_11.default {
        constructor(dataType, reader, options) {
            super(dataType);
            var flag = !options.containsKey("offset");
            if (flag) {
                throw new Error("Wrong parameters for reading PointerData");
            }
            this.RefType = dataType.RefType;
            this.Length = this.RefType.PointerWidth;
            this.Offset = options.getValue("offset");
            reader.seek(DatContainer_12.DatContainer.DataSectionOffset + this.Offset);
            var refParams = this.RefType.ReadPointer(reader);
            this.RefData = TypeFactory_2.default.CreateData(this.RefType, reader, refParams);
            DatContainer_12.DatContainer.DataPointers.setValue(this.Offset, this);
        }
        GetValueString() {
            return this.RefData.GetValueString();
        }
    }
    exports.default = PointerData;
});
define("FieldInfo", ["require", "exports", "Types/PointerDataType"], function (require, exports, PointerDataType_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class FieldInfo {
        constructor(type, index, recordOffset, id, description, isUser = false) {
            this.Index = index;
            this.Id = id;
            this.RecordOffset = recordOffset;
            this.Description = description;
            this.IsUser = isUser;
            this.IsPointer = type instanceof PointerDataType_2.default;
            this.FieldType = type;
        }
        GetFullName(delimiter) {
            return this.Id + delimiter + this.FieldType.Name + delimiter + (this.FieldType.Width === 1 ? "byte" : "bytes");
        }
    }
    exports.default = FieldInfo;
});
define("RecordInfo", ["require", "exports", "List"], function (require, exports, List_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class RecordInfo {
        constructor(fileName, length = 0, fields = new List_2.default()) {
            this.FileName = fileName;
            this.Length = length;
            this.Fields = fields;
            for (var i = 0; i < this.Fields.size(); i++) {
                var elem = this.Fields.get(i);
                if (elem !== undefined && elem.IsPointer) {
                    this.HasPointers = true;
                }
            }
            this.HasPointers = this.Fields.toArray().some((elem) => { return elem.IsPointer; });
        }
    }
    exports.default = RecordInfo;
});
define("FieldData", ["require", "exports", "Types/TypeFactory", "Dictionary", "util"], function (require, exports, TypeFactory_3, Dictionary_5, util_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class FieldData {
        constructor(fieldInfo, reader) {
            this.FieldInfo = fieldInfo;
            var offset = TypeFactory_3.default.GetDataSectionOffset(reader);
            var dictionary = new Dictionary_5.default();
            dictionary.setValue("offset", offset);
            this.Data = TypeFactory_3.default.CreateData(fieldInfo.FieldType, reader, dictionary);
        }
        GetOffsetPrefix() {
            if (!this.FieldInfo.IsPointer) {
                return "";
            }
            var pData = this.Data;
            if (util_2.isNullOrUndefined(pData)) {
                throw new Error("FieldData of pointer type doesn't have data of PointerData class");
            }
            if (this.FieldInfo.FieldType.Width != 8) {
                return `${pData.RefData.Offset}`;
            }
            var lData = pData.RefData;
            if (util_2.isNullOrUndefined(lData)) {
                throw new Error("Didn't find ListData data at offset of FieldData of pointer to list type");
            }
            return `[${lData.Count}]${pData.RefData.Offset}`;
        }
    }
    exports.default = FieldData;
});
define("RecordData", ["require", "exports", "FieldData", "List"], function (require, exports, FieldData_1, List_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class RecordData {
        constructor(recordInfo, inStream, index) {
            this.RecordInfo = recordInfo;
            this.Index = index;
            this.FieldsData = new List_3.default();
            inStream.seek(4 + recordInfo.Length * index);
            let startOffset = inStream.position();
            this.RecordInfo.Fields.toArray().forEach(element => {
                var elementOffset = (startOffset + element.RecordOffset);
                inStream.seek(elementOffset);
                var fieldData = new FieldData_1.default(element, inStream);
                this.FieldsData.add(fieldData);
                fieldData = null;
            });
        }
    }
    exports.default = RecordData;
});
define("RecordFactory", ["require", "exports", "Dictionary", "RecordInfo", "Types/TypeFactory", "xmldoc", "fs", "path", "util", "FieldInfo", "List"], function (require, exports, Dictionary_6, RecordInfo_1, TypeFactory_4, xmldoc_1, fs, path, util_3, FieldInfo_1, List_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class RecordFactory {
        static initialize() {
            this.UpdateRecordsInfo();
        }
        static UpdateRecordsInfo() {
            this.Records = new Dictionary_6.default();
            TypeFactory_4.default.LoadValueTypes();
            var definitionPath = path.join(__dirname, "./DatDefinitions.xml");
            var data = fs.readFileSync(definitionPath);
            var results = new xmldoc_1.XmlDocument(data.toString());
            var records = results.childNamed("records");
            var nodes = records.childrenNamed("record");
            if (util_3.isNullOrUndefined(nodes)) {
                throw new Error("Did not find any record definitions in xml file");
            }
            nodes.forEach(element => {
                this.ProcessRecordDefinition(element);
            });
            results = null;
        }
        static ProcessRecordDefinition(element) {
            var file = this.GetAttributeValue(element, "file");
            if (util_3.isNullOrUndefined(file)) {
                var error = `Invalid XML: record has wrong attribute 'id': ${element}`;
                throw new Error(error);
            }
            //var lengthString = this.GetAttributeValue(element, "length");
            /*if(isNullOrUndefined(lengthString)){
                var error = `Invalid XML: record has wrong attribute 'length': ${element}`
                throw new Error(error);
            }
            var length:number = Number(lengthString)
            if(length === 0){
                this.Records.setValue(file, new RecordInfo(file));
                return;
            }*/
            var fields = new List_4.default();
            var index = 0;
            var totalLength = 0;
            element.children.forEach(field => {
                if (field.name === "field") {
                    var fieldName = field.name;
                    if (fieldName !== "field") {
                        throw new Error(`Invalid XML: <record> contain wrong element number: ${fieldName}`);
                    }
                    var fieldId = this.GetAttributeValue(field, "id");
                    if (util_3.isNullOrUndefined(fieldId)) {
                        throw new Error(`Invalid XML: field has wrong attribute 'id': ${fieldName}`);
                    }
                    var fieldType = this.GetAttributeValue(field, "type");
                    if (util_3.isNullOrUndefined(fieldType)) {
                        throw new Error(`Invalid XML: couldn't find type for field: ${fieldName}`);
                    }
                    var dataType = TypeFactory_4.default.ParseType(fieldType);
                    var fieldDescription = this.GetAttributeValue(field, "description");
                    var isUserString = this.GetAttributeValue(field, "isUser");
                    var isUser = this.isNullOrEmpty(isUserString);
                    fields.add(new FieldInfo_1.default(dataType, index, totalLength, fieldId, fieldDescription, isUser));
                    index++;
                    totalLength += dataType.Width;
                }
            });
            //Checking if the length of the fields matches the xml length, seems foobar, the length is set arbitrary by
            //manual user edit, it really does nothing.
            /*if(totalLength != length){
                var error = `Total length of fields: ${totalLength} not equal to record length ${length} for file: ${file}`;
                var errorFields = ""
                fields.toArray().forEach(field => {
                    var errorField = `${field.FieldType.Name} = ${field.FieldType.Width}`;
                    errorFields += errorField;
                    console.log(errorField);
                });
                var errorText = error + errorFields + "\n";
                var errorPath = path.join(process.cwd(), "assets/error", `${file}.json`);
                fs.writeFile(errorPath, errorText, { flag: 'w' }, function (err) {
                  if (err) throw err;
                  console.log(`Error details saved for file: ${file}`);
                });
                //throw new Error(error);
            }*/
            //this.Records.setValue(file, new RecordInfo(file, length, fields));
            this.Records.setValue(file, new RecordInfo_1.default(file, totalLength, fields));
        }
        static isNullOrEmpty(s) {
            if (util_3.isUndefined(s)) {
                return true;
            }
            return !s;
        }
        static HasRecordInfo(fileName) {
            fileName = path.basename(fileName, '.dat');
            return this.Records.containsKey(fileName);
        }
        static GetRecordInfo(datName) {
            if (!this.Records.containsKey(datName)) {
                //throw new Error("Not defined parser for filename: "+datName);
            }
            return this.Records.getValue(datName);
        }
        static GetAttributeValue(element, attributeName) {
            if (util_3.isNullOrUndefined(element)) {
                throw new Error("Can not get attribute from an empty element");
            }
            var attributes = element.attr;
            if (util_3.isNullOrUndefined(attributes)) {
                return "";
            }
            var attribute = attributes[attributeName];
            return util_3.isNullOrUndefined(attribute) ? undefined : attribute;
        }
    }
    RecordFactory.Records = new Dictionary_6.default();
    exports.default = RecordFactory;
});
define("DatContainer", ["require", "exports", "Dictionary", "RecordData", "path", "fs", "RecordFactory", "util", "io", "List", "long", "lodash", "mkdirp"], function (require, exports, Dictionary_7, RecordData_1, path, fs, RecordFactory_1, util_4, io_1, List_5, Long, _, mkdirp) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class DatContainer {
        constructor(directory, filePath, x) {
            this.DataSectionDataLength = 0;
            if (filePath !== undefined && filePath.length > 0) {
                this.Directory = directory;
                this.DatName = path.basename(filePath, ".dat");
                this.Path = directory;
                RecordFactory_1.default.initialize();
                try {
                    var recordGuard = RecordFactory_1.default.GetRecordInfo(this.DatName);
                    if (util_4.isNullOrUndefined(recordGuard)) {
                        var errorString = `Could not find records for file: ${this.DatName}`;
                        this.SaveError(errorString);
                        throw new Error(errorString);
                    }
                    this.RecordInfo = recordGuard;
                    DatContainer.DataEntries = new Dictionary_7.default();
                    DatContainer.DataPointers = new Dictionary_7.default();
                    var fileToRead = `${directory}/${filePath}`;
                    var fileBytes = fs.readFile(fileToRead, (err, data) => {
                        var br = new io_1.BinaryReader(data, true);
                        this.Read(br);
                        x(this);
                    });
                }
                catch (e) {
                    console.log(e);
                }
            }
        }
        SaveError(errorString) {
            var pathToCreate = path.join(this.Directory, "error");
            mkdirp.sync(pathToCreate);
            var workingFile = this.DatName;
            var errorPath = path.join(this.Directory, "error", `${workingFile}.txt`);
            fs.writeFile(errorPath, errorString, { flag: 'w' }, function (err) {
                if (err)
                    throw err;
                console.log(`Error details saved for file: ${workingFile}`);
            });
        }
        Read(inStream) {
            try {
                this.Length = inStream.buffer.capacity();
                DatContainer.DataSectionOffset = 0;
                if (util_4.isNullOrUndefined(this.RecordInfo)) {
                    var errorString = `Missing dat parser for file: ${this.DatName}`;
                    this.SaveError(errorString);
                    throw new Error(errorString);
                }
                this.Count = inStream.ReadInt32();
                //find record length
                var actualRecordLength = this.FindRecordLength(inStream, this.Count);
                var errorString = `Actual record length = ${actualRecordLength} not equal length by the sum of each record in the xml specification: ${this.RecordInfo.Length}`;
                if (actualRecordLength != this.RecordInfo.Length) {
                    this.SaveError(errorString);
                    throw new Error(errorString);
                }
                DatContainer.DataSectionOffset = this.Count * actualRecordLength + 4;
                this.DataSectionDataLength = this.Length - DatContainer.DataSectionOffset - 8;
                inStream.seek(DatContainer.DataSectionOffset);
                var pattern = Long.fromNumber(0xBBbbBBbbBBbbBBbb, true);
                if (inStream.ReadUInt64().toNumber() !== pattern.toNumber()) {
                    throw new Error("Missing magic number after records");
                }
                inStream.seek(0);
                this._originalData = inStream.ReadBytes(this.Length);
                //read records
                if (actualRecordLength === 0) {
                    this.Records = new List_5.default();
                    return;
                }
                this.Records = new List_5.default();
                for (var i = 0; i < this.Count; i++) {
                    console.log("Processing record index:", i, " out of:", this.Count);
                    var recordData = new RecordData_1.default(this.RecordInfo, inStream, i);
                    this.Records.add(recordData);
                    recordData = null;
                }
            }
            catch (e) {
                console.log(e);
            }
        }
        SaveToCsv() {
            console.log("Converting Records to CSV...");
            fs.writeFile(`./${this.DatName}.csv`, this.GetCsvFormat(), function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log("The file was saved!");
            });
        }
        SaveToJson() {
            console.log("Converting Records to JSON...");
            var pathToCreate = path.join(this.Path, "json");
            mkdirp.sync(pathToCreate);
            var jsonPath = `${this.Path}/json/${this.DatName}.json`;
            var jsonToWrite = this.GetJsonFormat();
            fs.writeFile(jsonPath, jsonToWrite, function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log("The file was saved!");
            });
            return `/json/${this.DatName}.json`;
        }
        constructJson(csv) {
            const content = csv.split('\r\n');
            const header = content[0].split(',');
            return _.tail(content).map((row) => {
                return _.zipObject(header, row.split(','));
            });
        }
        FindRecordLength(inStream, numberOfEntries) {
            if (numberOfEntries === 0) {
                return 0;
            }
            if (util_4.isNullOrUndefined(inStream)) {
                return 0;
            }
            inStream.seek(4);
            var stringLength = inStream.buffer.capacity();
            var recordLength = 0;
            for (var i = 0; inStream.position() <= stringLength - 8; i++) {
                var ul = inStream.ReadUInt64();
                var pattern = Long.fromNumber(0xBBbbBBbbBBbbBBbb, true);
                if (ul.toNumber() === pattern.toNumber()) {
                    recordLength = i;
                    break;
                }
                inStream.seek(inStream.position() - 8 + numberOfEntries);
            }
            return recordLength;
        }
        GetJsonFormat() {
            var jsonArray = [];
            var result = "";
            var json = {};
            if (this.Records && this.RecordInfo) {
                this.Records.toArray().forEach(recordData => {
                    json = {};
                    json["Row"] = this.Records.indexOf(recordData);
                    recordData.FieldsData.toArray().forEach(fieldData => {
                        json[fieldData.FieldInfo.Id] = fieldData.Data.GetValueString();
                    });
                    jsonArray.push(json);
                });
            }
            return JSON.stringify(jsonArray, null, "\t");
        }
        GetCsvFormat() {
            const separator = ",";
            var csv = "";
            if (this.Records && this.RecordInfo) {
                var fieldInfos = this.RecordInfo.Fields;
                if (this.RecordInfo.Length === 0) {
                    var line = `Count: ${this.Count}`;
                    csv = csv.concat(line);
                    return csv;
                }
                //add header
                var line = `Rows${separator}`;
                csv = csv.concat(line);
                fieldInfos.toArray().forEach(field => {
                    var line = `${field.Id}${separator}`;
                    csv = csv.concat(line);
                });
                //Remove last comma
                csv = csv.replace(/,\s*$/, "");
                csv = csv.concat("\r\n");
                this.Records.toArray().forEach(recordData => {
                    //Add index
                    //console.log("RECORD DATA:", recordData);
                    var line = `${this.Records.indexOf(recordData)}${separator}`;
                    csv = csv.concat(line);
                    //recordData.RecordInfo.Fields.toArray().forEach(test => {
                    //	console.log("RECORD INFO FIELD: ", test);
                    //})
                    //Add fields
                    recordData.FieldsData.toArray().forEach(fieldData => {
                        var line = `${this.getCsvString(fieldData)}${separator}`;
                        //console.log("FIELD DATA: ", fieldData);
                        csv = csv.concat(line);
                    });
                    csv = csv.replace(/,\s*$/, "");
                    csv = csv.concat("\r\n");
                });
                csv = csv.replace(/,\s*$/, "");
                csv = csv.concat("\r\n");
            }
            return csv;
        }
        getCsvString(fieldData) {
            var str = fieldData.Data.GetValueString();
            var match = new RegExp(/(?:\r|\n|,)/gm);
            if (match.test(str)) {
                var replacement = str.replace("\"", "\"\"");
                str = `\"${replacement}\"`;
            }
            return str;
        }
    }
    DatContainer.DataSectionOffset = 0;
    exports.DatContainer = DatContainer;
});
define("Data/UInt32Data", ["require", "exports", "Data/AbstractData", "DatContainer"], function (require, exports, AbstractData_12, DatContainer_13) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UInt32Data extends AbstractData_12.default {
        constructor(type, reader, options) {
            super(type);
            if (!options.containsKey("offset")) {
                throw new Error("Wrong parameters for reading UInt32Data");
            }
            this.Offset = options.getValue("offset");
            reader.seek(DatContainer_13.DatContainer.DataSectionOffset + this.Offset);
            this.Value = reader.ReadUInt32();
            this.Length = type.Width;
        }
        GetValueString() {
            return this.Value == -16843010 ? "-1" : this.Value.toString();
        }
    }
    exports.default = UInt32Data;
});
//# sourceMappingURL=index.js.map