
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('images').del()
    .then(function () {
      // Inserts seed entries
      return knex('images').insert([
        //user profile images
        {
          image_url: 'http://media.npr.org/assets/img/2012/06/18/killermike3_wide-0ec13ecf1b337ec043db1a87755f704c69fe918d-s900-c85.jpg',
          caption: 'Chilling at NPR today'
        },
        {
          image_url: 'http://www.billboard.com/files/media/El-P-of-Run-the-Jewels-press-photo-2016-billboard-650.jpg',
          caption: 'My favorite beanie'
        },
        {
          image_url: 'http://cdn4.thr.com/sites/default/files/2015/01/jay_z_h_2015.jpg',
          caption: `TFW You the world's greatest`
        },
        {
          image_url: 'http://www.thefamouspeople.com/profiles/images/beyonce-knowles-4.jpg',
          caption: 'About to make some lemonade'
        },
        {
          image_url: 'http://www.xxlmag.com/files/2016/11/Childish-Gambino-new-album.jpg',
          caption: 'Things are looking up for this kid from Stone Mountain'
        },
        {
          image_url: 'http://ksassets.timeincuk.net/wp/uploads/sites/55/2016/08/2016_LadyLeshurr_1_ZMC_230816.hero_-1.jpg',
          caption: `Working hard on Queen's Speech 7!`
        },
        {
          image_url: 'http://www.billboard.com/files/styles/article_main_image/public/media/Kendrick-Lamar-bw-march-2016-billboard-650.jpg',
          caption: 'TFW Eminem thinks you have a ghost writer and you prove him wrong'
        },
        //pet images
        //RTJ pug
        {
          image_url: 'https://s-media-cache-ak0.pinimg.com/736x/a3/9e/41/a39e4144e994d626cf9068c0d9fd16ac.jpg',
          caption: 'The face he makes every time he sees food',
          likes: 28
        },
        {
          image_url: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Mops-duke-mopszucht-vom-maegdebrunnen.jpg',
          caption: `He walks around with a chain too`,
          likes: 102
        },
        {
          image_url: 'http://moderndogmagazine.com/sites/default/files/images/uploads/Pug.jpg',
          caption: `Grumpy all day every day`,
          likes: 172
        },
        //RTJ cat
        {
          image_url: 'http://www.catbreedslist.com/uploads/allimg/cat-pictures/Scottish-Fold-1.jpg',
          caption: 'Back when she was just a kitty',
          likes: 39
        },
        {
          image_url: 'https://s-media-cache-ak0.pinimg.com/736x/09/0e/1a/090e1a865716e97ebb1f6c465c3f5aa6.jpg',
          caption: 'Caught in deep thought',
          likes: 73
        },
        //Bey-Z dog
        {
          image_url: 'http://americanbullydaily.com/wp-content/uploads/2016/01/Blue-Nose-Pit-bulls-Puppies.jpg',
          caption: 'Can I stay outside for 5 more minutes?',
          likes: 104
        },
        {
          image_url: 'https://s-media-cache-ak0.pinimg.com/736x/20/ac/66/20ac6649d072cd0c667901f821d3d416.jpg',
          caption: 'How could you say no to this face?!?',
          likes: 86
        },
        //Bey-Z cat
        {
          image_url: 'http://i.dailymail.co.uk/i/pix/2014/12/26/2443C74100000578-0-image-a-3_1419625438257.jpg',
          caption: 'Getting money like mom and dad taught me',
          likes: 201
        },
        {
          image_url: 'https://i.ytimg.com/vi/DGKIImy_eV4/maxresdefault.jpg',
          caption: 'Not sure how to feel about this bandana',
          likes: 184
        },
        {
          image_url: 'http://funnypicture.org/wallpaper/2015/04/funny-black-cat-pictures-32-background-wallpaper.jpg',
          caption: 'Being goofy as always',
          likes: 220
        },
        //Bey bird
        {
          image_url: 'http://www.whitecockatoo.com/wp-content/uploads/2016/05/Sulphur-crested-coockatoo.jpg',
          caption: 'Getting ready to hit go out like',
          likes: 148
        },
        {
          image_url: 'https://www.australiazoo.com.au/our-animals/amazing-animals/images/profile_167_600.jpg',
          caption: 'Hello from Nico!',
          likes: 102
        },
        //Gambino dog
        {
          image_url: 'https://s-media-cache-ak0.pinimg.com/736x/d6/9c/eb/d69ceb2e02c9ffd10f51fb8242ee9b17.jpg',
          caption: 'Just got this little dude!',
          likes: 202
        },
        {
          image_url: 'https://s-media-cache-ak0.pinimg.com/736x/95/32/70/953270e918b81a29b7936aaf18a3638c.jpg',
          caption: 'He never goes anywhere without his ghost buddy',
          likes: 154
        },
        {
          image_url: 'http://mydoggy.rocks/wp-content/uploads/2015/02/Black-French-Bulldog-puppy.jpg',
          caption: 'What are you looking at?',
          likes: 172
        },
        //Lady Leshurr leopard gecko
        {
          image_url: 'https://s-media-cache-ak0.pinimg.com/736x/3c/23/79/3c2379eb1a0803220200003b016c8bea.jpg',
          caption: 'When Gary makes this face though...',
          likes: 121
        },
        {
          image_url: 'http://www.caribbeanpets.com/site/images/animals/reptiles/leopard_gecko/leopard_gecko_01L.jpg',
          caption: 'Waiting for some crickets',
          likes: 83
        },
        //Kendrick dog
        {
          image_url: 'http://iheartdogs.com/wp-content/uploads/2017/01/DogueDeBordeaux.jpg',
          caption: 'Giving that side eye',
          likes: 238
        }
      ]);
    });
};
