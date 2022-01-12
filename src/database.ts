import { getConnectionManager } from 'typeorm';

export async function connectionDatabase () {
    const connectionManager = await getConnectionManager();
    const connection = connectionManager.create({
        url: 'postgres://postgres:123456@localhost:5433/pokedex',
        type: 'postgres',
        entities: ['./src/entities/*.ts'],
        name: 'default'
    })

    await connection.connect();
    console.log('Conectado')
}


