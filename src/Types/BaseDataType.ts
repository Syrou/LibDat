import { BinaryReader } from '../io'
import Dictionary from '../Dictionary'

export class BaseDataType
{
	public Name: string;
	public Width: number;
	public PointerWidth: number;
	constructor(name: string, width: number, pointerWidth: number){
		this.Name = name;
		this.Width = width;
		this.PointerWidth = pointerWidth;
	}

	ReadPointer(reader: BinaryReader): Dictionary<string, any>
	{
		var dictionary: Dictionary<string, any> = new Dictionary<string, any>();
		var offset: number = reader.ReadInt32();
		dictionary.setValue("offset", offset);
		console.log("OFFSET: ", offset, "BUFFER POSITION: ", reader.position());
		return dictionary;
	}
}
