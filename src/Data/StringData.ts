import AbstractData from "./AbstractData";
import { BaseDataType } from "../Types/BaseDataType";
import { BinaryReader, BinaryWriter } from "../io";
import Dictionary from '../Dictionary'
import { DatContainer } from "../DatContainer";
import { isNullOrUndefined } from "util";

export default class StringData extends AbstractData{
    
    Value:string;
    constructor(type:BaseDataType, reader:BinaryReader, options:Dictionary<string, any>){
        super(type)
        if(!options.containsKey("offset")){
            throw new Error("Wrong parameters for reading StringData");
        }

        this.Offset = options.getValue("offset");
        //console.log("OFFSET: ", this.Offset);
        reader.seek(DatContainer.DataSectionOffset + this.Offset)

        this.Value = reader.ReadString();
        //console.log("STRING VAL: ", this.Value);
        this.Length = 2 * type.Width + 4;
        //console.log("WIDTH: ", this.Length);
        DatContainer.DataEntries.setValue(this.Offset, this);
    }

    GetValueString(){
        return this.Value.toString();
    }
}