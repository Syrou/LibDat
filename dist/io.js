"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ByteBuffer = require("bytebuffer");
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
        var chr = -1;
        if (this.position() + 2 < this.buffer.capacity()) {
            while ((chr = this.buffer.readInt16()) != 0) {
                strb = strb.concat(String.fromCharCode(chr));
            }
        }
        if (chr != 0) {
            throw Error("We were trying to find a string, but found no null terminator, this is probably not a string type");
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
//# sourceMappingURL=io.js.map