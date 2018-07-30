import RecordInfo from "./RecordInfo";
import FieldData from "./FieldData";
import { BinaryReader } from "./io";
import List from "./List";
export default class RecordData {
    RecordInfo: RecordInfo;
    Index: number;
    readonly FieldsData: List<FieldData>;
    constructor(recordInfo: RecordInfo, inStream: BinaryReader, index: number);
}
