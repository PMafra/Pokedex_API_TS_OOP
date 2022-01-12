import { Router } from 'express';
import * as pokemonController from '../controllers/pokemonController';

export default (router: Router): void => {
  router.get('/pokemon', pokemonController.list);
  router.get('/pokemon/:id', pokemonController.getById);
  router.post('/pokemon', pokemonController.create);
  router.put('/pokemon/:id', pokemonController.update);
  router.delete('/pokemon/:id', pokemonController.destroy);
};
