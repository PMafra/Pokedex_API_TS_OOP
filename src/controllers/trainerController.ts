import { Request, Response } from "express";

import TrainerService from "../services/TrainerService";

import ConflictError from "../errors/ConflictError";
import NotFoundError from "../errors/NotFoundError";
import TrainerEntity from "../entities/TrainerEntity";


const service = new TrainerService(TrainerEntity);

async function list (req: Request, res: Response) {
  try {
    const trainer = await service.list();
    res.send(trainer);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

async function getById (req: Request, res: Response) {
  try {
    const id = +req.params.id;
    const trainer = await service.getById(id);
    res.send(trainer);
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
    const createdTrainer = await service.create(name);
    res.status(201).send(createdTrainer);
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
    const updatedTrainer = await service.update(id, name);
    res.status(200).send(updatedTrainer);
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
    await service.destroy(id);
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
