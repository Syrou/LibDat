import { BaseDataType } from './BaseDataType';
import { BinaryReader } from '../io';
import Dictionary from '../Dictionary';
export declare class ListDataType extends BaseDataType {
    name: string;
    ListType: BaseDataType;
    constructor(name: string, width: number, pointerWidth: number, listType: BaseDataType);
    ReadPointer(reader: BinaryReader): Dictionary<string, any>;
}
