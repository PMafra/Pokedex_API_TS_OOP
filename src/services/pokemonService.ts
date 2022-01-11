import * as pokemonRepository from "../repositories/pokemonRepository";

import ConflictError from "../errors/ConflictError";
import NotFoundError from "../errors/NotFoundError";

async function list () {
  const pokemonList = await pokemonRepository.list();
  return pokemonList;
}

async function getById (id: number) {
  const pokemon = await pokemonRepository.getById(id);

  if (!pokemon) {
    throw new NotFoundError(`Não existe pokemon com id ${id}!`);
  }

  return pokemon;
}

async function create (name: string) {
  const pokemon = await pokemonRepository.getByName(name);

  if (pokemon) {
    throw new ConflictError(`Já existe um pokemon com o nome "${name}"!`);
  }

  const newPokemon = await pokemonRepository.create(name);
  return newPokemon;
}

async function update (id: number, name: string) {
  const pokemon = await pokemonRepository.getById(id);

  if (!pokemon) {
    throw new NotFoundError(`Não existe pokemon com id ${id}!`);
  }

  const existingPokemonWithName = await pokemonRepository.getByName(name);

  if (existingPokemonWithName && existingPokemonWithName.id !== id) {
    throw new ConflictError(`Já existe um pokemon com o nome "${name}"!`);
  }

  const updatedPokemon = await pokemonRepository.update(id, name);

  return updatedPokemon;
}

async function destroy (id: number) {
  const pokemon = await pokemonRepository.getById(id);

  if (!pokemon) {
    throw new NotFoundError(`Não existe pokemon com id ${id}!`);
  }

  await pokemonRepository.destroy(id);
}

export {
  list,
  getById,
  create,
  update,
  destroy,
}
