import { BaseDataType } from './BaseDataType';
import { BinaryReader } from '../io';
import Dictionary from '../Dictionary';

export class ListDataType extends BaseDataType
{
	public ListType: BaseDataType;
	constructor(name: string, width: number, pointerWidth: number, listType: BaseDataType)
	{
		super(name, width, pointerWidth);
		this.ListType = listType;
	}
	ReadPointer(reader: BinaryReader): Dictionary<string, any>
	{
		var dictionary: Dictionary<string, any> = new Dictionary<string, any>();
		var num: number = reader.ReadInt32();
		var num2: number = reader.ReadInt32();
		dictionary.setValue("count", num);
		dictionary.setValue("offset", num2);
		return dictionary;
	}
}
