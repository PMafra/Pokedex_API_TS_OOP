import Pokemon from './protocols/Pokemon';

import ConflictError from '../errors/ConflictError';
import NotFoundError from '../errors/NotFoundError';
import BaseService from '../protocols/BaseService';

export default class PokemonService extends BaseService {
  async create(name: string): Promise<Pokemon> {
    const pokemon = await super.getEntity().findOne({ name });

    if (pokemon) {
      throw new ConflictError(`Já existe um pokemon com o nome "${name}"!`);
    }

    const newPokemon = await super.getEntity().create({ name });
    await super.getEntity().save(newPokemon);
    return newPokemon;
  }

  async update(id: number, name: string): Promise<Pokemon> {
    const pokemon = await super.getEntity().findOne({ id });

    if (!pokemon) {
      throw new NotFoundError(`Não existe pokemon com id ${id}!`);
    }

    const existingPokemonWithName = await super.getEntity().findOne({
      name,
    });

    if (existingPokemonWithName && existingPokemonWithName.id !== id) {
      throw new ConflictError(`Já existe um pokemon com o nome "${name}"!`);
    }

    pokemon.name = name;
    const updatedPokemon = await super.getEntity().save(pokemon);

    return updatedPokemon;
  }
}
