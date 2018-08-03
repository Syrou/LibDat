import AbstractData from "./AbstractData";
import { BaseDataType } from "../Types/BaseDataType";
import { BinaryReader, BinaryWriter } from "../io";
import Dictionary from '../Dictionary'
import { DatContainer } from "../DatContainer";
import * as Long from "long"

export default class FloatData extends AbstractData{

    Value:number;
    constructor(type:BaseDataType, reader:BinaryReader, options:Dictionary<string, any>){
        super(type)
        if(!options.containsKey("offset")){
            throw new Error("Wrong parameters for reading FloatData");
        }

        this.Offset = options.getValue("offset");
        reader.seek(DatContainer.DataSectionOffset + this.Offset)

        this.Value = reader.ReadFloat();
        this.Length = type.Width;
    }

    GetValueString(){
        return this.Value == -16843010 ? "-1" : String(this.Value);
    }
}
