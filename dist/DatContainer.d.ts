import PointerData from "./Data/PointerData";
import Dictionary from './Dictionary';
import AbstractData from './Data/AbstractData';
import RecordInfo from "./RecordInfo";
import RecordData from "./RecordData";
import { BinaryReader } from "./io";
import List from "./List";
export declare class DatContainer {
    readonly DatName: string;
    readonly Path: string;
    readonly Directory: string;
    Length: number;
    Count: number;
    RecordInfo: RecordInfo;
    static DataSectionOffset: number;
    DataSectionDataLength: number;
    private _originalData;
    Records: List<RecordData>;
    static DataEntries: Dictionary<number, AbstractData>;
    static DataPointers: Dictionary<number, PointerData>;
    constructor(directory: string, filePath: string, x: (instance: DatContainer) => void);
    SaveError(errorString: String): void;
    Read(inStream: BinaryReader): void;
    SaveToJson(): string;
    private constructJson;
    private FindRecordLength;
    GetJsonFormat(): string;
}
