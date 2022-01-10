import connection from '../database';

import SessionError from "../errors/SessionError";

async function create (userId: number, token: string) {
  const result = await connection.query(
    `INSERT INTO sessions ("userId", token) VALUES ($1, $2) RETURNING *;`,
    [userId, token]
  );

  if (result.rowCount > 0) {
      return true;
  }

  return false;
}

async function getUser (token: string) {
  const session = await connection.query(
    `SELECT * FROM sessions WHERE token=$1`,
    [token]
  );

  if (session.rowCount === 0) {
    throw new SessionError('Sessão inválida!');
  }

  const userId = Number(session.rows[0].userId);

  const user = await connection.query(
    `SELECT * FROM users WHERE id=$1`,
    [userId]
  );

  if (user.rowCount === 0) {
    throw new SessionError('Sessão corrompida!');
  }

  return user.rows[0];
}

export {
  create,
  getUser
}
