/// <reference types="node" />
import * as ByteBuffer from "bytebuffer";
import * as Long from "long";
declare class BinaryReader {
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
declare class BinaryWriter {
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
