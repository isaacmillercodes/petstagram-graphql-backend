const express = require('express');
const expressGraphQL = require('express-graphql');
const knex = require('./db/knex');

const app = express();

app.use('/sanitycheck', (req, res) => {res.send({message: 'Server is running!'});});

app.use('/users', (req, res) => {
  knex('users').then(results => {res.send(results);});
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
