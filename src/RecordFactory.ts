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
        var definitionPath = path.join(__dirname, "./DatDefinitions.xml")
        var data = fs.readFileSync(definitionPath);

        var results:XmlDocument|null = new XmlDocument(data.toString());
        var records = results.childNamed("records");
        var nodes = records.childrenNamed("record");

        if(isNullOrUndefined(nodes)){
            throw new Error("Did not find any record definitions in xml file");
        }
        nodes.forEach(element => {
            this.ProcessRecordDefinition(element);
        });
        results = null
    }

    private static ProcessRecordDefinition(element:XmlElement){
        var file = this.GetAttributeValue(element, "file");
        if(isNullOrUndefined(file)){
            var error = `Invalid XML: record has wrong attribute 'id': ${element}`
            throw new Error(error);
        }
        //var lengthString = this.GetAttributeValue(element, "length");
        /*if(isNullOrUndefined(lengthString)){
            var error = `Invalid XML: record has wrong attribute 'length': ${element}`
            throw new Error(error);
        }
        var length:number = Number(lengthString)
        if(length === 0){
            this.Records.setValue(file, new RecordInfo(file));
            return;
        }*/

        var fields = new List<FieldInfo>();
        var index = 0;
        var totalLength = 0;

        element.children.forEach(field => {
            if(field.name === "field"){
                var fieldName = field.name
                if(fieldName !== "field"){
                    throw new Error(`Invalid XML: <record> contain wrong element number: ${fieldName}`)
                }
                var fieldId = this.GetAttributeValue(field, "id");
                if(isNullOrUndefined(fieldId)){
                    throw new Error(`Invalid XML: field has wrong attribute 'id': ${fieldName}`)
                }

                var fieldType = this.GetAttributeValue(field, "type");
                if(isNullOrUndefined(fieldType)){
                    throw new Error(`Invalid XML: couldn't find type for field: ${fieldName}`)
                }

                var dataType = TypeFactory.ParseType(fieldType);

                var fieldDescription = this.GetAttributeValue(field, "description");

                var isUserString:string|undefined = this.GetAttributeValue(field, "isUser");
                var isUser = this.isNullOrEmpty(isUserString);

                fields.add(new FieldInfo(dataType, index, totalLength, fieldId, fieldDescription!, isUser))
                index++
                totalLength += dataType.Width;
            }
        });

        //Checking if the length of the fields matches the xml length, seems foobar, the length is set arbitrary by
        //manual user edit, it really does nothing.
        /*if(totalLength != length){
            var error = `Total length of fields: ${totalLength} not equal to record length ${length} for file: ${file}`;
            var errorFields = ""
            fields.toArray().forEach(field => {
                var errorField = `${field.FieldType.Name} = ${field.FieldType.Width}`;
                errorFields += errorField;
                console.log(errorField);
            });
            var errorText = error + errorFields + "\n";
            var errorPath = path.join(process.cwd(), "assets/error", `${file}.json`);
            fs.writeFile(errorPath, errorText, { flag: 'w' }, function (err) {
              if (err) throw err;
              console.log(`Error details saved for file: ${file}`);
            });
            //throw new Error(error);
        }*/
        //this.Records.setValue(file, new RecordInfo(file, length, fields));
        this.Records.setValue(file, new RecordInfo(file, totalLength, fields));
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

    private static GetAttributeValue(element:XmlElement, attributeName:string):string|undefined{

        if(isNullOrUndefined(element)){
            throw new Error("Can not get attribute from an empty element");
        }
        var attributes:XmlAttributes = element.attr
        if(isNullOrUndefined(attributes)){
            return "";
        }
        var attribute = attributes[attributeName];
        return isNullOrUndefined(attribute) ? undefined : attribute;
    }
}
