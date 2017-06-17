
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('pet_followers').del()
    .then(function () {
      // Inserts seed entries
      return knex('pet_followers').insert([
        {
          pet_id: knex('pets').where('name', 'Uncle Johnny').select('id'),
          follower_id: knex('users').where('name', 'Killer Mike').select('id')
        },
        {
          pet_id: knex('pets').where('name', 'Uncle Johnny').select('id'),
          follower_id: knex('users').where('name', 'El-P').select('id')
        },
        {
          pet_id: knex('pets').where('name', 'Uncle Johnny').select('id'),
          follower_id: knex('users').where('name', 'Childish Gambino').select('id')
        },
        {
          pet_id: knex('pets').where('name', 'Uncle Johnny').select('id'),
          follower_id: knex('users').where('name', 'Kendrick Lamar').select('id')
        },
        {
          pet_id: knex('pets').where('name', 'Uncle Johnny').select('id'),
          follower_id: knex('users').where('name', 'Lady Leshurr').select('id')
        },
        {
          pet_id: knex('pets').where('name', 'Mrs. Meowmers').select('id'),
          follower_id: knex('users').where('name', 'Killer Mike').select('id')
        },
        {
          pet_id: knex('pets').where('name', 'Mrs. Meowmers').select('id'),
          follower_id: knex('users').where('name', 'El-P').select('id')
        },
        {
          pet_id: knex('pets').where('name', 'Mrs. Meowmers').select('id'),
          follower_id: knex('users').where('name', 'Childish Gambino').select('id')
        },
        {
          pet_id: knex('pets').where('name', 'Mrs. Meowmers').select('id'),
          follower_id: knex('users').where('name', 'Lady Leshurr').select('id')
        },
        {
          pet_id: knex('pets').where('name', 'Rufus').select('id'),
          follower_id: knex('users').where('name', 'Beyonce Knowles').select('id')
        },
        {
          pet_id: knex('pets').where('name', 'Rufus').select('id'),
          follower_id: knex('users').where('name', 'Jay Z').select('id')
        },
        {
          pet_id: knex('pets').where('name', 'Rufus').select('id'),
          follower_id: knex('users').where('name', 'Kendrick Lamar').select('id')
        },
        {
          pet_id: knex('pets').where('name', 'Rufus').select('id'),
          follower_id: knex('users').where('name', 'Lady Leshurr').select('id')
        },
        {
          pet_id: knex('pets').where('name', 'Onyx').select('id'),
          follower_id: knex('users').where('name', 'Beyonce Knowles').select('id')
        },
        {
          pet_id: knex('pets').where('name', 'Onyx').select('id'),
          follower_id: knex('users').where('name', 'Jay Z').select('id')
        },
        {
          pet_id: knex('pets').where('name', 'Onyx').select('id'),
          follower_id: knex('users').where('name', 'Lady Leshurr').select('id')
        },
        {
          pet_id: knex('pets').where('name', 'Nico').select('id'),
          follower_id: knex('users').where('name', 'Beyonce Knowles').select('id')
        },
        {
          pet_id: knex('pets').where('name', 'Nico').select('id'),
          follower_id: knex('users').where('name', 'Lady Leshurr').select('id')
        },
        {
          pet_id: knex('pets').where('name', 'Franky').select('id'),
          follower_id: knex('users').where('name', 'Childish Gambino').select('id')
        },
        {
          pet_id: knex('pets').where('name', 'Franky').select('id'),
          follower_id: knex('users').where('name', 'Lady Leshurr').select('id')
        },
        {
          pet_id: knex('pets').where('name', 'Franky').select('id'),
          follower_id: knex('users').where('name', 'Killer Mike').select('id')
        },
        {
          pet_id: knex('pets').where('name', 'Franky').select('id'),
          follower_id: knex('users').where('name', 'El-P').select('id')
        },
        {
          pet_id: knex('pets').where('name', 'Gary').select('id'),
          follower_id: knex('users').where('name', 'Lady Leshurr').select('id')
        },
        {
          pet_id: knex('pets').where('name', 'Gary').select('id'),
          follower_id: knex('users').where('name', 'Beyonce Knowles').select('id')
        },
        {
          pet_id: knex('pets').where('name', 'Gary').select('id'),
          follower_id: knex('users').where('name', 'Childish Gambino').select('id')
        },
        {
          pet_id: knex('pets').where('name', 'Gary').select('id'),
          follower_id: knex('users').where('name', 'Killer Mike').select('id')
        },
        {
          pet_id: knex('pets').where('name', 'Gary').select('id'),
          follower_id: knex('users').where('name', 'El-P').select('id')
        },
        {
          pet_id: knex('pets').where('name', 'King').select('id'),
          follower_id: knex('users').where('name', 'Kendrick Lamar').select('id')
        },
        {
          pet_id: knex('pets').where('name', 'King').select('id'),
          follower_id: knex('users').where('name', 'Killer Mike').select('id')
        },
        {
          pet_id: knex('pets').where('name', 'King').select('id'),
          follower_id: knex('users').where('name', 'Lady Leshurr').select('id')
        },
        {
          pet_id: knex('pets').where('name', 'King').select('id'),
          follower_id: knex('users').where('name', 'Jay Z').select('id')
        }
      ]);
    });
};
