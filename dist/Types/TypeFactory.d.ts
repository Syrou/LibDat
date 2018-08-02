import { BinaryReader } from '../io';
import { BaseDataType } from './BaseDataType';
import AbstractData from '../Data/AbstractData';
import Dictionary from '../Dictionary';
export default class TypeFactory {
    static lastSuccessfullyParsedType: BaseDataType;
    static currentFieldIndex: number;
    static _types: Dictionary<string, BaseDataType>;
    static GetDataSectionOffset(reader: BinaryReader): number;
    static ParseType(fieldType: string): BaseDataType;
    private static ParseValueType;
    static LoadValueTypes(): void;
    private static HasTypeInfo;
    private static GetTypeInfo;
    static CreateData(type: BaseDataType, inStream: BinaryReader, options: Dictionary<string, any>, fieldIndex: number): AbstractData;
}
