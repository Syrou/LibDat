import AbstractData from './AbstractData';
import { ListDataType } from '../Types/ListDataType';
import { BinaryReader, BinaryWriter } from '../io';
import { BaseDataType } from '../Types/BaseDataType';
import Dictionary from '../Dictionary';
import List from '../List';
export default class ListData extends AbstractData {
    Count: number;
    List: List<AbstractData>;
    ListType: BaseDataType;
    constructor(type: ListDataType, reader: BinaryReader, options: Dictionary<string, any>);
    WritePointer(writer: BinaryWriter): void;
    GetValueString(): string;
}
