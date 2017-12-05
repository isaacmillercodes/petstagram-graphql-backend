# Step Nine: Image Mutations

Our final mutations for this project will center around our Image type. We want our users to be able to add profile images, add images of their pets, and like images of other people's pets.

In our root mutation inside `db/types/root_mutation_type.js`, we define both `addImage` and `addPetImage`:

```js
addImage: {
  type: ImageType,
  args: {
    image_url: { type: new GraphQLNonNull(GraphQLString) },
    caption: { type: GraphQLString },
  },
  resolve(parentValue, { image_url, caption }) {
    return db.addImage({ image_url, caption })
    .then(newImage => newImage[0]);
  }
},
addPetImage: {
  type: ImageType,
  args: {
    pet_id: { type: new GraphQLNonNull(GraphQLInt) },
    image_url: { type: new GraphQLNonNull(GraphQLString) },
    caption: { type: GraphQLString },
  },
  resolve(parentValue, { pet_id, image_url, caption }) {
    return db.addImage({ image_url, caption })
    .then(newImage => {
      return db.addPetImage(pet_id, newImage[0].id)
      .then(newPetImage => newImage[0]);
    });
  }
}
```

For both of these mutations, we require an `image_url` and also have an optional parameter of `caption`. When we add an image of a pet, we also want to associate the pet with the image, so we require the `pet_id` as well.

For `likeImage`, we could either return just the total number of likes or we return an Image type. In this case, I opted for an Image type, because then we can always query the new number of `likes` as well as any other Image field after sending the likeImage mutation.

```js
likeImage: {
  type: ImageType,
  args: {
    image_id: { type: new GraphQLNonNull(GraphQLInt) }
  },
  resolve(parentValue, { image_id }) {
    return db.likeImage(image_id)
    .then(updatedImage => updatedImage[0]);
  }
}
```

We now have all the mutations we need to build out a simple front end for Petstagram. If you'd like to continue on to my [front end GraphQL tutorial]()
