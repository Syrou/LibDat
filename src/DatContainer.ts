import PointerData from "./Data/PointerData";
import Dictionary from './Dictionary'
import AbstractData from './Data/AbstractData';
import RecordInfo from "./RecordInfo";
import RecordData from "./RecordData";
import { Stream } from "stream";
import * as path from 'path';
import * as fs from 'fs';
import RecordFactory from "./RecordFactory2";
import { isNullOrUndefined } from "util";
import { BinaryReader } from "./io";
import { FILE } from "dns";
import Char from "typescript-char";
import FieldData from "./FieldData";
import List from "./List";
import * as ByteBuffer from "bytebuffer"
import * as Long from "long"
import * as csv from 'csvtojson'
import * as _ from 'lodash'
import * as mkdirp from 'mkdirp'

export class DatContainer {
	readonly DatName!:string
  readonly Path!:string
	readonly Directory!:string
	Length!: number;
	Count!: number;
	RecordInfo!:RecordInfo
	static DataSectionOffset:number = 0;
	DataSectionDataLength:number = 0;
	private _originalData!: ByteBuffer;
	Records!: List<RecordData>;
	static DataEntries: Dictionary<number, AbstractData>
	static DataPointers: Dictionary<number, PointerData>

	constructor(directory:string,filePath:string, x: (instance:DatContainer) => void){
			if(filePath !== undefined && filePath.length > 0){
				this.Directory = directory;
				this.DatName = path.basename(filePath, ".dat")
        this.Path = directory
				RecordFactory.initialize();
        try {
				      var recordGuard = RecordFactory.GetRecordInfo(this.DatName);
      				if(isNullOrUndefined(recordGuard)){
								var errorString = `Could not find records for file: ${this.DatName}`;
								this.SaveError(errorString);
      					throw new Error(errorString)
      				}
      				this.RecordInfo = recordGuard;
      				DatContainer.DataEntries = new Dictionary<number, AbstractData>();
      				DatContainer.DataPointers = new Dictionary<number, PointerData>();
              var fileToRead = `${directory}/${filePath}`
      				var fileBytes = fs.readFile(fileToRead, (err,data)=>{
      					var br = new BinaryReader(data, true)
      					this.Read(br);
      					x(this);
      				});
        } catch(e) {
          console.log(e)
        }
	     }
  }

	SaveError(errorString:String){
		var pathToCreate = path.join(this.Directory,"error");
		mkdirp.sync(pathToCreate)
		var workingFile = this.DatName;
		var errorPath = path.join(this.Directory, "error", `${workingFile}.txt`);
		fs.writeFile(errorPath, errorString, { flag: 'w' }, function (err) {
			if (err) throw err;
			console.log(`Error details saved for file: ${workingFile}`);
		});
	}

	Read(inStream:BinaryReader){
    try {
  		this.Length = inStream.buffer.capacity();
  		DatContainer.DataSectionOffset = 0;
  		if(isNullOrUndefined(this.RecordInfo)){
				var errorString = `Missing dat parser for file: ${this.DatName}`;
				this.SaveError(errorString);
  			throw new Error(errorString)
  		}
  		this.Count = inStream.ReadInt32();

  		//find record length
  		var actualRecordLength = this.FindRecordLength(inStream, this.Count)
  		var errorString = `Actual record length = ${actualRecordLength} not equal length by the sum of each record in the xml specification: ${this.RecordInfo.Length}`
  		if(actualRecordLength != this.RecordInfo.Length){
				this.SaveError(errorString);
  			throw new Error(errorString);
  		}
  		DatContainer.DataSectionOffset = this.Count * actualRecordLength + 4;
  		this.DataSectionDataLength = this.Length - DatContainer.DataSectionOffset - 8;
  		inStream.seek(DatContainer.DataSectionOffset);
  		var pattern = Long.fromNumber(0xBBbbBBbbBBbbBBbb, true);
  		if(inStream.ReadUInt64().toNumber() !== pattern.toNumber()){
  			throw new Error("Missing magic number after records");
  		}

  		inStream.seek(0);
  		this._originalData = inStream.ReadBytes(this.Length);

  		//read records
  		if(actualRecordLength === 0){
  			this.Records = new List<RecordData>();
  			return;
  		}

  		this.Records = new List<RecordData>();
  		for(var i=0; i < this.Count; i++){
  			//console.log("Processing record index:", i, " out of:", this.Count);
  			var recordData:RecordData|null = new RecordData(this.RecordInfo, inStream, i);
  			this.Records.add(recordData);
  			recordData = null
  		}
    } catch(e){
      console.log(e);
    }

	}

	public SaveToCsv(){
		console.log("Converting Records to CSV...");
		fs.writeFile(`./${this.DatName}.csv`, this.GetCsvFormat(), function(err) {
			if(err) {
				return console.log(err);
			}
			//console.log("The file was saved!");
		});
	}

	public SaveToJson():string{
		console.log(`Converting Records for file: ${this.DatName} to JSON...`);
		var pathToCreate = path.join(this.Path,"json");
		mkdirp.sync(pathToCreate)
		var jsonPath = `${this.Path}/json/${this.DatName}.json`;
		var jsonToWrite = this.GetJsonFormat();
		fs.writeFile(jsonPath, jsonToWrite, function(err) {
			if(err) {
				return console.log(err);
			}
			//console.log("The file was saved!");
		});
		return `/json/${this.DatName}.json`;
	}

	private constructJson(csv:string):any{
		const content = csv.split('\r\n');
		const header = content[0].split(',');
		return _.tail(content).map((row) => {
			return _.zipObject(header, row.split(','));
		});
	}

	private FindRecordLength(inStream:BinaryReader, numberOfEntries:number):number{
		if(numberOfEntries === 0){
			return 0;
		}

    if(isNullOrUndefined(inStream)){
      return 0;
    }

		inStream.seek(4);
		var stringLength = inStream.buffer.capacity();
		var recordLength = 0;
		for(var i=0; inStream.position() <= stringLength -8;i++){
			var ul:Long = inStream.ReadUInt64();
			var pattern = Long.fromNumber(0xBBbbBBbbBBbbBBbb, true);
			if(ul.toNumber() === pattern.toNumber()){
				recordLength = i;
				break;
			}
			inStream.seek(inStream.position()-8 + numberOfEntries);
		}
		return recordLength;
	}

	public GetJsonFormat():string{
		var jsonArray:any = [];
		var result:string = "";
		var json:any = {};
		if(this.Records && this.RecordInfo) {
  		this.Records.toArray().forEach(recordData => {
				json = {};
				json["Row"] = this.Records.indexOf(recordData);
				recordData.FieldsData.toArray().forEach(fieldData => {
					json[fieldData.FieldInfo.Id] = fieldData.Data.GetValueString();
				});
				jsonArray.push(json);
			});
		}
		return JSON.stringify(jsonArray, null, "\t");
	}

	public GetCsvFormat():string{
		const separator:string = ","
		var csv:string ="";
    if(this.Records && this.RecordInfo) {
  		var fieldInfos = this.RecordInfo.Fields;

  		if(this.RecordInfo.Length === 0){
  			var line = `Count: ${this.Count}`;
  			csv = csv.concat(line);
  			return csv;
  		}
  		//add header
  		var line = `Rows${separator}`;
  		csv = csv.concat(line);
  		fieldInfos.toArray().forEach(field => {
  			var line = `${field.Id}${separator}`;
  			csv = csv.concat(line);
  		});
  		//Remove last comma
  		csv = csv.replace(/,\s*$/, "");
  		csv = csv.concat("\r\n");
  		this.Records.toArray().forEach(recordData => {
  			//Add index
				//console.log("RECORD DATA:", recordData);
  			var line = `${this.Records.indexOf(recordData)}${separator}`;
  			csv = csv.concat(line);
				//recordData.RecordInfo.Fields.toArray().forEach(test => {
				//	console.log("RECORD INFO FIELD: ", test);
				//})
  			//Add fields
  			recordData.FieldsData.toArray().forEach(fieldData => {
  				var line = `${this.getCsvString(fieldData)}${separator}`;
					//console.log("FIELD DATA: ", fieldData);
  				csv = csv.concat(line);
  			});
  			csv = csv.replace(/,\s*$/, "");
  			csv = csv.concat("\r\n");

  		});
  		csv = csv.replace(/,\s*$/, "");
  		csv = csv.concat("\r\n");
    }
		return csv;
	}

	getCsvString(fieldData:FieldData){
		var str = fieldData.Data.GetValueString();
		var match = new RegExp(/(?:\r|\n|,)/gm)
		if(match.test(str)){
			var replacement = str.replace("\"", "\"\"");
			str = `\"${replacement}\"`
		}
		return str;
	}
}
