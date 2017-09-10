exports.up = knex => {
  return knex.schema.createTable('users', table => {
    table.increments();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.integer('profile_image_id').references('images.id');
  });
};

exports.down = knex => {
  return knex.schema.dropTableIfExists('users');
};
