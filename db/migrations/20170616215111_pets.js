exports.up = knex => {
  return knex.schema.createTable('pets', table => {
    table.increments();
    table.string('name').notNullable();
    table.string('species');
    table.string('breed');
    table.float('age');
    table.integer('profile_image_id').references('images.id');
  });
};

exports.down = knex => {
  return knex.schema.dropTableIfExists('pets');
};
