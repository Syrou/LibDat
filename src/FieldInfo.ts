import AbstractData from "./Data/AbstractData";
import { BinaryReader } from "./io";
import { BaseDataType } from "./Types/BaseDataType";
import PointerDataType from "./Types/PointerDataType";

export default class FieldInfo{
    Index:number
    RecordOffset:number
    Id:string
    Description:string
    IsUser:boolean
    FieldType:BaseDataType
    IsPointer:boolean

    constructor(type:BaseDataType, index:number, recordOffset:number, id:string, description:string, isUser:boolean = false)
    {
        this.Index = index;
        this.Id = id;
        this.RecordOffset = recordOffset;
        this.Description = description;
        this.IsUser = isUser;
        this.IsPointer = type instanceof PointerDataType;
        this.FieldType = type;
    }

    GetFullName(delimiter:string){
        return this.Id + delimiter + this.FieldType.Name + delimiter + (this.FieldType.Width === 1 ? "byte" : "bytes")
    }
}