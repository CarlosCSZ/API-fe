import { Router } from "express";

import {
  crearFacturas,
  imprimirFactura,
  traerClientePorFactura,
  traerFacturas,
  traerProductosPorFactura,
  traerUnaFactura,
} from "../controllers/facturas.controller";
import {
  crearFacturaValidator,
  facturaValdiator,
} from "../validators/facturas.validator";

const router = Router();

router.get("/", traerFacturas);
router.get("/:id", facturaValdiator, traerUnaFactura);
router.get("/:id/cliente", facturaValdiator, traerClientePorFactura);
router.get("/:id/productos", facturaValdiator, traerProductosPorFactura);
router.get("/:id/imprimir", facturaValdiator, imprimirFactura);
router.post("/", crearFacturaValidator, crearFacturas);

export default router;
