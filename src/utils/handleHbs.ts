import path from "path";
import hbs from "handlebars";
import fs from "fs";
import { FacturasDTO } from "../dtos/factura.dto";

const compileHbs = async(data: FacturasDTO) => {
  const filePath = path.join(__dirname, '../template/factura.hbs');
  const html = fs.readFileSync(filePath, 'utf-8');
  return hbs.compile(html)(data)
}

export { compileHbs }
