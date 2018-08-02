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
		var count: number = reader.ReadInt32();
		var offset: number = reader.ReadInt32();
		console.log("COUNT: ", count, " OFFSET: ", offset, "BUFFER POSITION: ", reader.position());
		dictionary.setValue("count", count);
		dictionary.setValue("offset", offset);
		return dictionary;
	}
}
