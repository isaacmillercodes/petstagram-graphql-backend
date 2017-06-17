
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('pets').del()
    .then(function () {
      // Inserts seed entries
      return knex('pets').insert([
        {
          name: 'Uncle Johnny',
          species: 'Dog',
          breed: 'Pug',
          age: 1,
          profile_image_id: knex('images').where('image_url', 'https://s-media-cache-ak0.pinimg.com/736x/a3/9e/41/a39e4144e994d626cf9068c0d9fd16ac.jpg').select('id')
        },
        {
          name: 'Mrs. Meowmers',
          species: 'Cat',
          breed: 'Scottish Fold',
          age: 2,
          profile_image_id: knex('images').where('image_url', 'http://www.catbreedslist.com/uploads/allimg/cat-pictures/Scottish-Fold-1.jpg').select('id')
        },
        {
          name: 'Rufus',
          species: 'Dog',
          breed: 'Pit Bull',
          age: 1,
          profile_image_id: knex('images').where('image_url', 'http://americanbullydaily.com/wp-content/uploads/2016/01/Blue-Nose-Pit-bulls-Puppies.jpg').select('id')
        },
        {
          name: 'Onyx',
          species: 'Cat',
          breed: 'Black Shorthair',
          age: 3,
          profile_image_id: knex('images').where('image_url', 'http://i.dailymail.co.uk/i/pix/2014/12/26/2443C74100000578-0-image-a-3_1419625438257.jpg').select('id')
        },
        {
          name: 'Nico',
          species: 'Bird',
          breed: 'Cockatoo',
          age: 6,
          profile_image_id: knex('images').where('image_url', 'http://www.whitecockatoo.com/wp-content/uploads/2016/05/Sulphur-crested-coockatoo.jpg').select('id')
        },
        {
          name: 'Franky',
          species: 'Dog',
          breed: 'French Bulldog',
          age: 0.5,
          profile_image_id: knex('images').where('image_url', 'https://s-media-cache-ak0.pinimg.com/736x/d6/9c/eb/d69ceb2e02c9ffd10f51fb8242ee9b17.jpg').select('id')
        },
        {
          name: 'Gary',
          species: 'Lizard',
          breed: 'Leopard Gecko',
          age: 1.5,
          profile_image_id: knex('images').where('image_url', 'https://s-media-cache-ak0.pinimg.com/736x/3c/23/79/3c2379eb1a0803220200003b016c8bea.jpg').select('id')
        },
        {
          name: 'King',
          species: 'Dog',
          breed: 'Dogue De Bordeaux',
          age: 5,
          profile_image_id: knex('images').where('image_url', 'http://iheartdogs.com/wp-content/uploads/2017/01/DogueDeBordeaux.jpg').select('id')
        }
      ]);
    });
};
