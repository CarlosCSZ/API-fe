import { Clientes } from "../models/clientes.model";

interface ClientesDTO extends Clientes {};

interface CrearClienteDTO extends Omit<ClientesDTO, 'id'> {};


export { ClientesDTO, CrearClienteDTO };
