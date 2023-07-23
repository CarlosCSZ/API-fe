import { Meta, check, param, query } from 'express-validator';

import { validatorResults } from '../utils/handleValidator';
import { NextFunction, Request, Response } from 'express';

const clientePorCedulaValdiator = [
  query('cedula').optional().isLength({ min: 10, max: 10 }),
  (req: Request, res: Response, next: NextFunction) => {
    return validatorResults(req, res, next);
  },
];

const clienteValdiator = [
  param('id').exists().custom((value, metadata: Meta) => {
    return parseInt(value)
  }),
  (req: Request, res: Response, next: NextFunction) => {
    return validatorResults(req, res, next);
  },
];

const crearClienteValdiator = [
  check('nombre').exists().notEmpty().isString(),
  check('cedula').exists().notEmpty().isString().isLength({min: 10, max: 10}),
  check('celular').exists().notEmpty().isString().isLength({min: 10, max: 10}),
  check('direccion').exists().notEmpty().isString(),
  (req: Request, res: Response, next: NextFunction) => {
    return validatorResults(req, res, next);
  },
];

export { clientePorCedulaValdiator, clienteValdiator, crearClienteValdiator }
