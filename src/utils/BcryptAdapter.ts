import { Encrypter } from '../protocols/Encripter';
import bcrypt from 'bcrypt';

export default class BcryptAdapter implements Encrypter {

    private salt: number = 10;

    constructor (salt: number) {
        this.salt = salt || 10;
    }
    encrypt(value: string): string {
        return bcrypt.hashSync(value, this.salt);
    }

    compare(value: string, compareValue: string): boolean {
        return bcrypt.compareSync(value, compareValue)
    }
    

}