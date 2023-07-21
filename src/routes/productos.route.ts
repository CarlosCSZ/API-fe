import { Router } from "express";

import { crearProductos, traerProductos, traerUnProducto } from "../controllers/productos.controller";
import { crearProductoValidator, productoValdiator } from "../validators/productos.validator";


const router = Router();

router.get('/', traerProductos);
router.get('/:id', productoValdiator, traerUnProducto);
router.post('/', crearProductoValidator, crearProductos);


export default router
