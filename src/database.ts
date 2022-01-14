import { getConnectionManager } from 'typeorm';

export async function connectionDatabase () {
    const connectionManager = await getConnectionManager();
    const connection = connectionManager.create({
        url: process.env.DB_URL,
        type: 'postgres',
        entities: ['./src/entities/*.ts'],
        name: 'default'
    })

    await connection.connect();
    console.log('Conectado')
}


