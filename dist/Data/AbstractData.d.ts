import { BaseDataType } from '../Types/BaseDataType';
import { BinaryWriter } from '../io';
export default class AbstractData {
    Offset: number;
    Length: number;
    Type: BaseDataType;
    constructor(type: BaseDataType);
    WritePointer(writer: BinaryWriter): void;
    WritePointerOffset(writer: BinaryWriter, NewOffset: number): void;
    GetValueString(): string;
}
