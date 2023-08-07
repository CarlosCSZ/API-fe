import { FacturasProductos } from "../models/facturaProductos.model";
import { ProductosDTO } from "./productos.dto";

interface FacturaProductoDTO extends FacturasProductos {
  producto: ProductosDTO;
}

export { FacturaProductoDTO }
