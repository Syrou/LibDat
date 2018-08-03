import AbstractData  from "./AbstractData";
import { BaseDataType } from "../Types/BaseDataType";
import PointerDataType from "../Types/PointerDataType";
import { BinaryReader } from "../io";
import Dictionary from '../Dictionary'
import { DatContainer } from '../DatContainer'
import TypeFactory from "../Types/TypeFactory";

export default class PointerData extends AbstractData
{
	public RefData: AbstractData|undefined = undefined;
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
		this.Offset = options.getValue("offset") as number;
		reader.seek(DatContainer.DataSectionOffset + this.Offset);
		var refParams = this.RefType.ReadPointer(reader);
		var readPointerOffset:number = refParams.getValue("offset")
		if(readPointerOffset >= 8 && reader.position() + readPointerOffset <= reader.buffer.capacity()){
				this.RefData = TypeFactory.CreateData(this.RefType, reader, refParams, 1);
		}else{
			console.error("Trying to read outside data section, usually an indicator that the specificed type is not a ref| type");
		}
	}

	GetValueString(): string
	{
		var result:string = this.RefData ? this.RefData.GetValueString() : "";
		return result;
	}
}
