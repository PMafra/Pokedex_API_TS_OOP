import { Router } from 'express';
import * as trainerController from '../controllers/trainerController';

export default (router: Router): void => {
  router.get('/trainer', trainerController.list);
  router.get('/trainer/:id', trainerController.getById);
  router.post('/trainer', trainerController.create);
  router.put('/trainer/:id', trainerController.update);
  router.delete('/trainer/:id', trainerController.destroy);
};
