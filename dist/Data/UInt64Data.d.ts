import AbstractData from "./AbstractData";
import { BaseDataType } from "../Types/BaseDataType";
import { BinaryReader } from "../io";
import Dictionary from '../Dictionary';
import * as Long from "long";
export default class UInt64Data extends AbstractData {
    Value: Long;
    constructor(type: BaseDataType, reader: BinaryReader, options: Dictionary<string, any>);
    GetValueString(): string;
}
