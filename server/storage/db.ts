
import os from 'os';
import path from 'path';
import {Database, open} from 'sqlite';
import sqlite3 from 'sqlite3';

import {inDevMode} from '../utils';

import {CREATE_TABLES_SQL} from './schema';

// Production db location
let DEFAULT_DB_PATH = path.join(
    os.homedir(),
    'Downloads/shisho-downloads/default.db',
);

if (inDevMode()) {
  sqlite3.verbose();  // Enable long stack traces

  DEFAULT_DB_PATH = path.join(__dirname, '..', '..', 'db', 'default.db');
}

export interface OpenDbOptions {
  path?: string;   // Path to Database file
  init?: boolean;  // Should sqlite3 create a new Database file
}

/** Connects to the Sqlite3 database at the specified path. */
export async function openDb(opts: OpenDbOptions): Promise<Database> {
  const mode = opts.init ? sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE :
                           sqlite3.OPEN_READWRITE;
  return open({
    filename: opts.path || DEFAULT_DB_PATH,
    mode,
    driver: sqlite3.Database,
  });
}

/**
 * Initializes Database Schema
 *
 * Creates all missing tables.
 */
export function initialize(db: Database): Promise<void> {
  return db.exec(CREATE_TABLES_SQL);
}

/** Closes the Database Connection */
export function close(db: Database): Promise<void> {
  return db.close()
      .catch((err) => {
        if (err) {
          return console.error(err.message);
        }
      })
      .finally(() => {
        console.log('Database connection closed.');
      });
}

// Examples
// db.run(`INSERT INTO todos(label, done)
//         VALUES ('Test TODO', false),
//                ('Test TODO 2', true),
//                ('Test TODO 3', false)
// `);

// db.each(`SELECT rowid, label, done FROM todos`, (err, row) => {
//   if (err) {
//     console.error(err.message);
//   }
//   console.log(JSON.stringify(row));
// });
