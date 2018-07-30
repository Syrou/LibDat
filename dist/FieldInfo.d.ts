import { BaseDataType } from "./Types/BaseDataType";
export default class FieldInfo {
    Index: number;
    RecordOffset: number;
    Id: string;
    Description: string;
    IsUser: boolean;
    FieldType: BaseDataType;
    IsPointer: boolean;
    constructor(type: BaseDataType, index: number, recordOffset: number, id: string, description: string, isUser?: boolean);
    GetFullName(delimiter: string): string;
}
