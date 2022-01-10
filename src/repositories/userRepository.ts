import connection from '../database';

async function create (name: string, email: string, password: string) {

    const result = await connection.query(
        `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)
            RETURNING *;`, [name, email, password]
        );
    if (result.rowCount > 0) {
        return true;
    }
    return false;
}

async function findByEmail (email: string) {
    const result = await connection.query(
        `SELECT email FROM users WHERE email = ($1);`, [email]
    )
    if (result.rowCount > 0) {
        return true;
    }

    return false;
} 


export {
    create,
    findByEmail,
}