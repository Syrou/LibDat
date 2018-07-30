import AbstractData  from "./AbstractData";
import { BaseDataType } from "../Types/BaseDataType";
import PointerDataType from "../Types/PointerDataType";
import { BinaryReader } from "../io";
import Dictionary from '../Dictionary'
import { DatContainer } from '../DatContainer'
import TypeFactory from "../Types/TypeFactory";

export default class PointerData extends AbstractData
{
	public RefData: AbstractData;
	public RefType: BaseDataType;

	constructor(dataType:PointerDataType, reader:BinaryReader, options:Dictionary<string, any>) 
	{
		super(dataType);
		var flag: boolean = !options.containsKey("offset");
		if (flag)
		{
			throw new Error("Wrong parameters for reading PointerData");
		}
		this.RefType = dataType.RefType;
		this.Length = this.RefType.PointerWidth;
		this.Offset = options.getValue("offset");

		reader.seek(DatContainer.DataSectionOffset + this.Offset);

		var refParams = this.RefType.ReadPointer(reader);
		this.RefData = TypeFactory.CreateData(this.RefType, reader, refParams);

		DatContainer.DataPointers.setValue(this.Offset, this);
	}

	GetValueString(): string
	{
		return this.RefData.GetValueString();
	}
}