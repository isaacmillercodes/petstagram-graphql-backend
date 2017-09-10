const express = require('express');
const dotenv = require('dotenv').config();
const knex = require('./db/knex');
const morgan = require('morgan');
const expressGraphQL = require('express-graphql');
const cors = require('cors');
const jwt = require('express-jwt');
const schema = require('./db/schema');

const app = express();

app.use(morgan('tiny'));

app.use('/pets', (req, res) => {
  knex('pets').then(results => {res.send(results);});
});

app.use(jwt({
  secret: process.env.SECRET_KEY,
  credentialsRequired: false,
  getToken: (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } else {
      return null;
    }
  }
}));

app.use('/graphql', cors(), expressGraphQL({
  schema,
  graphiql: true
}));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
