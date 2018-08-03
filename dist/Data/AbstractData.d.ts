import { BaseDataType } from '../Types/BaseDataType';
export default class AbstractData {
    Offset: number;
    Length: number;
    Type: BaseDataType;
    constructor(type: BaseDataType);
    GetValueString(): any;
}
