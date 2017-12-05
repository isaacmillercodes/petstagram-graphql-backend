# Step Five: Add Pet Mutation

In the last step, we completed our queries for images, pets, and users. Now we want the ability to add a pet to our database, so we'll create our first mutation.

In `schema.js`, I've add the mutation key to our schema and set it to our root mutation from `db/types/root_mutation_type.js`.

```js
const graphql = require('graphql');
const { GraphQLSchema } = graphql;
const RootQuery = require('./types/root_query_type');
const RootMutation = require('./types/root_mutation_type');

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});
```

I also added a new folder and file, `/db/api/mutation_helpers.js`. This will contain helper functions using Knex so that we can get some separation of concerns from GraphQL and our database.

```js
const knex = require('../knex');

const addPet = (petObject) => knex('pets').insert(petObject).returning('*');

module.exports = { addPet };
```

Syntactically, our root mutation won't look too different from our root query. It has `name` and `fields` properties as well as types with resolver functions. However, we now have `args` inside of `fields` to define what data we need from the client to complete this mutation.

```js
const RootMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addPet: {
      type: PetType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        species: { type: GraphQLString },
        breed: { type: GraphQLString },
        age: { type: GraphQLFloat }
      },
      resolve(parentValue, args) {
        return db.addPet(args)
        .then(newPet => newPet[0]);
      }
    }
  })
});
```

We require the client to provide the new pet's name, but species, breed, and age are optional fields.

Let's add a new pet, Sparky the Goldfish, with this mutation:

```js
mutation AddPet {
  addPet(
    name: "Sparky"
    species: "Fish"
    breed: "Goldfish"
    age: 0.5
  ) {
    id
    name
    species
    breed
    age
  }
}
```

If you're using Graph*i*QL, you should see a response like this:

![Add Pet Response](https://i.imgur.com/aRqQmDr.png)

Unlike queries, mutations execute *serially*. If we want to create two pets at once, the first pet will need to be created before we can kick off the mutation for the second pet.

When performing mutations like this, it can be helpful to alias each mutation. In the example below, we'll add two dogs, Lucille and Barry, and give them corresponding aliases.

```js
mutation AddPet {
  addLucille: addPet(
    name: "Lucille"
    species: "Dog"
    breed: "Black Labrador"
    age: 10
  ) {
    id
    name
    species
    breed
    age
  }
  addBarry: addPet(
    name: "Barry"
    species: "Dog"
    breed: "Boston Terrier"
    age: 12
  ) {
    id
    name
    breed
    species
    breed
    age
  }
}
```

In Graph*i*QL, you'll see the aliases as keys in your response data:

![Add Two Pets Mutation](https://i.imgur.com/a4bxgbh.png)

This is useful for the front end to be able to keep the response data organized and explicit for other developers working on the project. Since GraphQL allows us to make many queries and mutations at once, aliases are a good way to keep your code clean and manageable.

We'll see this more in our next step as we create a new mutation to add a pet with their owner and profile image. Check out to `step-6-relational-mutation` or go to the [step six instructions](https://github.com/isaacmillercodes/petstagram-graphql-backend/tree/step-6-relational-mutation).
