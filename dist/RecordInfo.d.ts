import FieldInfo from "./FieldInfo";
import List from "./List";
export default class RecordInfo {
    FileName: string;
    Length: number;
    readonly Fields: List<FieldInfo>;
    HasPointers: boolean;
    constructor(fileName: string, length?: number, fields?: List<FieldInfo>);
}
