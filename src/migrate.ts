import "./setup";

import fs from "fs";
import path from "path";

import database from "./database";

async function migrate () {
  await createMigrationsTable();

  const allMigrations = await listMigrations();
  const executedMigrations = await listExecutedMigrations();

  for (const migration of allMigrations) {
    const migrationName = migration.split("/").slice(-1)[0];

    if (!executedMigrations.includes(migrationName)) {
      await runMigration(migration);
      await registerExecutedMigration(migrationName);

      console.log(`Ran migration "${migrationName}"`);
    }
  }

  console.log("Done");
  await database.end();
}

migrate();

async function createMigrationsTable () {
  const query = `
    CREATE TABLE IF NOT EXISTS "_migrations" (
      "id" SERIAL PRIMARY KEY,
      "name" TEXT NOT NULL
    );
  `;

  await database.query(query);
}

function listMigrations (): Promise<string[]> {
  const migrationsPath = path.resolve(__dirname, "..", "migrations");

  return new Promise((resolve, reject) => {
    fs.readdir(migrationsPath, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files.map(filename => `${migrationsPath}/${filename}`).sort());
      }
    });
  });
}

async function listExecutedMigrations (): Promise<string[]> {
  const query = `
    SELECT * FROM "_migrations";
  `;

  const result = await database.query(query);

  return result.rows.map(row => row.name);
}

function runMigration (migration: string): Promise<void> {
  return new Promise((resolve, reject) => {
    fs.readFile(migration, async (err, data) => {
      if (err) {
        reject(err);
      } else {
        const migrationData = data.toString();
  
        try {
          await database.query(migrationData);
          resolve();
        } catch (err) {
          reject(err);
        }
      }
    });
  });
}

async function registerExecutedMigration (migrationName: string) {
  const query = `
    INSERT INTO "_migrations" (name) VALUES ('${migrationName}');
  `;

  await database.query(query);
}
