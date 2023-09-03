import { ClientEntity, CreateClientEntity } from "./client.entity";

export interface ClientRepository {
  findClientById(id: number): Promise<ClientEntity | null>
  findClients(): Promise<ClientEntity[] | []>
  createClient(client: CreateClientEntity): Promise<ClientEntity>
}
