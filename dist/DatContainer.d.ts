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
    static CurrentFieldType: string;
    static NestedFieldType: string;
    static CurrentFieldIndex: number;
    Records: List<RecordData>;
    constructor(directory: string, filePath: string, x: (instance: DatContainer) => void);
    SaveError(errorString: String): void;
    Read(inStream: BinaryReader): void;
    SaveToJson(): string;
    private FindRecordLength;
    GetJsonFormat(): string;
}
