import bcrypt from 'bcrypt';
import { v4 as uuid } from "uuid";

import * as userRepository from '../repositories/userRepository';
import * as sessionRepository from '../repositories/sessionRepository';
import UserError from '../errors/UserError';

async function create (name: string, email: string, password: string) {
    const existUser = await userRepository.findByEmail(email);
    if (existUser) {
        throw new UserError('Usuário já existe');
    }
    const encryptedPassword = bcrypt.hashSync(password, 10);
    const result = await userRepository.create(name, email, encryptedPassword);
    if (!result) {
        throw new UserError('Houve um erro ao criar o usuário');
    }
    return result;
}

async function login (email: string, password: string) {
    const user = await userRepository.findByEmail(email);

    if (!user) {
        throw new UserError('Usuário e/ou senha inválidos!');
    }

    if (!bcrypt.compareSync(password, user.password)) {
        throw new UserError('Usuário e/ou senha inválidos!');
    }

    const token = uuid();
    await sessionRepository.create(user.id, token);
    return token;
}

export {
    create,
    login
}
