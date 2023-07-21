import { Facturas } from "../models/facturas.model";
import { ClientesDTO } from "./clientes.dto";
import { ProductosDTO } from "./productos.dto";

interface FacturasDTO extends Facturas {
  cliente: ClientesDTO;
  productos: ProductosDTO[];
};

interface CrearFacturaDTO extends Omit<Facturas, 'id' | 'total'> {
  productos: number[];
};


export { FacturasDTO, CrearFacturaDTO };
