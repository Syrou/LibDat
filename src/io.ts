import { StringBuilder } from "typescript-dotnet-umd/System/Text/StringBuilder"
import Char from 'typescript-char'
import * as ByteBuffer from "bytebuffer"
import * as Long from "long"

class BinaryReader {
    buffer:ByteBuffer;
    LittleEndian:boolean;
    constructor(data:Buffer, littleEndian:boolean){
        this.buffer = ByteBuffer.wrap(data, littleEndian)
        this.buffer.offset = 0;
        this.LittleEndian = littleEndian;
    }

    seek(position:number){
        this.buffer.offset = position;
    }

    position():number{
        return this.buffer.offset;
    }

    readUInt8():number{
        var value = this.buffer.readUint8();
        return value;
    }

    ReadUInt32(): number {
        var s_Val = this.buffer.readUint32();
        return s_Val;
    }

    ReadBoolean(): boolean {
        var value = this.buffer.readByte()
        return value != 0
    }

    ReadInt8():number {
        var s_Val = this.buffer.readInt8();
        return s_Val;
    }
    
    ReadInt16():number {
        return this.buffer.readInt16();;
    }

    ReadUInt16():number{
        return this.buffer.readUint16();
    }

    ReadInt32():number {
        return this.buffer.readInt32();
    }

    ReadUInt64():Long {
        return this.buffer.readUint64();
    }

    ReadInt64():Long {
        return this.buffer.readInt64();
    }

    ReadFloat():number {
        return this.buffer.readFloat();
    }

    ReadDouble():number {
        return this.buffer.readDouble();
    }

    ReadByte():number{
        return this.buffer.readByte();
    }
    
    ReadBytes(length:number):ByteBuffer {
        return this.buffer.readBytes(length);
    }

    ReadString():string{
        var strb = ""
        var chr;
        while((chr = this.buffer.readInt16()) != 0){
            strb = strb.concat(String.fromCharCode(chr))
        }
        if(chr != 0){
            console.log("OOOPS?");
        }
        return strb

    }
}

class BinaryWriter {
    ByteBuffer:ByteBuffer;
    Endianness:boolean;
    constructor(capacity:number,endianness:boolean){
        this.ByteBuffer = new ByteBuffer(capacity,endianness);
        this.Endianness = endianness;
    }

    WriteBoolean(value:boolean) {
        var boolByte:number = value?1:0;
        this.ByteBuffer.writeByte(boolByte)
    }

    WriteUInt8(value:number) {
        this.ByteBuffer.writeUint8(value);
    }

    WriteUInt16(value:number) {
        this.ByteBuffer.writeUint16(value);
    }

    WriteUInt32(value:number) {
        this.ByteBuffer.writeUint32(value);
    }

    WriteInt8(value:number) {
        this.ByteBuffer.writeInt8(value);
    }

    WriteInt16(value:number) {
        this.ByteBuffer.writeInt16(value);
    }

    WriteInt32(value:number) {
        this.ByteBuffer.writeInt32(value);
    }

    WriteInt64(value:Long){
        this.ByteBuffer.writeInt64(value);
    }

    WriteUInt64(value:Long){
        this.ByteBuffer.writeUint64(value);
    }

    WriteFloat(value:number) {
        this.ByteBuffer.writeFloat(value);
    }

    WriteDouble(value:number) {
        this.ByteBuffer.writeDouble(value);
    }

    WriteBytes(value:any, endcoding:any) {
        this.ByteBuffer.writeBytes(value, endcoding);
    }

    WriteByte(value:number){
        this.ByteBuffer.writeByte(value);
    }

    WriteString(value:string){
        this.ByteBuffer.writeCString(value);
    }
}

export {
    BinaryReader,
    BinaryWriter
}