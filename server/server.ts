import express = require('express');
import * as Database from './storage/db';
import bodyParser = require('body-parser');
import * as MediaModule from './media';
import * as sqlite from 'sqlite';
import {processArguments} from './cli-arguments';
import path from 'path';
import {inProdMode} from './utils';

// TODO: Read this from environment/build process
const SERVER_VERSION = '0.1.0';
const API_VERSION = 1;

const argv = processArguments();

/** Start a Shisho Express server instance */
async function startServer(db: sqlite.Database) {
  // Seed in Schema
  await Database.initialize(db).catch((err) => {
    console.log('Unexpected Error when initializing DB:');
    console.log(err.message);
    process.exit(1);
  });

  // Create a new express app instance
  const app: express.Application = express();

  // Serve app before static assets
  app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
  app.use(express.static(__dirname + '/public'));

  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());

  app.get('/version', (req, res) => {
    res.send({
      server_version: SERVER_VERSION,
      api_version: API_VERSION,
    });
  });

  MediaModule.installRoutes(app, db);

  app.listen({port: 3000}, () => {
    console.log('Mode: ' + (inProdMode() ? 'Prod' : 'Debug'))
    console.log('App is listening on port 3000!');
  });
}

/** Handle Datbabase Connection Error. Inform user with help. */
function handleDatabaseOpenError(err: Error) {
  console.log(`Unexpected Error when opening DB: ${err.message}`);
  console.log('Did you forget to `shisho unpack` first?');
}

// Open Database Connection and Start Server
Database.openDb({init: argv.init})
    .then(startServer)
    .catch(handleDatabaseOpenError);
