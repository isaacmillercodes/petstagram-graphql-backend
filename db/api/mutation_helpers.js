const knex = require('../knex');

const addPet = (petObject) => knex('pets').insert(petObject).returning('*');
const addImage = (image_url) => knex('images').insert({ image_url }).returning('*');
const addOwner = (pet_id, owner_id) => knex('pet_owners').insert({ pet_id, owner_id });
const addFollower = (pet_id, follower_id) => knex('pet_followers').insert({ pet_id, follower_id });
const addPetImage = (pet_id, image_id) => knex('pet_images').insert({ pet_id, image_id });

module.exports = {
  addPet,
  addImage,
  addOwner,
  addFollower,
  addPetImage
};
