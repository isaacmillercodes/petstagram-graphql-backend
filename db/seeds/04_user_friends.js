
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user_friends').del()
    .then(function () {
      // Inserts seed entries
      return knex('user_friends').insert([
        {
          user_one: knex('users').where('name', 'Killer Mike').select('id'),
          user_two: knex('users').where('name', 'El-P').select('id'),
          status: 'active'
        },
        {
          user_one: knex('users').where('name', 'Killer Mike').select('id'),
          user_two: knex('users').where('name', 'Lady Leshurr').select('id'),
          status: 'active'
        },
        {
          user_one: knex('users').where('name', 'Killer Mike').select('id'),
          user_two: knex('users').where('name', 'Childish Gambino').select('id'),
          status: 'active'
        },
        {
          user_one: knex('users').where('name', 'Killer Mike').select('id'),
          user_two: knex('users').where('name', 'Kendrick Lamar').select('id'),
          status: 'active'
        },
        {
          user_one: knex('users').where('name', 'El-P').select('id'),
          user_two: knex('users').where('name', 'Childish Gambino').select('id'),
          status: 'active'
        },
        {
          user_one: knex('users').where('name', 'El-P').select('id'),
          user_two: knex('users').where('name', 'Lady Leshurr').select('id'),
          status: 'active'
        },
        {
          user_one: knex('users').where('name', 'Jay Z').select('id'),
          user_two: knex('users').where('name', 'Beyonce Knowles').select('id'),
          status: 'active'
        },
        {
          user_one: knex('users').where('name', 'Jay Z').select('id'),
          user_two: knex('users').where('name', 'Kendrick Lamar').select('id'),
          status: 'active'
        },
        {
          user_one: knex('users').where('name', 'Beyonce Knowles').select('id'),
          user_two: knex('users').where('name', 'Kendrick Lamar').select('id'),
          status: 'active'
        },
        {
          user_one: knex('users').where('name', 'Beyonce Knowles').select('id'),
          user_two: knex('users').where('name', 'Lady Leshurr').select('id'),
          status: 'active'
        },
        {
          user_one: knex('users').where('name', 'Childish Gambino').select('id'),
          user_two: knex('users').where('name', 'Lady Leshurr').select('id'),
          status: 'active'
        }
      ]);
    });
};
