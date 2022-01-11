import database from "../database";

import ConflictError from "../errors/ConflictError";
import NotFoundError from "../errors/NotFoundError";
import UnknownError from "../errors/UnknownError";

async function list () {
  const result = await database.query(`SELECT * FROM pokemon;`);
  return result.rows;
}

async function getById (id: number) {
  const result = await database.query(
    `SELECT * FROM pokemon WHERE id=$1;`,
    [id]
  );

  if (result.rowCount === 0) {
    return null;
  }

  return result.rows[0];
}

async function getByName (name: string) {
  const result = await database.query(
    `SELECT * FROM pokemon WHERE name=$1;`,
    [name]
  );

  if (result.rowCount === 0) {
    return null;
  }

  return result.rows[0];
}

async function create (name: string) {
  const result = await database.query(
    `INSERT INTO pokemon (name) VALUES ($1) RETURNING *;`,
    [name]
  );

  if (result.rowCount === 0) {
    throw new UnknownError(`Não foi possível criar pokemon!`);
  }

  return result.rows[0];
}

async function update (id: number, name: string) {
  const result = await database.query(
    `UPDATE pokemon SET name=$1 WHERE id=$2 RETURNING *;`,
    [name, id]
  );

  return result.rows[0];
}

async function destroy (id: number) {
  await database.query(
    `DELETE FROM pokemon WHERE id=$1;`,
    [id]
  );
}

export {
  list,
  getById,
  getByName,
  create,
  update,
  destroy,
}
