import AbstractData from "./AbstractData";
import { BaseDataType } from "../Types/BaseDataType";
import { BinaryReader, BinaryWriter } from "../io";
import Dictionary from '../Dictionary'
import { DatContainer } from "../DatContainer";
import * as Long from "long"

export default class UInt64Data extends AbstractData{

    Value:Long;
    constructor(type:BaseDataType, reader:BinaryReader, options:Dictionary<string, any>){
        super(type)
        if(!options.containsKey("offset")){
            throw new Error("Wrong parameters for reading Int64Data");
        }

        this.Offset = options.getValue("offset");
        reader.seek(DatContainer.DataSectionOffset + this.Offset)

        this.Value = reader.ReadUInt64();
        this.Length = type.Width;
    }

    GetValueString():number{
        return this.Value.equals(Long.fromString("-72340172838076674", true)) ? Number("-1") : Number(this.Value.toString());
    }
}
