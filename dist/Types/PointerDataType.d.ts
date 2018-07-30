import { BaseDataType } from './BaseDataType';
export default class PointerDataType extends BaseDataType {
    RefType: BaseDataType;
    constructor(name: string, width: number, pointerWidth: number, refType: BaseDataType);
}
