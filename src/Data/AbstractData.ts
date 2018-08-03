import { BaseDataType } from '../Types/BaseDataType';
import { BinaryWriter } from '../io'

  export default class AbstractData {
    Offset: number = 0;
  	Length: number = 0;
  	Type: BaseDataType;
  	constructor(type: BaseDataType) {
  		this.Type = type;
  	}
  	GetValueString(): any {
  		throw new Error("Not implemented");
  	}
}
