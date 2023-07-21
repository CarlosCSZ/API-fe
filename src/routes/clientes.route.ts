import { Router } from "express";

import { crearClientes, traerClientes, traerUnCliente } from "../controllers/clientes.controller";
import { clienteValdiator, crearClienteValdiator } from "../validators/clientes.validator";


const router = Router();

router.get('/', traerClientes);
router.get('/:id', clienteValdiator, traerUnCliente);
router.post('/', crearClienteValdiator, crearClientes);


export default router
