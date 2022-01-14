import Trainer from './protocols/Trainer';

import ConflictError from '../errors/ConflictError';
import NotFoundError from '../errors/NotFoundError';
import BaseService from '../protocols/BaseService';

export default class TrainerService extends BaseService {
  async create(name: string): Promise<Trainer> {
    const trainer = await super.getEntity().findOne({ name });

    if (trainer) {
      throw new ConflictError(`Já existe um treinador com o nome "${name}"!`);
    }

    const newTrainer = await super.getEntity().create({ name });
    await super.getEntity().save(newTrainer);
    return newTrainer;
  }

  async update(id: number, name: string): Promise<Trainer> {
    const trainer = await super.getEntity().findOne({ id });

    if (!trainer) {
      throw new NotFoundError(`Não existe treinador com id ${id}!`);
    }

    const existingTrainerWithName = await super.getEntity().findOne({
      name,
    });

    if (existingTrainerWithName && existingTrainerWithName.id !== id) {
      throw new ConflictError(`Já existe um treinador com o nome "${name}"!`);
    }

    trainer.name = name;
    const updatedTrainer = await super.getEntity().save(trainer);

    return updatedTrainer;
  }
}
