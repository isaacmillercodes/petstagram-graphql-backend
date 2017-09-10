
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          name: 'Killer Mike',
          email: 'killer@mike.com',
          password: '$2y$10$WVV3oepsUIhXe88a0QsNHek6Gn.5xnZJQHRQ4jf6WAu.YYGBgiWt.',
          profile_image_id: knex('images').where('image_url', 'http://media.npr.org/assets/img/2012/06/18/killermike3_wide-0ec13ecf1b337ec043db1a87755f704c69fe918d-s900-c85.jpg').select('id')
        },
        {
          name: 'El-P',
          email: 'elp@rtj.com',
          password: '$2y$10$X0Q5Y2/9xZWHP85Bjk1otODFXYCWFIBNA6kNDsTUslqBxhfKyoxj6',
          profile_image_id: knex('images').where('image_url', 'http://www.billboard.com/files/media/El-P-of-Run-the-Jewels-press-photo-2016-billboard-650.jpg').select('id')
        },
        {
          name: 'Jay Z',
          email: 'jay@z.com',
          password: '$2y$10$Ee1zoQAkyOtv7kCaDpEeSeRuqXe2C.D7mFvEMtjVbNyVHzmBWev1e',
          profile_image_id: knex('images').where('image_url', 'http://cdn4.thr.com/sites/default/files/2015/01/jay_z_h_2015.jpg').select('id')
        },
        {
          name: 'Beyonce Knowles',
          email: 'beyonce@knowles.com',
          password: '$2y$10$e4J96lx5kobnJqAeTkVKR.RiJgILcIBz0c9RCoWH5AXNPikr86.si',
          profile_image_id: knex('images').where('image_url', 'http://www.thefamouspeople.com/profiles/images/beyonce-knowles-4.jpg').select('id')
        },
        {
          name: 'Childish Gambino',
          email: 'donald@glover.com',
          password: '$2y$10$147PiKWVyJhpLH5SluX9EuDo5egi1dNZdB63rkmvKNEduF4fpol.C',
          profile_image_id: knex('images').where('image_url', 'http://www.xxlmag.com/files/2016/11/Childish-Gambino-new-album.jpg').select('id')
        },
        {
          name: 'Lady Leshurr',
          email: 'lady@leshurr.com',
          password: '$2y$10$FRsabL0m6X.HPZboymfPl.LwrjNDIpybptK8NpW/OIFe1OttkPSEO',
          profile_image_id: knex('images').where('image_url', 'http://ksassets.timeincuk.net/wp/uploads/sites/55/2016/08/2016_LadyLeshurr_1_ZMC_230816.hero_-1.jpg').select('id')
        },
        {
          name: 'Kendrick Lamar',
          email: 'kendrick@lamar.com',
          password: '$2y$10$4QGyiNtf9ZTwhnEctrO3Eef8F/S631eqnzWhk5zQrdqlXP5WA85kK',
          profile_image_id: knex('images').where('image_url', 'http://www.billboard.com/files/styles/article_main_image/public/media/Kendrick-Lamar-bw-march-2016-billboard-650.jpg').select('id')
        }
      ]);
    });
};
