import AbstractData from "./Data/AbstractData";
import { BinaryReader } from "./io";
import FieldInfo from "./FieldInfo";
export default class FieldData {
    Data: AbstractData;
    FieldInfo: FieldInfo;
    constructor(fieldInfo: FieldInfo, reader: BinaryReader, fieldIndex: number);
    GetOffsetPrefix(): string;
}
