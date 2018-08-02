import Dictionary from "./Dictionary";
import RecordInfo from "./RecordInfo";
import TypeFactory from "./Types/TypeFactory";
import { XmlDocument, XmlElement, XmlAttributes } from "xmldoc";
import * as fs from 'fs';
import * as path from 'path';
import { isNullOrUndefined, isUndefined } from "util";
import FieldInfo from "./FieldInfo";
import List from "./List";

export default class RecordFactory {
    static Records: Dictionary<string, RecordInfo> = new Dictionary<string, RecordInfo>()

    static initialize(){
        this.UpdateRecordsInfo();
    }

    public static UpdateRecordsInfo(){
        this.Records = new Dictionary<string, RecordInfo>();
        TypeFactory.LoadValueTypes();
        var definitionPath = path.join(__dirname, "./DatDefinitions.json")
        var data:any = fs.readFileSync(definitionPath);
        var dataAsJson:any = JSON.parse(data);
        var records = dataAsJson.definitions.records;
        if(records === null){
            throw new Error("Did not find any record definitions in json file");
        }

        records.forEach((element:any) => {
            this.ProcessRecordDefinition(element);
        });
        dataAsJson = null;
    }

    private static ProcessRecordDefinition(object:any){
        var file = object.file
        if(isNullOrUndefined(file)){
            var error = `Invalid Record: record has no file: ${object}`
            throw new Error(error);
        }
        var fields = new List<FieldInfo>();
        var index = 0;
        var totalLength = 0;
        if(object.fields && object.fields.length > 0){
          object.fields.forEach((field:any, iteration:number) => {
                  var fieldId = field.id;
                  if(isNullOrUndefined(fieldId)){
                      throw new Error(`Invalid Json: field with index ${iteration} has no 'id'`);
                  }

                  var fieldType = field.type;
                  if(isNullOrUndefined(fieldType)){
                      throw new Error(`Invalid Json: field with index ${iteration} has no 'type'`);
                  }

                  var dataType = TypeFactory.ParseType(fieldType);

                  var fieldDescription = field.description

                  var isUserString:string|undefined = field.isUser;
                  var isUser = this.isNullOrEmpty(isUserString);

                  fields.add(new FieldInfo(dataType, index, totalLength, fieldId, fieldDescription!, isUser))
                  index++
                  totalLength += dataType.Width;
          });
      }
      this.Records.setValue(file, new RecordInfo(file, totalLength, fields));
      object = null;
    }

    static isNullOrEmpty(s: string|undefined): boolean {
        if(isUndefined(s)){
            return true;
        }
        return !s;
    }

    public static HasRecordInfo(fileName:string){
        fileName = path.basename(fileName, '.dat');
        return this.Records.containsKey(fileName);
    }

    public static GetRecordInfo(datName:string){
        if(!this.Records.containsKey(datName)){
            //throw new Error("Not defined parser for filename: "+datName);
        }
        return this.Records.getValue(datName);
    }
}
