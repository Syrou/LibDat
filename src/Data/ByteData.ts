import AbstractData from "./AbstractData";
import { BaseDataType } from "../Types/BaseDataType";
import { BinaryReader, BinaryWriter } from "../io";
import Dictionary from '../Dictionary'
import { DatContainer } from "../DatContainer";

export default class ByteData extends AbstractData{
    
    Value:number;
    constructor(type:BaseDataType, reader:BinaryReader, options:Dictionary<string, any>){
        super(type)
        if(!options.containsKey("offset")){
            throw new Error("Wrong parameters for reading ByteData");
        }

        this.Offset = options.getValue("offset");
        reader.seek(DatContainer.DataSectionOffset + this.Offset)

        this.Value = reader.ReadByte();
        this.Length = type.Width;
    }

    GetValueString(){
        return this.Value.toString();
    }
}