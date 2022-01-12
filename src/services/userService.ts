import { getRepository } from 'typeorm';
import UserEntity from '../entities/UserEntity';
import bcrypt from 'bcrypt';
import { v4 as uuid } from "uuid";

import UserError from '../errors/UserError';
import SessionEntity from '../entities/SessionEntiy';

async function create (name: string, email: string, password: string): Promise<UserEntity> {
    const existUser = await getRepository(UserEntity).findOne({ email });
    if (existUser) {
        throw new UserError('Usuário já existe');
    }
    const encryptedPassword = bcrypt.hashSync(password, 10);
    const result = await getRepository(UserEntity).create({
        name,
        email,
        password: encryptedPassword
    });
    if (!result) {
        throw new UserError('Houve um erro ao criar o usuário');
    }

    await getRepository(UserEntity).save(result);
    return result;
}

async function login (email: string, password: string): Promise<string> {
    const user = await getRepository(UserEntity).findOne({ email });

    if (!user) {
        throw new UserError('Usuário e/ou senha inválidos!');
    }

    if (!bcrypt.compareSync(password, user.password)) {
        throw new UserError('Usuário e/ou senha inválidos!');
    }

    const token = uuid();
    const newSession = await getRepository(SessionEntity).create({
        user,
        token,
    });

    await getRepository(SessionEntity).save(newSession)
    return token;
}

export {
    create,
    login
}
