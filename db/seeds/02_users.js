
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          name: 'Killer Mike',
          email: 'killer@mike.com',
          password: '$2a$06$gc1h43I03NymxhevlQKTPuK337W5GsDdflIEjwbd2DW8WxL021MdW',
          profile_image_id: knex('images').where('image_url', 'http://media.npr.org/assets/img/2012/06/18/killermike3_wide-0ec13ecf1b337ec043db1a87755f704c69fe918d-s900-c85.jpg').select('id')
        },
        {
          name: 'El-P',
          email: 'elp@rtj.com',
          password: '$2a$06$cs6vN4MPArTggSBBnnob.OEREV.O01h15xUpqWA1N5ecF5TzVPuh2',
          profile_image_id: knex('images').where('image_url', 'http://www.billboard.com/files/media/El-P-of-Run-the-Jewels-press-photo-2016-billboard-650.jpg').select('id')
        },
        {
          name: 'Jay Z',
          email: 'jay@z.com',
          password: '$2a$06$9y/a8b6Vr2r.2LnPsvsbyeYlr9PUfhdYPDd6S6/0vEKDHotK.5Idi',
          profile_image_id: knex('images').where('image_url', 'http://cdn4.thr.com/sites/default/files/2015/01/jay_z_h_2015.jpg').select('id')
        },
        {
          name: 'Beyonce Knowles',
          email: 'beyonce@knowles.com',
          password: '$2a$06$ABuQYBuEb41gIysVSaRFDeuoG87Wyv1HGpj5U/utEp5b0p8lXvgZ2',
          profile_image_id: knex('images').where('image_url', 'http://www.thefamouspeople.com/profiles/images/beyonce-knowles-4.jpg').select('id')
        },
        {
          name: 'Childish Gambino',
          email: 'donald@glover.com',
          password: '$2a$06$7JZCq7tCaI33Zq6oaQxgT.4W8obLAQB259QriPOJNgh.uSKL349V2',
          profile_image_id: knex('images').where('image_url', 'http://www.xxlmag.com/files/2016/11/Childish-Gambino-new-album.jpg').select('id')
        },
        {
          name: 'Lady Leshurr',
          email: 'lady@leshurr.com',
          password: '$2a$06$JoomBceS1ptEGf2VP1c1C.YObblLQEU46hgg2JoQ442CdBjtCEGhG',
          profile_image_id: knex('images').where('image_url', 'http://ksassets.timeincuk.net/wp/uploads/sites/55/2016/08/2016_LadyLeshurr_1_ZMC_230816.hero_-1.jpg').select('id')
        },
        {
          name: 'Kendrick Lamar',
          email: 'kendrick@lamar.com',
          password: '$2a$06$MhX5TpLcOjwbeAo5LbfAh.sawwj3tl8u5YwaSfiCbPXFusmUHc.wm',
          profile_image_id: knex('images').where('image_url', 'http://www.billboard.com/files/styles/article_main_image/public/media/Kendrick-Lamar-bw-march-2016-billboard-650.jpg').select('id')
        }
      ]);
    });
};
