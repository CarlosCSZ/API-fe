import { Response } from "express";

const handleError = (res: Response, message = 'revisar el proceso', error:any, code=400) => {
  res.status(code);
  res.send({ error: message });
}

export { handleError }
