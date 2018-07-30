import FieldInfo from "./FieldInfo";
import List from "./List";

export default class RecordInfo{
    FileName:string
    public Length:number
    readonly Fields:List<FieldInfo>
    HasPointers:boolean

    constructor(fileName:string, length:number=0, fields:List<FieldInfo> = new List<FieldInfo>()){
        this.FileName = fileName;
        this.Length = length;
        this.Fields = fields;
        for(var i=0; i < this.Fields.size(); i++){
         var elem:FieldInfo|undefined = this.Fields.get(i);
         if(elem !== undefined && elem.IsPointer){
             this.HasPointers = true;
         }
        }
        this.HasPointers = this.Fields.toArray().some((elem)=>{ return elem.IsPointer })
    }
}