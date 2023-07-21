import { check, Meta, param } from 'express-validator';

import { validatorResults } from '../utils/handleValidator';
import { NextFunction, Request, Response } from 'express';

const facturaValdiator = [
  param('id').exists().custom((value, metadata: Meta) => {
    return parseInt(value)
  }),
  (req: Request, res: Response, next: NextFunction) => {
    return validatorResults(req, res, next);
  },
];

const crearFacturaValidator = [
  check('clienteId').exists().notEmpty().isNumeric(),
  check('productos').exists().notEmpty().isArray(),
  check('cantidad').exists().notEmpty().isArray().custom((value, metadata: Meta) => {
    if(value.length !== metadata.req.body.productos.length){
      throw new Error('Las cantidades no concuerdan con el numero de productos')
    }
    return true
  }),
  (req: Request, res: Response, next: NextFunction) => {
    return validatorResults(req, res, next);
  },
];


export { facturaValdiator, crearFacturaValidator }
