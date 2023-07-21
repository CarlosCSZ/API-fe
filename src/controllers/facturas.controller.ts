import { Request, Response } from "express";
import { matchedData } from "express-validator";

import {
  clientePorFactura,
  facturaPorId,
  guardarFactura,
  productosPorFactura,
  todosFacturas,
} from "../services/facturas.service";
import { CrearFacturaDTO } from "../dtos/factura.dto";

const traerFacturas = async (req: Request, res: Response) => {
  try {
    const facturas = await todosFacturas();
    res.status(200).send({ facturas });
  } catch (error) {
    console.error("ERROR: ", error);
    //manejador de errores
  }
};

const traerUnaFactura = async (req: Request, res: Response) => {
  try {
    const { id } = matchedData(req);
    const facturas = await facturaPorId(id);
    res.status(200).send({ facturas });
  } catch (error) {
    console.error("ERROR: ", error);
    //manejador de errores
  }
};

const traerClientePorFactura = async (req: Request, res: Response) => {
  try {
    const { id } = matchedData(req);
    const cliente = await clientePorFactura(id);
    res.status(200).send({ cliente });
  } catch (error) {
    console.error("ERROR: ", error);
    //manejador de errores
  }
};

const traerProductosPorFactura = async (req: Request, res: Response) => {
  try {
    const { id } = matchedData(req);
    const productos = await productosPorFactura(id);
    res.status(200).send({ productos });
  } catch (error) {
    console.error("ERROR: ", error);
    //manejador de errores
  }
};

const crearFacturas = async (req: Request, res: Response) => {
  try {
    const factura = <CrearFacturaDTO>matchedData(req);
    const response = await guardarFactura(factura);
    res.status(201).send({ response });
  } catch (error) {
    console.error("ERROR: ", error);
    //manejador de errores
  }
};

export {
  traerFacturas,
  traerUnaFactura,
  traerClientePorFactura,
  traerProductosPorFactura,
  crearFacturas,
};
