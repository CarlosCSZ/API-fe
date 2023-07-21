import { Response } from "express";

const handleError = (res: Response, message: string, error: any, code: number) => {

  if(error.message.includes('[CONTROLLER]')){
    message = `[PROCESS ERROR]: ${message}`;
    code = 400;
  }

  if(error.message.includes('[SERVICE]')){
    const errorMessage = error.message.split('Error: ').pop();
    message = `[DB ERROR]: ${errorMessage}`;
  }

  if(error.message.includes('[SERVICE]', 'Producto no registrado')){
    const errorMessage = error.message.split('Error: ').pop();
    message = `[DB ERROR]: ${errorMessage}`;
    code = 404;
  }


  res.status(code);
  res.send({ error: message });
}

export { handleError }
