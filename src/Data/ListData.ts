import AbstractData from './AbstractData';
import { ListDataType } from '../Types/ListDataType';
import { BinaryReader, BinaryWriter } from '../io';
import { BaseDataType } from '../Types/BaseDataType';
import { DatContainer } from '../DatContainer'
import TypeFactory from '../Types/TypeFactory'
import Dictionary from '../Dictionary'
import List from '../List';

export default class ListData extends AbstractData
{
	Count: number = 0;
	List: List<AbstractData>;
	ListType: BaseDataType;
	constructor(type: ListDataType, reader: BinaryReader, options: Dictionary<string, any>)
	{
		super(type);
		var flag: boolean = !options.containsKey("count") || !options.containsKey("offset");
		if (flag)
		{
			throw new Error("Wrong parameters for reading ListData");
		}
		this.ListType = type.ListType;
		this.Offset = options.getValue("offset");
		reader.seek(DatContainer.DataSectionOffset + this.Offset);
		this.Count = options.getValue("count");
		this.List = new List<AbstractData>();
		this.Length = this.ListType.Width * this.Count;
		var flag2: boolean = this.Count === 0;
		if (!flag2)
		{
			var currentOffset: number = TypeFactory.GetDataSectionOffset(reader);
			for (var i: number = 0; i < this.Count; i++)
			{
				var listEntryOffset: number = currentOffset + i * this.ListType.Width;
				var dictionary: Dictionary<string, any> = new Dictionary<string, any>();
				dictionary.setValue("offset", listEntryOffset);
				var item: AbstractData = TypeFactory.CreateData(this.ListType, reader, dictionary, i);
				this.List.add(item);
			}
			DatContainer.DataEntries.setValue(this.Offset, this);
			this.List.clear();
		}
	}
	WritePointer(writer: BinaryWriter): void
	{
		writer.WriteByte(this.Count);
		writer.WriteByte(this.Offset);
	}
	GetValueString(): string
	{
		var list:string = this.List.toArray().filter(function(x) { return x.GetValueString(); }).join()
		var contents = `[${list}]`
		return contents
	}
}
