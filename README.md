# Step Seven: Simple Auth

In this step, we'll be setting up simple authentication on our GraphQL server. We want to be able send a JWT to the front end any time a user logs in so that we can dynamically render components based on if the logged in user follows a pet, owns a pet, etc.

If you forked and cloned this repo, the `package.json` has been updated with `bcrypt`, `dotenv`, and `express-jwt`, so you can simply `npm i` from the project directory in your CLI to install these node modules.

Otherwise you'll want to run `npm i bcrypt dotenv express-jwt -S` to install these as dependencies.

Express-JWT uses a secret key to help ensure requests coming into our server are actually coming from our users. You'll need to create a `.env` file with one environment variable, SECRET_KEY. You can generate a string of random characters to use as a secret key at [Random.org](https://www.random.org/strings/)

In `server.js`, we now import `express-jwt` to use as middleware:

```js
app.use(jwt({
  secret: process.env.SECRET_KEY,
  credentialsRequired: false,
  getToken: (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } else {
      return null;
    }
  }
}));
```

`express-jwt` takes a configuration object. We'll assign our SECRET_KEY environment variable to the `secret` property and set `credentialsRequired` to false. If we wanted to protect any of our routes, we could choose to do so here. But for the purposes of we'll allow requests to come in from users without a token.

We then define `getToken` to tell `express-jwt` how to access the JWT we'll be passing back and forth using the `Bearer Token` convention.

Next, we'll want to define a LoginResponse type for GraphQL inside `/db/types/login_response.js`. Whenever a user tries to login, we'll attempt to send back a token, the user's `id`, and a message.

```js
const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} = graphql;

const LoginResponse = new GraphQLObjectType({
  name: 'LoginResponse',
  fields: () => {
    return {
      token: { type: GraphQLString },
      user_id: { type: GraphQLInt },
      message: { type: GraphQLString }
    };
  }
});

module.exports = LoginResponse;
```

Now we'll head to `/db/types/root_mutation_type.js` to create two new mutations: addNewUser and loginUser:

```js
addNewUser: {
  type: UserType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    profile_image_url: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve(parentValue, { name, email, password, profile_image_url }) {
    return db.addImage(profile_image_url)
    .then(newImage => {
      const hash = bcrypt.hashSync(password, salt);
      return db.addUser({ name, email, password: hash, profile_image_id: newImage[0].id })
      .then(newUser => {
        return newUser[0];
      });
    });
  }
}
```

When a user creates their account, we're requiring that they input a `name`, `email`, `password`, and `profile_image_url`.

Like we did for `addPetWithOwnerAndImage`, we'll first add the profile image to our `images` table and then use the new image `id` when we create our user.

We also want to follow the best practice of salting and hashing our passwords before storing them in the database. If we stored these in plain text and a hacker gained access to our data, they could easily attempt all of our users' email and password combinations on other sites.

We'll use bcrypt's `hashSync` method to encrypt our new user's password. On the front end, we could then call `loginUser` with the user meta data we just got back in the `addNewUser` response:

```js
loginUser: {
  type: LoginResponse,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve(parentValue, { email, password }) {
    return db.findUserByEmail(email)
    .then(foundUser => {
      const user = foundUser[0];
      let token;
      let user_id;
      let message;
      if (bcrypt.compareSync(password, user.password)) {
        token = jwt.sign({data: user}, process.env.SECRET_KEY, {
          expiresIn: '30 days'
        });
        user_id = user.id;
        message = 'Successfully logged in.';
      } else {
        token = '';
        user_id = -1;
        message = 'Incorrect email or password.';
      }

      return { token, user_id, message };

    }).catch(noUserFound => {
      return { token: '', user_id: -1, message: 'Incorrect email or password.' };
    });
  }
}
```

Here, we require the user to input both a password and an email address. Because we are salting and hashing our users' passwords instead of storing them in plain text, we'll use bcrypt's `compareSync` method to ensure the stored, encrypted password matches the user's encrypted input.

If it does, we'll use `express-jwt` to create a new token that expires in 30 days and let the client know the user has successfully logged in.

If the passwords don't match or if we are unable to find a user with the corresponding email address, we send back an empty string as a token and a `user_id` of -1.

Now that users can log in, we'll want to allow them to perform actions like following a pet and adding a user as a friend. Once you've had a chance to test the `addNewUser` and `loginUser` mutations, checkout to `step-8-meta-mutations` or head to the *step 8 instructions*
