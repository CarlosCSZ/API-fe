import { ClientEntity } from "./client.entity";

export class ClientValue implements ClientEntity {
  uuid: string;
  nombre: string;
  cedula: string;
  celular: string;
  direccion: string;

  constructor({
    nombre,
    cedula,
    celular,
    direccion,
  }: {
    nombre: string;
    cedula: string;
    celular: string;
    direccion: string;
  }) {
    this.uuid = "uuid()";
    this.nombre = nombre;
    this.cedula = cedula;
    this.celular = celular;
    this.direccion = direccion;
  }

}
