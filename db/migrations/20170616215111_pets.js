exports.up = knex => {
  return knex.schema.createTable('pets', table => {
    table.increments();
    table.string('name').notNullable();
    table.string('species');
    table.string('breed');
    table.integer('age');
  });
};

exports.down = knex => {
  return knex.schema.dropTableIfExists('pets');
};
