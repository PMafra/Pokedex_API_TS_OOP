import { Request, Response } from "express";

import * as pokemonService from "../services/pokemonService";

import ConflictError from "../errors/ConflictError";
import NotFoundError from "../errors/NotFoundError";

async function list (req: Request, res: Response) {
  try {
    const pokemon = await pokemonService.list();
    res.send(pokemon);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

async function getById (req: Request, res: Response) {
  try {
    const id = +req.params.id;
    const pokemon = await pokemonService.getById(id);
    res.send(pokemon);
  } catch (err) {
    if (err instanceof ConflictError) {
      return res.status(409).send(err.message);
    }

    if (err instanceof NotFoundError) {
      return res.status(404).send(err.message);
    }

    console.error(err);
    res.sendStatus(500);
  }
}

async function create (req: Request, res: Response) {
  try {
    const { name } = req.body;
    const createdPokemon = await pokemonService.create(name);
    res.status(201).send(createdPokemon);
  } catch (err) {
    if (err instanceof ConflictError) {
      return res.status(409).send(err.message);
    }

    console.error(err);
    res.sendStatus(500);
  }
}

async function update (req: Request, res: Response) {
  try {
    const id = +req.params.id;
    const { name } = req.body;
    const updatedPokemon = await pokemonService.update(id, name);
    res.status(200).send(updatedPokemon);
  } catch (err) {
    if (err instanceof ConflictError) {
      return res.status(409).send(err.message);
    }

    if (err instanceof NotFoundError) {
      return res.status(404).send(err.message);
    }

    console.error(err);
    res.sendStatus(500);
  }
}

async function destroy (req: Request, res: Response) {
  try {
    const id = +req.params.id;
    await pokemonService.destroy(id);
    res.sendStatus(204);
  } catch (err) {
    if (err instanceof NotFoundError) {
      return res.status(404).send(err.message);
    }

    console.error(err);
    res.sendStatus(500);
  }
}

export {
  list,
  getById,
  create,
  update,
  destroy,
}
