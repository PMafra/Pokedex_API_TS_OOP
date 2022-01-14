import { getRepository } from 'typeorm';
import NotFoundError from '../errors/NotFoundError';

export default abstract class BaseService {
  private entity: any;
  constructor(entity: any) {
    this.entity = entity;
  }

  getEntity (): any {
    return getRepository(this.entity);
  }

  async list(): Promise<any[]> {
    const pokemonList = await this.getEntity().find();
    return pokemonList;
  }

  async getById(id: number) {
    const pokemon = await this.getEntity().findOne({ id });

    if (!pokemon) {
      throw new NotFoundError(`Não existe pokemon com id ${id}!`);
    }

    return pokemon;
  }

  async destroy(id: number): Promise<void> {
    const pokemon = await this.getEntity().findOne({ id });

    if (!pokemon) {
      throw new NotFoundError(`Não existe pokemon com id ${id}!`);
    }
    await this.getEntity().delete({ id });
  }
}
