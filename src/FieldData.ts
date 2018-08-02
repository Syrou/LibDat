import AbstractData from "./Data/AbstractData";
import { BinaryReader } from "./io";
import FieldInfo from "./FieldInfo";
import TypeFactory from "./Types/TypeFactory";
import Dictionary from './Dictionary'
import PointerData from "./Data/PointerData";
import { isNullOrUndefined } from "util";
import ListData from "./Data/ListData";
import { BaseDataType } from "./Types/BaseDataType";

export default class FieldData{
    Data:AbstractData
    FieldInfo:FieldInfo
    constructor(fieldInfo:FieldInfo, reader:BinaryReader, fieldIndex:Number){
        this.FieldInfo = fieldInfo;
        var offset:number = TypeFactory.GetDataSectionOffset(reader);
        var dictionary = new Dictionary<string, any>();
        dictionary.setValue("offset", offset);
        this.Data = TypeFactory.CreateData(fieldInfo.FieldType, reader, dictionary, fieldIndex);
    }

    GetOffsetPrefix():string{
        if(!this.FieldInfo.IsPointer){
            return "";
        }

        var pData = this.Data as PointerData
        if(isNullOrUndefined(pData)){
            throw new Error("FieldData of pointer type doesn't have data of PointerData class");
        }
        if(this.FieldInfo.FieldType.Width != 8){
            return `${pData.RefData.Offset}`
        }
        var lData = pData.RefData as ListData;
        if(isNullOrUndefined(lData)){
            throw new Error("Didn't find ListData data at offset of FieldData of pointer to list type");
        }
        return `[${lData.Count}]${pData.RefData.Offset}`;
    }
}
