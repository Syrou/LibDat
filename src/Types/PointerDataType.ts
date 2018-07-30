import { BaseDataType } from './BaseDataType';

export default class PointerDataType extends BaseDataType
{
	public RefType: BaseDataType;
	constructor(name: string, width: number, pointerWidth: number, refType: BaseDataType)
	{
		super(name, width, pointerWidth);
		this.RefType = refType;
	}
}
