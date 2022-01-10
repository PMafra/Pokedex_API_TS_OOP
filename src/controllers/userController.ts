import { Request, Response } from 'express';
import UserError from '../errors/UserError';
import * as userService from '../services/userService';

async function signUp (req: Request, res: Response) {
    const {
        name,
        email,
        password,
        confirmPassword,
    } = req.body;

    try {
        if (password !== confirmPassword) {
            return res.status(400).send('Passwords diferentes');
        }
        if (email.indexOf('@') < 0) {
            return res.status(400).send('Email não válido');
        }
    
        await userService.create(name, email, password);
        return res.status(200).send('Usuário criado')
    } catch (error) {
        if (error instanceof UserError) {
            return res.status(400).send(error.message);
        }

        console.error(error);
        return res.sendStatus(500);
    }
}

async function signIn (req: Request, res: Response) {
    const {
        email,
        password
    } = req.body;

    try {
        const token = await userService.login(email, password);
        return res.status(200).send({ token });
    } catch (error) {
        if (error instanceof UserError) {
            return res.status(400).send(error.message);
        }

        console.error(error);
        return res.sendStatus(500);
    }
}

export {
    signUp,
    signIn
}