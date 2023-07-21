import { CrearClienteDTO } from "../dtos/clientes.dto";
import { Facturas } from "../models/facturas.model";
import { models } from "../models/index.model";


const todosClientes = async () => {
  try {
    return await models.Clientes.findAll();
  } catch (error) {
    throw new Error(`ERROR: ${error}`)
  }
};

const clientePorId = async (id: number) => {
  try {
    return await models.Clientes.findByPk(id, {
      include: [
        {
          model: Facturas,
          as: 'facturas'
        }
      ]
    });
  } catch (error) {
    throw new Error(`ERROR: ${error}`)
  }
};

const guardarCliente = async (body: CrearClienteDTO) => {
  try {
    return await models.Clientes.create(body);
  } catch (error) {
    throw new Error(`ERROR: ${error}`)
  }
};


export { todosClientes, clientePorId, guardarCliente }
