import UserEntity from '../entities/UserEntity';
import UserError from '../errors/UserError';

import BaseService from '../protocols/BaseService';
import { UUID } from '../protocols/UUID';
import { Encrypter } from '../protocols/Encripter';


export default class UserService extends BaseService {

    private encrypt: Encrypter;
    private uuid: UUID;

    constructor (entity:any, encrypt: Encrypter, uuid: UUID) {
        super(entity);
        this.encrypt = encrypt;
        this.uuid = uuid;
    }
    async create (name: string, email: string, password: string): Promise<UserEntity> {
        const existUser = await super.getEntity().findOne({ email });
        if (existUser) {
            throw new UserError('Usuário já existe');
        }

        const encryptedPassword = this.encrypt.encrypt(password);
        const result = await super.getEntity().create({
            name,
            email,
            password: encryptedPassword
        });
        if (!result) {
            throw new UserError('Houve um erro ao criar o usuário');
        }
    
        await super.getEntity().save(result);
        return result;
    }
    
    async login (email: string, password: string): Promise<string> {
        const user = await super.getEntity().findOne({ email });
    
        if (!user) {
            throw new UserError('Usuário e/ou senha inválidos!');
        }
    
        if (!this.encrypt.compare(password, user.password)) {
            throw new UserError('Usuário e/ou senha inválidos!');
        }
    
        const token = this.uuid.generate();
        const newSession = await super.getEntity().create({
            user,
            token,
        });
    
        await super.getEntity().save(newSession)
        return token;
    }
    
}