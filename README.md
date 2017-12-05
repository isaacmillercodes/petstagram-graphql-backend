# Step Two: Creating a GraphQL Root Query and Object Type

In the last step, we got our project set up and referenced a placeholder GraphQL schema. In this step, we'll be filling out that schema with a *root query* that contains our first GraphQL *type*.

GraphQL is backed by its type system. One of the major benefits of using GraphQL is being able to customize your queries to only give you back the data that the client needs. This makes your back end more flexible as the client is able to shape the response data in its request.

Check out the [GraphQL Docs](http://graphql.org/learn/schema/#type-system) to learn more about its type system.

We need to create a GraphQL *schema* for our server. The schema is an object with one required property, *query*, and one optional property, *mutation*.

These are often referred to as the *root query* and *root mutation*. The root query will tell GraphQL how to read data from our database, while our root mutation will contain all the ways we can change our data.

We'll get into mutations later, but for now, we'll just look at creating a root query for our schema. Because the root query is responsible for returning data about all of our types, we will need to create our first GraphQL Object Type: users.

Inside `schema.js`, we begin by importing Knex and some types from GraphQL:

```js
const graphql = require('graphql');
const knex = require('./knex');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList
} = graphql;
```

Next, we'll want to define what properties a User has and how GraphQL can access them. We'll access id, name, and email directly from the users table in our database and use Knex to *resolve* a user's friends:

```js
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    friends: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return knex('user_friends').where('user_one', parentValue.id).orWhere('user_two', parentValue.id)
        .join('users', function() {
          this.on('user_friends.user_one', '=', 'users.id').orOn('user_friends.user_two', '=', 'users.id');
        }).then(results => {
          return results.filter(user => {
            return user.id !== parentValue.id && user.status === 'active';
          });
        });
      }
    }
    //will add fields for profile pic and pets in later step
  })
});
```

Every GraphQL Object Type has a name and what fields belong to that type. Typically we'll set fields to an anonymous function so that it gets invoked when we want to access an object's fields.

Id, Name, and Email are pretty straightforward and correspond with what data types will come back from the table. To find a user's friends, we'll need to *resolve* our data for GraphQL. The resolver function has two optional parameters, the parent element (in this case, the user we are currently accessing) and any arguments we want to have the client pass in (this is also represented as an object).

Friends are a list of users so we use Knex to go into our `user_friends` table and get all the associations for that user, then filter out any time our "parent" user is in the list or if that friend isn't active. This could allow us to give semantic meaning to other statuses in the future, like pending, blocked, etc.

We will resolve fields like profile picture and any pets our user follows or owns once we define our Image and Pet types.

Next, we'll create our root query and give it the ability to access a single user or all the users in our datbase:

```js
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return knex('users').then(results => results);
      }
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLInt} },
      resolve(parentValue, { id }) {
        return knex('users').where('id', id).then(results => results[0]);
      }
    }
  })
});
```

In our root query, we want to tell GraphQL how to resolve data for all of our parent types.

For all users, we use Knex to return every row from our `users` table. For a single user, we'll take `id` as an argument and just return the user with the corresponding id.

Finally, we'll export our GraphQL schema using our root query.  

```js
module.exports = new GraphQLSchema({
  query: RootQuery
});
```

With your server running (`nodemon` from the project directory in your command line), go to localhost:5000/graphql in your browser.

This will take you to Graph*i*QL.

![GraphiQL Screenshot](https://i.imgur.com/cUrRUue.png)

You can use the Documentation Explorer to look at the different types you can query. This will update every time you restart the server (which nodemon will do for you on any change) and refresh the browser.

Try these queries in the left pane. For the final query, you can pass in query variables in the by expanding the query variables pane.

All Users:
```js
{
  users {
    id
    name
  }
}
```

Single User:
```js
{
  user(id: 2) {
    id
    name
    email
    friends {
      name
    }
  }
}
```

or

```js
query SingleUser($id: Int){
  user(id: $id) {
    id
    name
    email
    friends {
      name
    }
  }
}
```

![Using Query Variables](https://i.imgur.com/y03dL5X.png)

Once you've had a chance to explore Graph*i*QL and make some test queries, checkout to step-3-pets or head to the [step three instructions](https://github.com/isaacmillercodes/petstagram-graphql-backend/tree/step-3-pets).
