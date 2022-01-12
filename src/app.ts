import "./setup";
import express from 'express';
import cors from 'cors';
import { connectionDatabase } from './database';
import { setupRoute } from "./config/route";

import * as userController from './controllers/userController';

const app = express();
app.use(cors())
app.use(express.json())

setupRoute(app);

export async function init () {
    await connectionDatabase()
}


export default app;
