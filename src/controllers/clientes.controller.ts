import { Request, Response } from "express";
import { matchedData } from "express-validator";

import { clientePorId, guardarCliente, todosClientes } from "../services/clientes.service";
import { ClientesDTO } from "../dtos/clientes.dto";


const traerClientes = async (req: Request, res: Response) => {
  try {
    const clientes = await todosClientes();
    res.status(200).send({ clientes })
  } catch (error) {
    console.error('ERROR: ', error)
    //manejador de errores
  }
};

const traerUnCliente = async (req: Request, res: Response) => {
  try {
    const { id } = matchedData(req);
    const cliente = await clientePorId(id);
    res.status(200).send({ cliente })
  } catch (error) {
    console.error('ERROR: ', error)
    //manejador de errores
  }
};

const crearClientes = async (req: Request, res: Response) => {
  try {
    const cliente = <ClientesDTO>matchedData(req);
    const response = await guardarCliente(cliente);
    res.status(201).send({ response })
  } catch (error) {
    console.error('ERROR: ', error)
    //manejador de errores
  }
};

export { traerClientes, traerUnCliente, crearClientes }
