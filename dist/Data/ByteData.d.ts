import AbstractData from "./AbstractData";
import { BaseDataType } from "../Types/BaseDataType";
import { BinaryReader } from "../io";
import Dictionary from '../Dictionary';
export default class ByteData extends AbstractData {
    Value: number;
    constructor(type: BaseDataType, reader: BinaryReader, options: Dictionary<string, any>);
    GetValueString(): string;
}
