import { check, body, Meta, param } from 'express-validator';

import { validatorResults } from '../utils/handleValidator';
import { NextFunction, Request, Response } from 'express';

const productoValdiator = [
  param('id').exists().custom((value, metadata: Meta) => {
    return parseInt(value)
  }),
  (req: Request, res: Response, next: NextFunction) => {
    return validatorResults(req, res, next);
  },
];

const crearProductoValidator = [
  check('nombre').exists().notEmpty().isString(),
  check('descripcion').exists().notEmpty().isString(),
  check('precio').exists().notEmpty().isNumeric(),
  check('iva').exists().notEmpty().isNumeric(),
  check('stock').exists().notEmpty().isNumeric(),
  (req: Request, res: Response, next: NextFunction) => {
    return validatorResults(req, res, next);
  },
];

export { productoValdiator, crearProductoValidator }
