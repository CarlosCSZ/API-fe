import { CrearProductoDTO } from "../dtos/productos.dto";
import { models } from "../models/index.model";


const todosProductos = async () => {
  try {
    return await models.Productos.findAll();
  } catch (error) {
    throw new Error(`[SERVICE]: ${error}`)
  }
};

const productoPorId = async (id: number) => {
  try {
    return await models.Productos.findByPk(id);
  } catch (error) {
    throw new Error(`[SERVICE]: ${error}`)
  }
};

const guardarProducto = async (body: CrearProductoDTO) => {
  try {
    return await models.Productos.create(body);
  } catch (error) {
    throw new Error(`[SERVICE]: ${error}`)
  }
};


export { todosProductos, productoPorId, guardarProducto }
