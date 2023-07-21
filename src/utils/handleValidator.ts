import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const validatorResults = (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      console.log('VALIDATION FAILED')
      return res.status(403).send({ parameters: errors.array()});
    }
    console.log('VALIDATION SUCEEDED')
    next()
  } catch (err) {
    console.error('validator error: ', err)
    next(err)
  }
};
