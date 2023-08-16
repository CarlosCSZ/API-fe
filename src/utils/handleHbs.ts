import path from "path";
import hbs from "handlebars";
import fs from "fs";
import { FacturaTemplate } from "../dtos/factura.dto";

const compileHbs = async(data: FacturaTemplate) => {
  const filePath = path.join(__dirname, '../template/factura.hbs');
  const html = fs.readFileSync(filePath, 'utf-8');
  console.log("html dentro de compileHbs: ", html)
  return hbs.compile(html)(data)
}

export { compileHbs }
