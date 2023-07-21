import { Request, Response } from "express";

import { guardarProducto, productoPorId, todosProductos } from "../services/producto.service";
import { matchedData } from "express-validator";
import { ProductosDTO } from "../dtos/productos.dto";
import { handleError } from "../utils/handleHttpError";


const traerProductos = async (req: Request, res: Response) => {
  try {
    const productos = await todosProductos();
    res.status(200).send({ productos })
  } catch (error) {
    console.error('ERROR: ', error)
    handleError(res, 'something went wrong', error, 500)
  }
};

const traerUnProducto = async (req: Request, res: Response) => {
  try {
    const { id } = matchedData(req);
    const producto = await productoPorId(id);
    res.status(200).send({ producto })
  } catch (error) {
    console.error('ERROR: ', error)
    handleError(res, 'something went wrong', error, 500)
  }
};

const crearProductos = async (req: Request, res: Response) => {
  try {
    const producto = <ProductosDTO>matchedData(req);
    const productos = await guardarProducto(producto);
    res.status(201).send({ productos })
  } catch (error) {
    console.error('ERROR: ', error)
    handleError(res, 'something went wrong', error, 500)
  }
};

export { traerProductos, traerUnProducto, crearProductos }
