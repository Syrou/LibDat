import RecordInfo from "./RecordInfo";
import FieldData from "./FieldData";
import { BinaryReader } from "./io";
import List from "./List";

export default class RecordData{
    RecordInfo:RecordInfo
    Index:number
    readonly FieldsData:List<FieldData>

    constructor(recordInfo:RecordInfo, inStream:BinaryReader, index:number){
        this.RecordInfo = recordInfo;
        this.Index = index;
        this.FieldsData = new List<FieldData>();
        inStream.seek(4 + recordInfo.Length * index)
        let startOffset:number = inStream.position();
        this.RecordInfo.Fields.toArray().forEach((element, fieldIndex) => {
            var elementOffset:number = (startOffset + element.RecordOffset);
            inStream.seek(elementOffset);
            //try {
              var fieldData:FieldData|null = new FieldData(element, inStream, fieldIndex);
              this.FieldsData.add(fieldData);
              fieldData = null;
            //} catch (e) {
              //throw Error(" current fieldIndex: "+ fieldIndex + " " + e);
            //}
        });
    }
}
