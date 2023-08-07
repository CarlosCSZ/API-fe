import { Facturas } from "../models/facturas.model";
import { ClientesDTO } from "./clientes.dto";
import { FacturaProductoDTO } from "./facturaProductos.dto";
import { ProductosDTO } from "./productos.dto";

interface FacturasDTO extends Facturas {
  cliente: ClientesDTO;
  productos: FacturaProductoDTO[];
};

interface CrearFacturaDTO extends Omit<Facturas, 'id' | 'total'> {
  productos: number[];
};

interface FacturaTemplate {
  nombre: string;
  cedula: string;
  celular: string;
  direccion: string;
  total: number;
  productos: ProductosDTO[];
}

export { FacturasDTO, CrearFacturaDTO, FacturaTemplate };
