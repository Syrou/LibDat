import { BaseDataType } from './BaseDataType';
import { BinaryReader } from '../io';
import Dictionary from '../Dictionary';
import { DatContainer } from '../DatContainer';

export class ListDataType extends BaseDataType
{
	name:string;
	public ListType: BaseDataType;
	constructor(name: string, width: number, pointerWidth: number, listType: BaseDataType)
	{
		super(name, width, pointerWidth);
		this.name = name;
		this.ListType = listType;
	}
	ReadPointer(reader: BinaryReader): Dictionary<string, any>
	{
		var dictionary: Dictionary<string, any> = new Dictionary<string, any>();
		var count: number = reader.ReadInt32();
		var offset: number = reader.ReadInt32();
		console.log("NAME: ", this.name, " COUNT: ", count, " OFFSET: ", offset, " BUFFER POSITION: ", reader.position());
		dictionary.setValue("count", count);
		dictionary.setValue("offset", offset);
		return dictionary;
	}
}
