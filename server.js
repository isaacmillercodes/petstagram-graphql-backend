const express = require('express');
const knex = require('./db/knex');

const app = express();

app.use('/pets', (req, res) => {
  knex('pets').then(results => {res.send(results);});
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
