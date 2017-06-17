exports.up = knex => {
  return knex.schema.createTable('pet_images', table => {
    table.integer('pet_id').references('pets.id');
    table.integer('image_id').references('images.id');
  });
};

exports.down = knex => {
  return knex.schema.dropTableIfExists('pet_images');
};
