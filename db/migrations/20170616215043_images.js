exports.up = knex => {
  return knex.schema.createTable('images', table => {
    table.increments();
    table.string('image_url').notNullable();
    table.text('caption');
    table.integer('likes').defaultTo(0);
    table.timestamp('uploaded_at').defaultTo(knex.fn.now());
  });
};

exports.down = knex => {
  return knex.schema.dropTableIfExists('images');
};
