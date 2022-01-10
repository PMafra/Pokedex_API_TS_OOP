import bcrypt from 'bcrypt';
import * as userRepository from '../repositories/userRepository';
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

export {
    create,
}