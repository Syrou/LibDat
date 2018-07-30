import AbstractData from "./AbstractData";
import { BaseDataType } from "../Types/BaseDataType";
import PointerDataType from "../Types/PointerDataType";
import { BinaryReader } from "../io";
import Dictionary from '../Dictionary';
export default class PointerData extends AbstractData {
    RefData: AbstractData;
    RefType: BaseDataType;
    constructor(dataType: PointerDataType, reader: BinaryReader, options: Dictionary<string, any>);
    GetValueString(): string;
}
