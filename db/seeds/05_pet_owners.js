
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('pet_owners').del()
    .then(function () {
      // Inserts seed entries
      return knex('pet_owners').insert([
        {
          pet_id: knex('pets').where('name', 'Uncle Johnny').select('id'),
          owner_id: knex('users').where('name', 'Killer Mike').select('id')
        },
        {
          pet_id: knex('pets').where('name', 'Uncle Johnny').select('id'),
          owner_id: knex('users').where('name', 'El-P').select('id')
        },
        {
          pet_id: knex('pets').where('name', 'Mrs. Meowmers').select('id'),
          owner_id: knex('users').where('name', 'Killer Mike').select('id')
        },
        {
          pet_id: knex('pets').where('name', 'Mrs. Meowmers').select('id'),
          owner_id: knex('users').where('name', 'El-P').select('id')
        },
        {
          pet_id: knex('pets').where('name', 'Rufus').select('id'),
          owner_id: knex('users').where('name', 'Beyonce Knowles').select('id')
        },
        {
          pet_id: knex('pets').where('name', 'Rufus').select('id'),
          owner_id: knex('users').where('name', 'Jay Z').select('id')
        },
        {
          pet_id: knex('pets').where('name', 'Onyx').select('id'),
          owner_id: knex('users').where('name', 'Beyonce Knowles').select('id')
        },
        {
          pet_id: knex('pets').where('name', 'Onyx').select('id'),
          owner_id: knex('users').where('name', 'Jay Z').select('id')
        },
        {
          pet_id: knex('pets').where('name', 'Nico').select('id'),
          owner_id: knex('users').where('name', 'Beyonce Knowles').select('id')
        },
        {
          pet_id: knex('pets').where('name', 'Franky').select('id'),
          owner_id: knex('users').where('name', 'Childish Gambino').select('id')
        },
        {
          pet_id: knex('pets').where('name', 'Gary').select('id'),
          owner_id: knex('users').where('name', 'Lady Leshurr').select('id')
        },
        {
          pet_id: knex('pets').where('name', 'Kendrick Lamar').select('id'),
          owner_id: knex('users').where('name', 'King').select('id')
        }
      ]);
    });
};
