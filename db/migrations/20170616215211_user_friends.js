exports.up = knex => {
  return knex.schema.createTable('user_friends', table => {
    table.integer('user_one').references('users.id');
    table.integer('user_two').references('users.id');
    table.string('status').defaultTo('pending');
  });
};

exports.down = knex => {
  return knex.schema.dropTableIfExists('user_friends');
};
