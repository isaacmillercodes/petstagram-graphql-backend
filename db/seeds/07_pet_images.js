
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('pet_images').del()
    .then(function () {
      // Inserts seed entries
      return knex('pet_images').insert([
        {
          pet_id: knex('pets').where('name', 'Uncle Johnny').select('id'),
          image_id: knex('images').where('image_url', 'https://s-media-cache-ak0.pinimg.com/736x/a3/9e/41/a39e4144e994d626cf9068c0d9fd16ac.jpg').select('id')
        },
        {
          pet_id: knex('pets').where('name', 'Uncle Johnny').select('id'),
          image_id: knex('images').where('image_url', 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Mops-duke-mopszucht-vom-maegdebrunnen.jpg').select('id')
        },
        {
          pet_id: knex('pets').where('name', 'Uncle Johnny').select('id'),
          image_id: knex('images').where('image_url', 'http://moderndogmagazine.com/sites/default/files/images/uploads/Pug.jpg').select('id')
        },
        {
          pet_id: knex('pets').where('name', 'Mrs. Meowmers').select('id'),
          image_id: knex('images').where('image_url', 'http://www.catbreedslist.com/uploads/allimg/cat-pictures/Scottish-Fold-1.jpg').select('id')
        },
        {
          pet_id: knex('pets').where('name', 'Mrs. Meowmers').select('id'),
          image_id: knex('images').where('image_url', 'https://s-media-cache-ak0.pinimg.com/736x/09/0e/1a/090e1a865716e97ebb1f6c465c3f5aa6.jpg').select('id')
        },
        {
          pet_id: knex('pets').where('name', 'Rufus').select('id'),
          image_id: knex('images').where('image_url', 'http://americanbullydaily.com/wp-content/uploads/2016/01/Blue-Nose-Pit-bulls-Puppies.jpg').select('id')
        },
        {
          pet_id: knex('pets').where('name', 'Rufus').select('id'),
          image_id: knex('images').where('image_url', 'https://s-media-cache-ak0.pinimg.com/736x/20/ac/66/20ac6649d072cd0c667901f821d3d416.jpg').select('id')
        },
        {
          pet_id: knex('pets').where('name', 'Onyx').select('id'),
          image_id: knex('images').where('image_url', 'http://i.dailymail.co.uk/i/pix/2014/12/26/2443C74100000578-0-image-a-3_1419625438257.jpg').select('id')
        },
        {
          pet_id: knex('pets').where('name', 'Onyx').select('id'),
          image_id: knex('images').where('image_url', 'https://i.ytimg.com/vi/DGKIImy_eV4/maxresdefault.jpg').select('id')
        },
        {
          pet_id: knex('pets').where('name', 'Onyx').select('id'),
          image_id: knex('images').where('image_url', 'http://funnypicture.org/wallpaper/2015/04/funny-black-cat-pictures-32-background-wallpaper.jpg').select('id')
        },
        {
          pet_id: knex('pets').where('name', 'Nico').select('id'),
          image_id: knex('images').where('image_url', 'http://www.whitecockatoo.com/wp-content/uploads/2016/05/Sulphur-crested-coockatoo.jpg').select('id')
        },
        {
          pet_id: knex('pets').where('name', 'Nico').select('id'),
          image_id: knex('images').where('image_url', 'https://www.australiazoo.com.au/our-animals/amazing-animals/images/profile_167_600.jpg').select('id')
        },
        {
          pet_id: knex('pets').where('name', 'Franky').select('id'),
          image_id: knex('images').where('image_url', 'https://s-media-cache-ak0.pinimg.com/736x/d6/9c/eb/d69ceb2e02c9ffd10f51fb8242ee9b17.jpg').select('id')
        },
        {
          pet_id: knex('pets').where('name', 'Franky').select('id'),
          image_id: knex('images').where('image_url', 'https://s-media-cache-ak0.pinimg.com/736x/95/32/70/953270e918b81a29b7936aaf18a3638c.jpg').select('id')
        },
        {
          pet_id: knex('pets').where('name', 'Franky').select('id'),
          image_id: knex('images').where('image_url', 'http://mydoggy.rocks/wp-content/uploads/2015/02/Black-French-Bulldog-puppy.jpg').select('id')
        },
        {
          pet_id: knex('pets').where('name', 'Gary').select('id'),
          image_id: knex('images').where('image_url', 'https://s-media-cache-ak0.pinimg.com/736x/3c/23/79/3c2379eb1a0803220200003b016c8bea.jpg').select('id')
        },
        {
          pet_id: knex('pets').where('name', 'Gary').select('id'),
          image_id: knex('images').where('image_url', 'http://www.caribbeanpets.com/site/images/animals/reptiles/leopard_gecko/leopard_gecko_01L.jpg').select('id')
        },
        {
          pet_id: knex('pets').where('name', 'King').select('id'),
          image_id: knex('images').where('image_url', 'http://iheartdogs.com/wp-content/uploads/2017/01/DogueDeBordeaux.jpg').select('id')
        }
      ]);
    });
};
