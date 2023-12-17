import DataURIParser from "datauri/parser.js";
import path from "path";

const getDatauri = (file) => {
    const parser = new DataURIParser();
    console.log("this is og "+file.originalname)
    const extName =  path.extname(file.originalname).toString(); //typeof(path)
    
    console.log (extName);
    return parser.format(extName, file.buffer)
    
}
export default getDatauri;