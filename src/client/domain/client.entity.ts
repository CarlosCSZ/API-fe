import { Client } from "../infrastructure/model/client.model";

interface ClientEntity {
  uuid: string;
  nombre: string;
  cedula: string;
  celular: string;
  direccion: string;
};

interface CreateClientEntity extends Omit<ClientEntity, 'uuid'> {};


export { ClientEntity, CreateClientEntity };
