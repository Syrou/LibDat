/// <reference types="bytebuffer" />
/// <reference types="node" />
/// <reference types="long" />
declare module "io" {
    import * as ByteBuffer from "bytebuffer";
    import * as Long from "long";
    class BinaryReader {
        buffer: ByteBuffer;
        LittleEndian: boolean;
        constructor(data: Buffer, littleEndian: boolean);
        seek(position: number): void;
        position(): number;
        readUInt8(): number;
        ReadUInt32(): number;
        ReadBoolean(): boolean;
        ReadInt8(): number;
        ReadInt16(): number;
        ReadUInt16(): number;
        ReadInt32(): number;
        ReadUInt64(): Long;
        ReadInt64(): Long;
        ReadFloat(): number;
        ReadDouble(): number;
        ReadByte(): number;
        ReadBytes(length: number): ByteBuffer;
        ReadString(): string;
    }
    class BinaryWriter {
        ByteBuffer: ByteBuffer;
        Endianness: boolean;
        constructor(capacity: number, endianness: boolean);
        WriteBoolean(value: boolean): void;
        WriteUInt8(value: number): void;
        WriteUInt16(value: number): void;
        WriteUInt32(value: number): void;
        WriteInt8(value: number): void;
        WriteInt16(value: number): void;
        WriteInt32(value: number): void;
        WriteInt64(value: Long): void;
        WriteUInt64(value: Long): void;
        WriteFloat(value: number): void;
        WriteDouble(value: number): void;
        WriteBytes(value: any, endcoding: any): void;
        WriteByte(value: number): void;
        WriteString(value: string): void;
    }
    export { BinaryReader, BinaryWriter };
}
declare module "Dictionary" {
    export class Dictionary<K, V> {
        map: Map<K, V>;
        constructor();
        setValue(key: K, value: V): void;
        remove(key: K): void;
        getValue(key: K): V | undefined;
        containsKey(key: K): boolean;
    }
}
declare module "Types/BaseDataType" {
    import { BinaryReader } from "io";
    import Dictionary from "Dictionary";
    export class BaseDataType {
        Name: string;
        Width: number;
        PointerWidth: number;
        constructor(name: string, width: number, pointerWidth: number);
        ReadPointer(reader: BinaryReader): Dictionary<string, any>;
    }
}
declare module "Data/AbstractData" {
    import { BaseDataType } from "Types/BaseDataType";
    import { BinaryWriter } from "io";
    export class AbstractData {
        Offset: number;
        Length: number;
        Type: BaseDataType;
        constructor(type: BaseDataType);
        WritePointer(writer: BinaryWriter): void;
        WritePointerOffset(writer: BinaryWriter, NewOffset: number): void;
        GetValueString(): string;
    }
}
declare module "Types/PointerDataType" {
    import { BaseDataType } from "Types/BaseDataType";
    export class PointerDataType extends BaseDataType {
        RefType: BaseDataType;
        constructor(name: string, width: number, pointerWidth: number, refType: BaseDataType);
    }
}
declare module "Types/ListDataType" {
    import { BaseDataType } from "Types/BaseDataType";
    import { BinaryReader } from "io";
    import Dictionary from "Dictionary";
    export class ListDataType extends BaseDataType {
        ListType: BaseDataType;
        constructor(name: string, width: number, pointerWidth: number, listType: BaseDataType);
        ReadPointer(reader: BinaryReader): Dictionary<string, any>;
    }
}
declare module "List" {
    export class List<T> {
        private items;
        constructor();
        size(): number;
        add(value: T): void;
        get(index: number): T;
        toArray(): Array<T>;
        indexOf(element: T): number;
        clear(): void;
    }
}
declare module "Data/ListData" {
    import AbstractData from "Data/AbstractData";
    import { ListDataType } from "Types/ListDataType";
    import { BinaryReader, BinaryWriter } from "io";
    import { BaseDataType } from "Types/BaseDataType";
    import Dictionary from "Dictionary";
    import List from "List";
    export class ListData extends AbstractData {
        Count: number;
        List: List<AbstractData>;
        ListType: BaseDataType;
        constructor(type: ListDataType, reader: BinaryReader, options: Dictionary<string, any>);
        WritePointer(writer: BinaryWriter): void;
        GetValueString(): string;
    }
}
declare module "Data/ByteData" {
    import AbstractData from "Data/AbstractData";
    import { BaseDataType } from "Types/BaseDataType";
    import { BinaryReader } from "io";
    import Dictionary from "Dictionary";
    export class ByteData extends AbstractData {
        Value: number;
        constructor(type: BaseDataType, reader: BinaryReader, options: Dictionary<string, any>);
        GetValueString(): string;
    }
}
declare module "Data/ShortData" {
    import AbstractData from "Data/AbstractData";
    import { BaseDataType } from "Types/BaseDataType";
    import { BinaryReader } from "io";
    import Dictionary from "Dictionary";
    export class ShortData extends AbstractData {
        Value: number;
        constructor(type: BaseDataType, reader: BinaryReader, options: Dictionary<string, any>);
        GetValueString(): string;
    }
}
declare module "Data/UShortData" {
    import AbstractData from "Data/AbstractData";
    import { BaseDataType } from "Types/BaseDataType";
    import { BinaryReader } from "io";
    import Dictionary from "Dictionary";
    export class UShortData extends AbstractData {
        Value: number;
        constructor(type: BaseDataType, reader: BinaryReader, options: Dictionary<string, any>);
        GetValueString(): string;
    }
}
declare module "Data/FloatData" {
    import AbstractData from "Data/AbstractData";
    import { BaseDataType } from "Types/BaseDataType";
    import { BinaryReader } from "io";
    import Dictionary from "Dictionary";
    export class FloatData extends AbstractData {
        Value: number;
        constructor(type: BaseDataType, reader: BinaryReader, options: Dictionary<string, any>);
        GetValueString(): string;
    }
}
declare module "Data/Int32Data" {
    import AbstractData from "Data/AbstractData";
    import { BaseDataType } from "Types/BaseDataType";
    import { BinaryReader } from "io";
    import Dictionary from "Dictionary";
    export class Int32Data extends AbstractData {
        Value: number;
        constructor(type: BaseDataType, reader: BinaryReader, options: Dictionary<string, any>);
        GetValueString(): string;
    }
}
declare module "Data/Int64Data" {
    import AbstractData from "Data/AbstractData";
    import { BaseDataType } from "Types/BaseDataType";
    import { BinaryReader } from "io";
    import Dictionary from "Dictionary";
    import * as Long from "long";
    export class Int64Data extends AbstractData {
        Value: Long;
        constructor(type: BaseDataType, reader: BinaryReader, options: Dictionary<string, any>);
        GetValueString(): string;
    }
}
declare module "Data/UInt64Data" {
    import AbstractData from "Data/AbstractData";
    import { BaseDataType } from "Types/BaseDataType";
    import { BinaryReader } from "io";
    import Dictionary from "Dictionary";
    import * as Long from "long";
    export class UInt64Data extends AbstractData {
        Value: Long;
        constructor(type: BaseDataType, reader: BinaryReader, options: Dictionary<string, any>);
        GetValueString(): string;
    }
}
declare module "Data/StringData" {
    import AbstractData from "Data/AbstractData";
    import { BaseDataType } from "Types/BaseDataType";
    import { BinaryReader } from "io";
    import Dictionary from "Dictionary";
    export class StringData extends AbstractData {
        Value: string;
        constructor(type: BaseDataType, reader: BinaryReader, options: Dictionary<string, any>);
        GetValueString(): string;
    }
}
declare module "Data/BooleanData" {
    import AbstractData from "Data/AbstractData";
    import { BaseDataType } from "Types/BaseDataType";
    import { BinaryReader } from "io";
    import Dictionary from "Dictionary";
    export class BooleanData extends AbstractData {
        Value: boolean;
        constructor(type: BaseDataType, reader: BinaryReader, options: Dictionary<string, any>);
        GetValueString(): string;
    }
}
declare module "Types/TypeFactory" {
    import { BinaryReader } from "io";
    import { BaseDataType } from "Types/BaseDataType";
    import AbstractData from "Data/AbstractData";
    import Dictionary from "Dictionary";
    export class TypeFactory {
        static _types: Dictionary<string, BaseDataType>;
        static GetDataSectionOffset(reader: BinaryReader): number;
        static ParseType(fieldType: string): BaseDataType;
        private static ParseValueType;
        static LoadValueTypes(): void;
        private static HasTypeInfo;
        private static GetTypeInfo;
        static CreateData(type: BaseDataType, inStream: BinaryReader, options: Dictionary<string, any>): AbstractData;
    }
}
declare module "Data/PointerData" {
    import AbstractData from "Data/AbstractData";
    import { BaseDataType } from "Types/BaseDataType";
    import PointerDataType from "Types/PointerDataType";
    import { BinaryReader } from "io";
    import Dictionary from "Dictionary";
    export class PointerData extends AbstractData {
        RefData: AbstractData;
        RefType: BaseDataType;
        constructor(dataType: PointerDataType, reader: BinaryReader, options: Dictionary<string, any>);
        GetValueString(): string;
    }
}
declare module "FieldInfo" {
    import { BaseDataType } from "Types/BaseDataType";
    export class FieldInfo {
        Index: number;
        RecordOffset: number;
        Id: string;
        Description: string;
        IsUser: boolean;
        FieldType: BaseDataType;
        IsPointer: boolean;
        constructor(type: BaseDataType, index: number, recordOffset: number, id: string, description: string, isUser?: boolean);
        GetFullName(delimiter: string): string;
    }
}
declare module "RecordInfo" {
    import FieldInfo from "FieldInfo";
    import List from "List";
    export class RecordInfo {
        FileName: string;
        Length: number;
        readonly Fields: List<FieldInfo>;
        HasPointers: boolean;
        constructor(fileName: string, length?: number, fields?: List<FieldInfo>);
    }
}
declare module "FieldData" {
    import AbstractData from "Data/AbstractData";
    import { BinaryReader } from "io";
    import FieldInfo from "FieldInfo";
    export class FieldData {
        Data: AbstractData;
        FieldInfo: FieldInfo;
        constructor(fieldInfo: FieldInfo, reader: BinaryReader);
        GetOffsetPrefix(): string;
    }
}
declare module "RecordData" {
    import RecordInfo from "RecordInfo";
    import FieldData from "FieldData";
    import { BinaryReader } from "io";
    import List from "List";
    export class RecordData {
        RecordInfo: RecordInfo;
        Index: number;
        readonly FieldsData: List<FieldData>;
        constructor(recordInfo: RecordInfo, inStream: BinaryReader, index: number);
    }
}
declare module "RecordFactory" {
    import Dictionary from "Dictionary";
    import RecordInfo from "RecordInfo";
    export class RecordFactory {
        static Records: Dictionary<string, RecordInfo>;
        static initialize(): void;
        static UpdateRecordsInfo(): void;
        private static ProcessRecordDefinition;
        static isNullOrEmpty(s: string | undefined): boolean;
        static HasRecordInfo(fileName: string): boolean;
        static GetRecordInfo(datName: string): RecordInfo | undefined;
        private static GetAttributeValue;
    }
}
declare module "DatContainer" {
    import PointerData from "Data/PointerData";
    import Dictionary from "Dictionary";
    import AbstractData from "Data/AbstractData";
    import RecordInfo from "RecordInfo";
    import RecordData from "RecordData";
    import { BinaryReader } from "io";
    import FieldData from "FieldData";
    import List from "List";
    export class DatContainer {
        readonly DatName: string;
        readonly Path: string;
        readonly Directory: string;
        Length: number;
        Count: number;
        RecordInfo: RecordInfo;
        static DataSectionOffset: number;
        DataSectionDataLength: number;
        private _originalData;
        Records: List<RecordData>;
        static DataEntries: Dictionary<number, AbstractData>;
        static DataPointers: Dictionary<number, PointerData>;
        constructor(directory: string, filePath: string, x: (instance: DatContainer) => void);
        SaveError(errorString: String): void;
        Read(inStream: BinaryReader): void;
        SaveToCsv(): void;
        SaveToJson(): string;
        private constructJson;
        private FindRecordLength;
        GetJsonFormat(): string;
        GetCsvFormat(): string;
        getCsvString(fieldData: FieldData): string;
    }
}
declare module "Data/UInt32Data" {
    import AbstractData from "Data/AbstractData";
    import { BaseDataType } from "Types/BaseDataType";
    import { BinaryReader } from "io";
    import Dictionary from "Dictionary";
    export class UInt32Data extends AbstractData {
        Value: number;
        constructor(type: BaseDataType, reader: BinaryReader, options: Dictionary<string, any>);
        GetValueString(): string;
    }
}
