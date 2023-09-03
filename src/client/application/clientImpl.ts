import { ClientEntity, CreateClientEntity } from "../domain/client.entity";
import { ClientRepository } from "../domain/client.repository";
import { ClientValue } from "../domain/client.value";

export class ClientImplementation {

  constructor(private readonly clientRepository: ClientRepository) { }

  public async registerClient (body: CreateClientEntity): Promise<ClientEntity> {
    const client = new ClientValue(body);
    return await this.clientRepository.createClient(client);
  }
}
