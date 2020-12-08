import {Application} from 'express';
import SQL from 'sql-template-strings';
import {Database} from 'sqlite';

/** Install all Media related routes on the Application */
export function installRoutes(app: Application, db: Database): void {
  app.get('/media/list', async (req, res) => {
    return db.all(`SELECT rowid, * FROM media`)
        .catch((err) => {
          console.error(err.message);
          res.status(500).send({error: err.message});
        })
        .then((rows) => {
          res.send({media: rows});
        });
  });

  app.post('/media/new', async (req, res) => {
    const {
      title = '',
      type,
      source,
      pageUrl,
      mediaUrl,
      artist = '',
      location,
      fileName,
      fileExt,
      characters = [],
      tags = [],
      reconcilled = false,
    } = req.body;

    const params = [
      title,
      type,
      source,
      pageUrl,
      mediaUrl,
      artist,
      location,
      fileName,
      fileExt,
      JSON.stringify(characters),
      JSON.stringify(tags),
      reconcilled,
    ];

    // insert one row into the todos table
    const sql = `
    INSERT INTO media(title, type, source, pageUrl, mediaUrl, artist, location,
      fileName, fileExt, characters, tags, recorded, reconcilled)

      VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), ?)`;
    const result = await db.run(sql, params).catch((err) => {
      console.log(err.message);
      res.status(500).send({error: err.message});
      return;
    });

    if (!result) return;

    const lastID = result.lastID;
    // get the last insert id
    console.log(`A row has been inserted with rowid ${lastID}`);
    res.send({newId: lastID});
  });

  app.post('/media/delete', async (req, res) => {
    const {id} = req.body;

    // Delete one row from media table
    const sql = 'DELETE FROM media WHERE rowid = ?';
    await db.run(sql, id).catch((err) => {
      console.log(err.message);
      res.status(500).send({error: err.message});
      return;
    });

    console.log(`Media ${id} deleted successfully.`);
    res.send(`Media ${id} deleted successfully.`);
  });

  app.post('/media/reconcile/:id', async (req, res) => {
    const {id} = req.params;
    const {reconcile = true} = req.body;

    // Update one media row with reconcile state
    const sql = `UPDATE media SET reconcilled = ? WHERE rowid = ?`;
    const result = await db.run(sql, [reconcile, id]);

    const msg = `${reconcile ? 'Reconcilled' : 'Un-reconcilled'} ${
        result.changes} Media record.`;
    console.log(msg);
    res.send(msg);
  });

  app.get('/media/search', async (req, res) => {
    const {mediaUrl} = req.query;

    // Select media for the given search criteria
    const sql = SQL`SELECT rowid, * from media WHERE mediaUrl IS ${mediaUrl};`;
    const result = await db.all(sql).catch((err) => {
      console.log(err.message);
      res.status(404).send({error: err.message});
      return;
    });

    if (!result) return;

    res.send({result});
  });

  app.get('/media/:id', async (req, res) => {
    const {id} = req.params;

    const sql = `SELECT rowid, * from media WHERE rowid IS ?`;
    const row = await db.get(sql, [id]).catch((err) => {
      console.log(err.message);
      res.status(404).send({error: err.message});
      return;
    });

    // TODO: Send back something and a 404 if we find nothing
    if (!row) return;

    res.send({media: row});
  });

  // TODO:
  // `POST /media/update/:id` - Updates the details of the Media
  //    record with the specified ID
}
