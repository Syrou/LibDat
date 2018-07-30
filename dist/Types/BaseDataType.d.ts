import { BinaryReader } from '../io';
import Dictionary from '../Dictionary';
export declare class BaseDataType {
    Name: string;
    Width: number;
    PointerWidth: number;
    constructor(name: string, width: number, pointerWidth: number);
    ReadPointer(reader: BinaryReader): Dictionary<string, any>;
}
