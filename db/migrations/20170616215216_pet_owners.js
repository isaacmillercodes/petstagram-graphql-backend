exports.up = knex => {
  return knex.schema.createTable('pet_owners', table => {
    table.integer('pet_id').references('pets.id');
    table.integer('owner_id').references('users.id');
  });
};

exports.down = knex => {
  return knex.schema.dropTableIfExists('pet_owners');
};
