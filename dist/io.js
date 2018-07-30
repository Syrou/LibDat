"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ByteBuffer = require("bytebuffer");
var BinaryReader = /** @class */ (function () {
    function BinaryReader(data, littleEndian) {
        this.buffer = ByteBuffer.wrap(data, littleEndian);
        this.buffer.offset = 0;
        this.LittleEndian = littleEndian;
    }
    BinaryReader.prototype.seek = function (position) {
        this.buffer.offset = position;
    };
    BinaryReader.prototype.position = function () {
        return this.buffer.offset;
    };
    BinaryReader.prototype.readUInt8 = function () {
        var value = this.buffer.readUint8();
        return value;
    };
    BinaryReader.prototype.ReadUInt32 = function () {
        var s_Val = this.buffer.readUint32();
        return s_Val;
    };
    BinaryReader.prototype.ReadBoolean = function () {
        var value = this.buffer.readByte();
        return value != 0;
    };
    BinaryReader.prototype.ReadInt8 = function () {
        var s_Val = this.buffer.readInt8();
        return s_Val;
    };
    BinaryReader.prototype.ReadInt16 = function () {
        return this.buffer.readInt16();
        ;
    };
    BinaryReader.prototype.ReadUInt16 = function () {
        return this.buffer.readUint16();
    };
    BinaryReader.prototype.ReadInt32 = function () {
        return this.buffer.readInt32();
    };
    BinaryReader.prototype.ReadUInt64 = function () {
        return this.buffer.readUint64();
    };
    BinaryReader.prototype.ReadInt64 = function () {
        return this.buffer.readInt64();
    };
    BinaryReader.prototype.ReadFloat = function () {
        return this.buffer.readFloat();
    };
    BinaryReader.prototype.ReadDouble = function () {
        return this.buffer.readDouble();
    };
    BinaryReader.prototype.ReadByte = function () {
        return this.buffer.readByte();
    };
    BinaryReader.prototype.ReadBytes = function (length) {
        return this.buffer.readBytes(length);
    };
    BinaryReader.prototype.ReadString = function () {
        var strb = "";
        var chr;
        while ((chr = this.buffer.readInt16()) != 0) {
            strb = strb.concat(String.fromCharCode(chr));
        }
        if (chr != 0) {
            console.log("OOOPS?");
        }
        return strb;
    };
    return BinaryReader;
}());
exports.BinaryReader = BinaryReader;
var BinaryWriter = /** @class */ (function () {
    function BinaryWriter(capacity, endianness) {
        this.ByteBuffer = new ByteBuffer(capacity, endianness);
        this.Endianness = endianness;
    }
    BinaryWriter.prototype.WriteBoolean = function (value) {
        var boolByte = value ? 1 : 0;
        this.ByteBuffer.writeByte(boolByte);
    };
    BinaryWriter.prototype.WriteUInt8 = function (value) {
        this.ByteBuffer.writeUint8(value);
    };
    BinaryWriter.prototype.WriteUInt16 = function (value) {
        this.ByteBuffer.writeUint16(value);
    };
    BinaryWriter.prototype.WriteUInt32 = function (value) {
        this.ByteBuffer.writeUint32(value);
    };
    BinaryWriter.prototype.WriteInt8 = function (value) {
        this.ByteBuffer.writeInt8(value);
    };
    BinaryWriter.prototype.WriteInt16 = function (value) {
        this.ByteBuffer.writeInt16(value);
    };
    BinaryWriter.prototype.WriteInt32 = function (value) {
        this.ByteBuffer.writeInt32(value);
    };
    BinaryWriter.prototype.WriteInt64 = function (value) {
        this.ByteBuffer.writeInt64(value);
    };
    BinaryWriter.prototype.WriteUInt64 = function (value) {
        this.ByteBuffer.writeUint64(value);
    };
    BinaryWriter.prototype.WriteFloat = function (value) {
        this.ByteBuffer.writeFloat(value);
    };
    BinaryWriter.prototype.WriteDouble = function (value) {
        this.ByteBuffer.writeDouble(value);
    };
    BinaryWriter.prototype.WriteBytes = function (value, endcoding) {
        this.ByteBuffer.writeBytes(value, endcoding);
    };
    BinaryWriter.prototype.WriteByte = function (value) {
        this.ByteBuffer.writeByte(value);
    };
    BinaryWriter.prototype.WriteString = function (value) {
        this.ByteBuffer.writeCString(value);
    };
    return BinaryWriter;
}());
exports.BinaryWriter = BinaryWriter;
//# sourceMappingURL=io.js.map