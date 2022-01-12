import "./setup";
import express from 'express';
import cors from 'cors';
import { connectionDatabase } from './database';

import * as pokemonController from './controllers/pokemonController';
import * as userController from './controllers/userController';

const app = express();
app.use(cors())
app.use(express.json())

/* app.post('/sign-up', userController.signUp);
app.post('/sign-in', userController.signIn); */

app.get('/pokemon', pokemonController.list);
app.get('/pokemon/:id', pokemonController.getById);
app.post('/pokemon', pokemonController.create);
app.put('/pokemon/:id', pokemonController.update);
app.delete('/pokemon/:id', pokemonController.destroy);

export async function init () {
    await connectionDatabase()
}


export default app;
