System.register("io", ["bytebuffer"], function (exports_1, context_1) {
    "use strict";
    var ByteBuffer, BinaryReader, BinaryWriter;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (ByteBuffer_1) {
                ByteBuffer = ByteBuffer_1;
            }
        ],
        execute: function () {
            BinaryReader = class BinaryReader {
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
            };
            exports_1("BinaryReader", BinaryReader);
            BinaryWriter = class BinaryWriter {
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
            };
            exports_1("BinaryWriter", BinaryWriter);
        }
    };
});
System.register("Dictionary", [], function (exports_2, context_2) {
    "use strict";
    var Dictionary;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
            Dictionary = class Dictionary {
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
            };
            exports_2("default", Dictionary);
        }
    };
});
System.register("Types/BaseDataType", ["Dictionary"], function (exports_3, context_3) {
    "use strict";
    var Dictionary_1, BaseDataType;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [
            function (Dictionary_1_1) {
                Dictionary_1 = Dictionary_1_1;
            }
        ],
        execute: function () {
            BaseDataType = class BaseDataType {
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
            };
            exports_3("BaseDataType", BaseDataType);
        }
    };
});
System.register("Data/AbstractData", [], function (exports_4, context_4) {
    "use strict";
    var AbstractData;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [],
        execute: function () {
            AbstractData = class AbstractData {
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
            };
            exports_4("default", AbstractData);
        }
    };
});
System.register("Types/PointerDataType", ["Types/BaseDataType"], function (exports_5, context_5) {
    "use strict";
    var BaseDataType_1, PointerDataType;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [
            function (BaseDataType_1_1) {
                BaseDataType_1 = BaseDataType_1_1;
            }
        ],
        execute: function () {
            PointerDataType = class PointerDataType extends BaseDataType_1.BaseDataType {
                constructor(name, width, pointerWidth, refType) {
                    super(name, width, pointerWidth);
                    this.RefType = refType;
                }
            };
            exports_5("default", PointerDataType);
        }
    };
});
System.register("Types/ListDataType", ["Types/BaseDataType", "Dictionary"], function (exports_6, context_6) {
    "use strict";
    var BaseDataType_2, Dictionary_2, ListDataType;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [
            function (BaseDataType_2_1) {
                BaseDataType_2 = BaseDataType_2_1;
            },
            function (Dictionary_2_1) {
                Dictionary_2 = Dictionary_2_1;
            }
        ],
        execute: function () {
            ListDataType = class ListDataType extends BaseDataType_2.BaseDataType {
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
            };
            exports_6("ListDataType", ListDataType);
        }
    };
});
System.register("List", [], function (exports_7, context_7) {
    "use strict";
    var List;
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [],
        execute: function () {
            List = class List {
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
            };
            exports_7("default", List);
        }
    };
});
System.register("Data/ListData", ["Data/AbstractData", "DatContainer", "Types/TypeFactory", "Dictionary", "List"], function (exports_8, context_8) {
    "use strict";
    var AbstractData_1, DatContainer_1, TypeFactory_1, Dictionary_3, List_1, ListData;
    var __moduleName = context_8 && context_8.id;
    return {
        setters: [
            function (AbstractData_1_1) {
                AbstractData_1 = AbstractData_1_1;
            },
            function (DatContainer_1_1) {
                DatContainer_1 = DatContainer_1_1;
            },
            function (TypeFactory_1_1) {
                TypeFactory_1 = TypeFactory_1_1;
            },
            function (Dictionary_3_1) {
                Dictionary_3 = Dictionary_3_1;
            },
            function (List_1_1) {
                List_1 = List_1_1;
            }
        ],
        execute: function () {
            ListData = class ListData extends AbstractData_1.default {
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
            };
            exports_8("default", ListData);
        }
    };
});
System.register("Data/ByteData", ["Data/AbstractData", "DatContainer"], function (exports_9, context_9) {
    "use strict";
    var AbstractData_2, DatContainer_2, ByteData;
    var __moduleName = context_9 && context_9.id;
    return {
        setters: [
            function (AbstractData_2_1) {
                AbstractData_2 = AbstractData_2_1;
            },
            function (DatContainer_2_1) {
                DatContainer_2 = DatContainer_2_1;
            }
        ],
        execute: function () {
            ByteData = class ByteData extends AbstractData_2.default {
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
            };
            exports_9("default", ByteData);
        }
    };
});
System.register("Data/ShortData", ["Data/AbstractData", "DatContainer"], function (exports_10, context_10) {
    "use strict";
    var AbstractData_3, DatContainer_3, ShortData;
    var __moduleName = context_10 && context_10.id;
    return {
        setters: [
            function (AbstractData_3_1) {
                AbstractData_3 = AbstractData_3_1;
            },
            function (DatContainer_3_1) {
                DatContainer_3 = DatContainer_3_1;
            }
        ],
        execute: function () {
            ShortData = class ShortData extends AbstractData_3.default {
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
            };
            exports_10("default", ShortData);
        }
    };
});
System.register("Data/UShortData", ["Data/AbstractData", "DatContainer"], function (exports_11, context_11) {
    "use strict";
    var AbstractData_4, DatContainer_4, UShortData;
    var __moduleName = context_11 && context_11.id;
    return {
        setters: [
            function (AbstractData_4_1) {
                AbstractData_4 = AbstractData_4_1;
            },
            function (DatContainer_4_1) {
                DatContainer_4 = DatContainer_4_1;
            }
        ],
        execute: function () {
            UShortData = class UShortData extends AbstractData_4.default {
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
            };
            exports_11("default", UShortData);
        }
    };
});
System.register("Data/FloatData", ["Data/AbstractData", "DatContainer"], function (exports_12, context_12) {
    "use strict";
    var AbstractData_5, DatContainer_5, FloatData;
    var __moduleName = context_12 && context_12.id;
    return {
        setters: [
            function (AbstractData_5_1) {
                AbstractData_5 = AbstractData_5_1;
            },
            function (DatContainer_5_1) {
                DatContainer_5 = DatContainer_5_1;
            }
        ],
        execute: function () {
            FloatData = class FloatData extends AbstractData_5.default {
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
            };
            exports_12("default", FloatData);
        }
    };
});
System.register("Data/Int32Data", ["Data/AbstractData", "DatContainer"], function (exports_13, context_13) {
    "use strict";
    var AbstractData_6, DatContainer_6, Int32Data;
    var __moduleName = context_13 && context_13.id;
    return {
        setters: [
            function (AbstractData_6_1) {
                AbstractData_6 = AbstractData_6_1;
            },
            function (DatContainer_6_1) {
                DatContainer_6 = DatContainer_6_1;
            }
        ],
        execute: function () {
            Int32Data = class Int32Data extends AbstractData_6.default {
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
            };
            exports_13("default", Int32Data);
        }
    };
});
System.register("Data/Int64Data", ["Data/AbstractData", "DatContainer", "long"], function (exports_14, context_14) {
    "use strict";
    var AbstractData_7, DatContainer_7, Long, Int64Data;
    var __moduleName = context_14 && context_14.id;
    return {
        setters: [
            function (AbstractData_7_1) {
                AbstractData_7 = AbstractData_7_1;
            },
            function (DatContainer_7_1) {
                DatContainer_7 = DatContainer_7_1;
            },
            function (Long_1) {
                Long = Long_1;
            }
        ],
        execute: function () {
            Int64Data = class Int64Data extends AbstractData_7.default {
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
            };
            exports_14("default", Int64Data);
        }
    };
});
System.register("Data/UInt64Data", ["Data/AbstractData", "DatContainer", "long"], function (exports_15, context_15) {
    "use strict";
    var AbstractData_8, DatContainer_8, Long, UInt64Data;
    var __moduleName = context_15 && context_15.id;
    return {
        setters: [
            function (AbstractData_8_1) {
                AbstractData_8 = AbstractData_8_1;
            },
            function (DatContainer_8_1) {
                DatContainer_8 = DatContainer_8_1;
            },
            function (Long_2) {
                Long = Long_2;
            }
        ],
        execute: function () {
            UInt64Data = class UInt64Data extends AbstractData_8.default {
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
            };
            exports_15("default", UInt64Data);
        }
    };
});
System.register("Data/StringData", ["Data/AbstractData", "DatContainer"], function (exports_16, context_16) {
    "use strict";
    var AbstractData_9, DatContainer_9, StringData;
    var __moduleName = context_16 && context_16.id;
    return {
        setters: [
            function (AbstractData_9_1) {
                AbstractData_9 = AbstractData_9_1;
            },
            function (DatContainer_9_1) {
                DatContainer_9 = DatContainer_9_1;
            }
        ],
        execute: function () {
            StringData = class StringData extends AbstractData_9.default {
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
            };
            exports_16("default", StringData);
        }
    };
});
System.register("Data/BooleanData", ["Data/AbstractData", "DatContainer"], function (exports_17, context_17) {
    "use strict";
    var AbstractData_10, DatContainer_10, BooleanData;
    var __moduleName = context_17 && context_17.id;
    return {
        setters: [
            function (AbstractData_10_1) {
                AbstractData_10 = AbstractData_10_1;
            },
            function (DatContainer_10_1) {
                DatContainer_10 = DatContainer_10_1;
            }
        ],
        execute: function () {
            BooleanData = class BooleanData extends AbstractData_10.default {
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
            };
            exports_17("default", BooleanData);
        }
    };
});
System.register("Types/TypeFactory", ["DatContainer", "Types/BaseDataType", "typescript-dotnet-umd/System/Text/RegularExpressions", "util", "Types/PointerDataType", "Types/ListDataType", "Data/ListData", "Dictionary", "Data/PointerData", "Data/ByteData", "Data/ShortData", "Data/UShortData", "Data/FloatData", "Data/Int32Data", "Data/Int64Data", "Data/UInt64Data", "Data/StringData", "Data/BooleanData"], function (exports_18, context_18) {
    "use strict";
    var DatContainer_11, BaseDataType_3, RegularExpressions_1, util_1, PointerDataType_1, ListDataType_1, ListData_1, Dictionary_4, PointerData_1, ByteData_1, ShortData_1, UShortData_1, FloatData_1, Int32Data_1, Int64Data_1, UInt64Data_1, StringData_1, BooleanData_1, TypeFactory;
    var __moduleName = context_18 && context_18.id;
    return {
        setters: [
            function (DatContainer_11_1) {
                DatContainer_11 = DatContainer_11_1;
            },
            function (BaseDataType_3_1) {
                BaseDataType_3 = BaseDataType_3_1;
            },
            function (RegularExpressions_1_1) {
                RegularExpressions_1 = RegularExpressions_1_1;
            },
            function (util_1_1) {
                util_1 = util_1_1;
            },
            function (PointerDataType_1_1) {
                PointerDataType_1 = PointerDataType_1_1;
            },
            function (ListDataType_1_1) {
                ListDataType_1 = ListDataType_1_1;
            },
            function (ListData_1_1) {
                ListData_1 = ListData_1_1;
            },
            function (Dictionary_4_1) {
                Dictionary_4 = Dictionary_4_1;
            },
            function (PointerData_1_1) {
                PointerData_1 = PointerData_1_1;
            },
            function (ByteData_1_1) {
                ByteData_1 = ByteData_1_1;
            },
            function (ShortData_1_1) {
                ShortData_1 = ShortData_1_1;
            },
            function (UShortData_1_1) {
                UShortData_1 = UShortData_1_1;
            },
            function (FloatData_1_1) {
                FloatData_1 = FloatData_1_1;
            },
            function (Int32Data_1_1) {
                Int32Data_1 = Int32Data_1_1;
            },
            function (Int64Data_1_1) {
                Int64Data_1 = Int64Data_1_1;
            },
            function (UInt64Data_1_1) {
                UInt64Data_1 = UInt64Data_1_1;
            },
            function (StringData_1_1) {
                StringData_1 = StringData_1_1;
            },
            function (BooleanData_1_1) {
                BooleanData_1 = BooleanData_1_1;
            }
        ],
        execute: function () {
            TypeFactory = class TypeFactory {
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
            };
            exports_18("default", TypeFactory);
        }
    };
});
System.register("Data/PointerData", ["Data/AbstractData", "DatContainer", "Types/TypeFactory"], function (exports_19, context_19) {
    "use strict";
    var AbstractData_11, DatContainer_12, TypeFactory_2, PointerData;
    var __moduleName = context_19 && context_19.id;
    return {
        setters: [
            function (AbstractData_11_1) {
                AbstractData_11 = AbstractData_11_1;
            },
            function (DatContainer_12_1) {
                DatContainer_12 = DatContainer_12_1;
            },
            function (TypeFactory_2_1) {
                TypeFactory_2 = TypeFactory_2_1;
            }
        ],
        execute: function () {
            PointerData = class PointerData extends AbstractData_11.default {
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
            };
            exports_19("default", PointerData);
        }
    };
});
System.register("FieldInfo", ["Types/PointerDataType"], function (exports_20, context_20) {
    "use strict";
    var PointerDataType_2, FieldInfo;
    var __moduleName = context_20 && context_20.id;
    return {
        setters: [
            function (PointerDataType_2_1) {
                PointerDataType_2 = PointerDataType_2_1;
            }
        ],
        execute: function () {
            FieldInfo = class FieldInfo {
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
            };
            exports_20("default", FieldInfo);
        }
    };
});
System.register("RecordInfo", ["List"], function (exports_21, context_21) {
    "use strict";
    var List_2, RecordInfo;
    var __moduleName = context_21 && context_21.id;
    return {
        setters: [
            function (List_2_1) {
                List_2 = List_2_1;
            }
        ],
        execute: function () {
            RecordInfo = class RecordInfo {
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
            };
            exports_21("default", RecordInfo);
        }
    };
});
System.register("FieldData", ["Types/TypeFactory", "Dictionary", "util"], function (exports_22, context_22) {
    "use strict";
    var TypeFactory_3, Dictionary_5, util_2, FieldData;
    var __moduleName = context_22 && context_22.id;
    return {
        setters: [
            function (TypeFactory_3_1) {
                TypeFactory_3 = TypeFactory_3_1;
            },
            function (Dictionary_5_1) {
                Dictionary_5 = Dictionary_5_1;
            },
            function (util_2_1) {
                util_2 = util_2_1;
            }
        ],
        execute: function () {
            FieldData = class FieldData {
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
            };
            exports_22("default", FieldData);
        }
    };
});
System.register("RecordData", ["FieldData", "List"], function (exports_23, context_23) {
    "use strict";
    var FieldData_1, List_3, RecordData;
    var __moduleName = context_23 && context_23.id;
    return {
        setters: [
            function (FieldData_1_1) {
                FieldData_1 = FieldData_1_1;
            },
            function (List_3_1) {
                List_3 = List_3_1;
            }
        ],
        execute: function () {
            RecordData = class RecordData {
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
            };
            exports_23("default", RecordData);
        }
    };
});
System.register("RecordFactory", ["Dictionary", "RecordInfo", "Types/TypeFactory", "xmldoc", "fs", "path", "util", "FieldInfo", "List"], function (exports_24, context_24) {
    "use strict";
    var Dictionary_6, RecordInfo_1, TypeFactory_4, xmldoc_1, fs, path, util_3, FieldInfo_1, List_4, RecordFactory;
    var __moduleName = context_24 && context_24.id;
    return {
        setters: [
            function (Dictionary_6_1) {
                Dictionary_6 = Dictionary_6_1;
            },
            function (RecordInfo_1_1) {
                RecordInfo_1 = RecordInfo_1_1;
            },
            function (TypeFactory_4_1) {
                TypeFactory_4 = TypeFactory_4_1;
            },
            function (xmldoc_1_1) {
                xmldoc_1 = xmldoc_1_1;
            },
            function (fs_1) {
                fs = fs_1;
            },
            function (path_1) {
                path = path_1;
            },
            function (util_3_1) {
                util_3 = util_3_1;
            },
            function (FieldInfo_1_1) {
                FieldInfo_1 = FieldInfo_1_1;
            },
            function (List_4_1) {
                List_4 = List_4_1;
            }
        ],
        execute: function () {
            RecordFactory = class RecordFactory {
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
            };
            RecordFactory.Records = new Dictionary_6.default();
            exports_24("default", RecordFactory);
        }
    };
});
System.register("DatContainer", ["Dictionary", "RecordData", "path", "fs", "RecordFactory", "util", "io", "List", "long", "lodash", "mkdirp"], function (exports_25, context_25) {
    "use strict";
    var Dictionary_7, RecordData_1, path, fs, RecordFactory_1, util_4, io_1, List_5, Long, _, mkdirp, DatContainer;
    var __moduleName = context_25 && context_25.id;
    return {
        setters: [
            function (Dictionary_7_1) {
                Dictionary_7 = Dictionary_7_1;
            },
            function (RecordData_1_1) {
                RecordData_1 = RecordData_1_1;
            },
            function (path_2) {
                path = path_2;
            },
            function (fs_2) {
                fs = fs_2;
            },
            function (RecordFactory_1_1) {
                RecordFactory_1 = RecordFactory_1_1;
            },
            function (util_4_1) {
                util_4 = util_4_1;
            },
            function (io_1_1) {
                io_1 = io_1_1;
            },
            function (List_5_1) {
                List_5 = List_5_1;
            },
            function (Long_3) {
                Long = Long_3;
            },
            function (_1) {
                _ = _1;
            },
            function (mkdirp_1) {
                mkdirp = mkdirp_1;
            }
        ],
        execute: function () {
            DatContainer = class DatContainer {
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
            };
            DatContainer.DataSectionOffset = 0;
            exports_25("DatContainer", DatContainer);
        }
    };
});
System.register("Data/UInt32Data", ["Data/AbstractData", "DatContainer"], function (exports_26, context_26) {
    "use strict";
    var AbstractData_12, DatContainer_13, UInt32Data;
    var __moduleName = context_26 && context_26.id;
    return {
        setters: [
            function (AbstractData_12_1) {
                AbstractData_12 = AbstractData_12_1;
            },
            function (DatContainer_13_1) {
                DatContainer_13 = DatContainer_13_1;
            }
        ],
        execute: function () {
            UInt32Data = class UInt32Data extends AbstractData_12.default {
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
            };
            exports_26("default", UInt32Data);
        }
    };
});
//# sourceMappingURL=index.js.map