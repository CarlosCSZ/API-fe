import { Router } from 'express';
import fs from 'fs';

import productos from './productos.route';
import facturas from './facturas.route';
import clientes from './clientes.route';

const server = Router();
const path_routes = __dirname;

const path:(any) = {
  productos,
  facturas,
  clientes
};

const rmExtension = (filename: string) => {
  return filename.split('.').shift()
};

fs.readdirSync(path_routes).filter( (file) => {
  const name = rmExtension(file);
  if(name !== 'index'){
    const route = path[`${name}`];
    server.use(`/${name}`, route);
  }
});

export default server
