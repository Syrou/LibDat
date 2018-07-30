import Dictionary from "./Dictionary";
import RecordInfo from "./RecordInfo";
export default class RecordFactory {
    static Records: Dictionary<string, RecordInfo>;
    static initialize(): void;
    static UpdateRecordsInfo(): void;
    private static ProcessRecordDefinition;
    static isNullOrEmpty(s: string | undefined): boolean;
    static HasRecordInfo(fileName: string): boolean;
    static GetRecordInfo(datName: string): RecordInfo | undefined;
    private static GetAttributeValue;
}
