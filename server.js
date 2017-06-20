const express = require('express');
const knex = require('./db/knex');
const morgan = require('morgan');
const expressGraphQL = require('express-graphql');
const schema = require('./db/schema');

const app = express();

app.use(morgan('tiny'));

app.use('/pets', (req, res) => {
  knex('pets').then(results => {res.send(results);});
});

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
