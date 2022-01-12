import { getRepository } from 'typeorm';
import UserEntity from '../entities/UserEntity';
import BcryptAdapter from '../utils/BcryptAdapter';
import UIAdapter from '../utils/UIAdapter';

import UserError from '../errors/UserError';
import SessionEntity from '../entities/SessionEntiy';

const encrypt = new BcryptAdapter(12);
const uuid = new UIAdapter('v4');

async function create (name: string, email: string, password: string): Promise<UserEntity> {
    const existUser = await getRepository(UserEntity).findOne({ email });
    if (existUser) {
        throw new UserError('Usuário já existe');
    }
    const encryptedPassword = encrypt.encrypt(password);
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

    if (!encrypt.compare(password, user.password)) {
        throw new UserError('Usuário e/ou senha inválidos!');
    }

    const token = uuid.generate();
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
