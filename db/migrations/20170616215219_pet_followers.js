exports.up = knex => {
  return knex.schema.createTable('pet_followers', table => {
    table.integer('pet_id').references('pets.id');
    table.integer('follower_id').references('users.id');
  });
};

exports.down = knex => {
  return knex.schema.dropTableIfExists('pet_followers');
};
