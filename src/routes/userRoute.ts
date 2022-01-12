import { Router } from 'express';
import * as userController from '../controllers/userController';

export default (router: Router): void => {
    router.post('/sign-up', userController.signUp);
    router.post('/sign-in', userController.signIn);
};
