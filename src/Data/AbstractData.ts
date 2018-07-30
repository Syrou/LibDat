import { BaseDataType } from '../Types/BaseDataType';
import { BinaryWriter } from '../io'

  export default class AbstractData {
    Offset: number = 0;
  	Length: number = 0;
  	Type: BaseDataType;
  	constructor(type: BaseDataType) {
  		this.Type = type;
  	}
  	WritePointer(writer: BinaryWriter): void {
  		writer.WriteByte(this.Offset);
  	}
  	WritePointerOffset(writer: BinaryWriter, NewOffset: number): void {
  		this.Offset = NewOffset;
  		writer.WriteByte(this.Offset);
  	}
  	GetValueString(): string {
  		throw new Error("Not implemented");
  	}
}
