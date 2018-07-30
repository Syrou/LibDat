import AbstractData from "./AbstractData";
import { BaseDataType } from "../Types/BaseDataType";
import { BinaryReader, BinaryWriter } from "../io";
import Dictionary from '../Dictionary'
import { DatContainer } from "../DatContainer";

export default class Int32Data extends AbstractData{
    
    Value:number;
    constructor(type:BaseDataType, reader:BinaryReader, options:Dictionary<string, any>){
        super(type)
        if(!options.containsKey("offset")){
            throw new Error("Wrong parameters for reading Int32Data");
        }

        this.Offset = options.getValue("offset");
        reader.seek(DatContainer.DataSectionOffset + this.Offset)

        this.Value = reader.ReadInt32();
        this.Length = type.Width;
    }

    GetValueString(){
        return this.Value == -16843010 ? "-1" : this.Value.toString();
    }
}