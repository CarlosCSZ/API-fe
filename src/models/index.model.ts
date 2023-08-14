import { sequelize } from "../../config/database";

import { Clientes } from "./clientes.model";
import { FacturasProductos } from "./facturaProductos.model";
import { Facturas } from "./facturas.model";
import { Productos } from "./productos.model";

const models = {
  Clientes,
  Productos,
  Facturas,
  FacturasProductos,
};


Clientes.hasMany(Facturas, { foreignKey: 'clienteId', as: 'facturas' });
Facturas.belongsTo(Clientes, { foreignKey: 'clienteId', as: 'cliente' });

Facturas.hasMany(FacturasProductos, { foreignKey: 'facturaId', as: 'productos' });

FacturasProductos.belongsTo(Facturas, { foreignKey: "facturaId", as: "factura" });
FacturasProductos.belongsTo(Productos, { foreignKey: "productoId", as: "producto" });

const databaseSync = async () => {
  await Clientes.sync();
  await Productos.sync();
  await Facturas.sync();
  await FacturasProductos.sync();
};
databaseSync();


export { sequelize, models }
