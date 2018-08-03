import { DatContainer} from './src/DatContainer'
import * as path from 'path';
var testPath = path.join(process.cwd(), "assets", `/test`);
let datContainer = new DatContainer(testPath,"Words.dat", (instance:DatContainer)=>{
  instance.SaveToJson();
});
