import { Request, Response } from "express";
import { matchedData } from "express-validator";

import {
  clientePorFactura,
  facturaPorId,
  guardarFactura,
  imprimirTemplate,
  productosPorFactura,
  todosFacturas,
} from "../services/facturas.service";
import { CrearFacturaDTO } from "../dtos/factura.dto";
import { handleError } from "../utils/handleHttpError";


const traerFacturas = async (req: Request, res: Response) => {
  try {
    const facturas = await todosFacturas();
    res.status(200).send({ facturas });
  } catch (error) {
    console.error("ERROR: ", error);
    handleError(res, 'something went wrong', error, 500)
  }
};

const traerUnaFactura = async (req: Request, res: Response) => {
  try {
    const { id } = matchedData(req);
    const facturas = await facturaPorId(id);
    res.status(200).send({ facturas });
  } catch (error) {
    console.error("ERROR: ", error);
    handleError(res, 'something went wrong', error, 500)
  }
};

const traerClientePorFactura = async (req: Request, res: Response) => {
  try {
    const { id } = matchedData(req);
    const cliente = await clientePorFactura(id);
    res.status(200).send({ cliente });
  } catch (error) {
    console.error("ERROR: ", error);
    handleError(res, 'something went wrong', error, 500)
  }
};

const traerProductosPorFactura = async (req: Request, res: Response) => {
  try {
    const { id } = matchedData(req);
    const productos = await productosPorFactura(id);
    res.status(200).send({ productos });
  } catch (error) {
    console.error("ERROR: ", error);
    handleError(res, 'something went wrong', error, 500)
  }
};

const crearFacturas = async (req: Request, res: Response) => {
  try {
    const body = <CrearFacturaDTO>matchedData(req);
    const factura = await guardarFactura(body);
    res.status(201).send({ factura });
  } catch (error) {
    console.error("ERROR: ", error);
    handleError(res, 'something went wrong', error, 500)
  }
};

const imprimirFactura = async (req: Request, res: Response) => {
  try {
    const { id } = matchedData(req);
    const pdfBuffer = await imprimirTemplate(id);
    res.setHeader('Content-Disposition', `attachment; filename="${pdfBuffer.filename}"`);
    res.setHeader('Content-Type', 'application/pdf');
    res.status(200).send(pdfBuffer);
  } catch (error) {
    console.error("ERROR: ", error);
    handleError(res, 'something went wrong', error, 500)
  }
}

export {
  traerFacturas,
  traerUnaFactura,
  traerClientePorFactura,
  traerProductosPorFactura,
  crearFacturas,
  imprimirFactura,
};
