import { Productos } from "../models/productos.model";

interface ProductosDTO extends Productos {};

interface CrearProductoDTO extends Omit<ProductosDTO, 'id'> {};


export { ProductosDTO, CrearProductoDTO };
