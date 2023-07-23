import { CrearClienteDTO } from "../dtos/clientes.dto";
import { Facturas } from "../models/facturas.model";
import { models } from "../models/index.model";


const todosClientes = async (cedula: string | undefined) => {
  try {
    let option: any = {};
    if(cedula){
      option['where'] = {cedula}
    }
    const clientes = await models.Clientes.findAll(option);
    if(clientes.length === 0){
      throw new Error('Cliente no registrado')
    }
    return clientes
  } catch (error) {
    throw new Error(`[SERVICE]: ${error}`)
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
    throw new Error(`[SERVICE]: ${error}`)
  }
};

const guardarCliente = async (body: CrearClienteDTO) => {
  try {
    return await models.Clientes.create(body);
  } catch (error) {
    throw new Error(`[SERVICE]: ${error}`)
  }
};


export { todosClientes, clientePorId, guardarCliente }
