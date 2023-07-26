import { Request, Response } from "express";
import { matchedData } from "express-validator";

import { clientePorId, guardarCliente, todosClientes } from "../services/clientes.service";
import { ClientesDTO } from "../dtos/clientes.dto";
import { handleError } from "../utils/handleHttpError";


const traerClientes = async (req: Request, res: Response) => {
  try {
    const { cedula } = matchedData(req);
    const clientes = await todosClientes(cedula);
    res.status(200).send({ clientes })
  } catch (error) {
    console.error('ERROR: ', error)
    handleError(res, 'something went wrong', error, 500)
  }
};

const traerUnCliente = async (req: Request, res: Response) => {
  try {
    const { id } = matchedData(req);
    const cliente = await clientePorId(id);
    res.status(200).send({ cliente })
  } catch (error) {
    console.error('ERROR: ', error)
    handleError(res, 'something went wrong', error, 500)
  }
};

const crearClientes = async (req: Request, res: Response) => {
  try {
    const body = <ClientesDTO>matchedData(req);
    const cliente = await guardarCliente(body);
    res.status(201).send({ cliente })
  } catch (error) {
    console.error('ERROR: ', error)
    handleError(res, 'something went wrong', error, 500)
  }
};

export { traerClientes, traerUnCliente, crearClientes }
