const knex = require('../knex');

const addPet = (petObject) => knex('pets').insert(petObject).returning('*');
const addUser = (userObject) => knex('users').insert(userObject).returning(['id', 'name', 'profile_image_id']);
const findUserByEmail = (email) => knex('users').where('email', email);
const friendRequest = (user_one, user_two) => knex('user_friends').insert({ user_one, user_two }).returning('*');
const updateFriendConnection = (user_one, user_two, status) => knex('user_friends').update({ user_one, user_two, status }).returning('*');
const addImage = (image_url) => knex('images').insert({ image_url }).returning('*');
const addOwner = (pet_id, owner_id) => knex('pet_owners').insert({ pet_id, owner_id });
const addFollower = (pet_id, follower_id) => knex('pet_followers').insert({ pet_id, follower_id }).returning('*');
const addPetImage = (pet_id, image_id) => knex('pet_images').insert({ pet_id, image_id });

module.exports = {
  addPet,
  addUser,
  findUserByEmail,
  friendRequest,
  updateFriendConnection,
  addImage,
  addOwner,
  addFollower,
  addPetImage
 };
