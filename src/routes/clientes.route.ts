import { Router } from "express";

import { crearClientes, traerClientes, traerUnCliente } from "../controllers/clientes.controller";
import { clientePorCedulaValdiator, clienteValdiator, crearClienteValdiator } from "../validators/clientes.validator";


const router = Router();

router.get('/', clientePorCedulaValdiator, traerClientes);
router.get('/:id', clienteValdiator, traerUnCliente);
router.post('/', crearClienteValdiator, crearClientes);


export default router
