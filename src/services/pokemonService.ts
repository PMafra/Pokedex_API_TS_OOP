import { getRepository } from 'typeorm';
import PokemonEntity from '../entities/PokemonEntity';

import ConflictError from "../errors/ConflictError";
import NotFoundError from "../errors/NotFoundError";

async function list () {
  const pokemonList = await getRepository(PokemonEntity).find();
  return pokemonList;
}

async function getById (id: number) {
  const pokemon = await getRepository(PokemonEntity).findOne({ id });

  if (!pokemon) {
    throw new NotFoundError(`Não existe pokemon com id ${id}!`);
  }

  return pokemon;
}

async function create (name: string) {
  const pokemon = await getRepository(PokemonEntity).findOne({ name });

  if (pokemon) {
    throw new ConflictError(`Já existe um pokemon com o nome "${name}"!`);
  }

  const newPokemon = await getRepository(PokemonEntity).create({ name });
  await getRepository(PokemonEntity).save(newPokemon);
  return newPokemon;
}

async function update (id: number, name: string) {
  const pokemon = await getRepository(PokemonEntity).findOne({ id });

  if (!pokemon) {
    throw new NotFoundError(`Não existe pokemon com id ${id}!`);
  }

  const existingPokemonWithName = await getRepository(PokemonEntity).findOne({ name });

  if (existingPokemonWithName && existingPokemonWithName.id !== id) {
    throw new ConflictError(`Já existe um pokemon com o nome "${name}"!`);
  }

  pokemon.name = name;
  const updatedPokemon = await getRepository(PokemonEntity).save(pokemon);

  return updatedPokemon;
}

async function destroy (id: number) {
  const pokemon = await getRepository(PokemonEntity).findOne({ id });

  if (!pokemon) {
    throw new NotFoundError(`Não existe pokemon com id ${id}!`);
  }
  await await getRepository(PokemonEntity).delete({ id });
}

export {
  list,
  getById,
  create,
  update,
  destroy,
}
