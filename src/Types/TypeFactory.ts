import {BinaryReader} from '../io'
import { DatContainer } from '../DatContainer';
import { BaseDataType } from './BaseDataType';
import {Regex, Match} from 'typescript-dotnet-umd/System/Text/RegularExpressions'
import { isNullOrUndefined } from 'util';
import PointerDataType from './PointerDataType';
import { ListDataType } from './ListDataType';
import ListData from '../Data/ListData'
import AbstractData from '../Data/AbstractData';
import Dictionary from '../Dictionary';
import PointerData from '../Data/PointerData';
import ByteData from '../Data/ByteData';
import ShortData from '../Data/ShortData';
import UShortData from '../Data/UShortData';
import FloatData from '../Data/FloatData';
import Int32Data from '../Data/Int32Data';
import Int64Data from '../Data/Int64Data';
import UInt64Data from '../Data/UInt64Data';
import StringData from '../Data/StringData';
import BooleanData from '../Data/BooleanData';

export default class TypeFactory {
    static lastSuccessfullyParsedType:BaseDataType;
    static currentFieldIndex:number;
    static _types: Dictionary<string, BaseDataType>;

   static GetDataSectionOffset(reader:BinaryReader):number{
       return reader.position() - DatContainer.DataSectionOffset;
   }

   public static ParseType(fieldType:string):BaseDataType{
       if(this.HasTypeInfo(fieldType)){
           return this.GetTypeInfo(fieldType)
       }
       let type:BaseDataType;
       let match:Regex|null = new Regex(/(\w+\|)?(.+)/);
       if(match.isMatch(fieldType)){
           var test = match.match(fieldType);
           var matches:Match[] = match.matches(fieldType)
           if(isNullOrUndefined(matches[0].groups[1].value)){
               type = this.ParseValueType(matches[0].groups[2].value)
           }else{
               var pointerString:String = matches[0].groups[1].value;
               var refTypeString = matches[0].groups[2].value;
               if(pointerString === "ref|"){ //Pointer
                var refType:BaseDataType = this.ParseType(refTypeString)
                type = new PointerDataType(fieldType, refType.PointerWidth, 4, refType);
               } else if(pointerString === "list|"){
                   var listType = this.ParseType(refTypeString);
                   type = new ListDataType(fieldType, -1, 8, listType);
               }else{
                   throw new Error("Unknown complex type name: " + pointerString);
               }

           }
       }else{
           throw new Error("String is not a valid type definition ${fieldType}")
       }

       match = null

       if(type !== null || type !== undefined){
        this._types.setValue(fieldType, type)
       }
       this.lastSuccessfullyParsedType = type;
       return type;
   }

   private static ParseValueType(fieldType:string):BaseDataType{
       var match:Regex|null = new Regex("^(\w+)$");
       if(match.isMatch(fieldType)){
          return this.GetTypeInfo(match.matches(fieldType)[0].value)
       }
       match = null
       throw new Error("Not a valid value type definitation ${fieldType}");
   }

   public static LoadValueTypes(){
       this._types = new Dictionary<string, BaseDataType>()
       this._types.setValue("bool", new BaseDataType("bool", 1, 4));
       this._types.setValue("byte", new BaseDataType("byte", 1, 4));
       this._types.setValue("short", new BaseDataType("short", 2, 4));
       this._types.setValue("int", new BaseDataType("int", 4, 4));
       this._types.setValue("float", new BaseDataType("float", 4, 4));
       this._types.setValue("uint", new BaseDataType("uint", 4, 4));
       this._types.setValue("long", new BaseDataType("long", 8, 4));
       this._types.setValue("ulong", new BaseDataType("ulong", 8, 4));
       this._types.setValue("string", new BaseDataType("string", -1, 4));
   }

   private static HasTypeInfo(type:string){
       return this._types.containsKey(type);
   }

   private static GetTypeInfo(type:string):BaseDataType{
       if(!this.HasTypeInfo(type)){
           throw new Error(`Unknown data type: ${type}`);
       }
       var result:BaseDataType|undefined = this._types.getValue(type);
       if(!isNullOrUndefined(result)){
           return result
       }
       throw new Error(`Could not find value for type: ${type}`)
   }

   public static CreateData(type:BaseDataType, inStream:BinaryReader, options:Dictionary<string, any>, fieldIndex:number):AbstractData{
        DatContainer.CurrentFieldType = type.Name;
        if(fieldIndex){
          DatContainer.CurrentFieldIndex = fieldIndex;
          this.currentFieldIndex = fieldIndex;
        }
        var optionsOffset:number = options.getValue("offset");
        if((inStream.position() - optionsOffset) + optionsOffset > inStream.buffer.capacity()){
          var error = `Trying to read outside record length, this usually indicates records being assigned to wrong type!\nType was: ${this.lastSuccessfullyParsedType.Name} found at field entry number: ${this.currentFieldIndex}`;
          throw new Error(error);
        }

        if(type instanceof ListDataType){
          DatContainer.NestedFieldType = "list|";
            return new ListData(type, inStream, options)
        }

        if(type instanceof PointerDataType){
          DatContainer.NestedFieldType = "ref|";
            return new PointerData(type, inStream, options);
        }

        var data:AbstractData;
        switch(type.Name){
            case "bool":{
                data = new BooleanData(type, inStream, options)
                break;
            }
            case "byte":{
                data = new ByteData(type,inStream, options);
                break;
            }
            case "short":{
                data = new ShortData(type,inStream, options);
                break;
            }
            case "float":{
               data = new FloatData(type, inStream, options);
               break;
            }
            case "int":{
                data = new Int32Data(type,inStream, options);
                break;
            }
            case "uint":{
                data = new UShortData(type,inStream, options);
                break;
            }
            case "long":{
                data = new Int64Data(type,inStream, options);
                break;
            }
            case "ulong":{
                data = new UInt64Data(type,inStream, options);
                break;
            }
            case "string":{
                data = new StringData(type,inStream, options);
                break;
            }
            default:{
                var error = `Unknown value type name: ${type.Name}`;
                throw new Error(error);
            }
        }
        DatContainer.NestedFieldType = "";
        return data;
   }
}
