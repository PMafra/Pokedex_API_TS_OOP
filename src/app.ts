import "./setup";
import express from 'express';
import cors from 'cors';
import connection from './database';

import * as userController from './controllers/userController';

const app = express();
app.use(cors())
app.use(express.json())

app.post('/sign-up', userController.signUp);



export async function init () {
    await connection;
}

export default app;