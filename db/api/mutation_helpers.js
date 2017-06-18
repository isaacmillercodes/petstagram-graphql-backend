const knex = require('../knex');

const addPet = (petObject) => knex('pets').insert(petObject).returning('*');

module.exports = { addPet };
