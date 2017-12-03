# Step 1 - Project Set Up and Placeholder Schema

**Quick Disclaimer:**

*This tutorial is intended to focus on GraphQL and assumes you have some familiarity with Node.js, Express, and working with databases (we'll be using PostgreSQL and Knex.js). If you're just starting with Node and Express, you may want to begin with the [Mozilla Developer Network's Introduction to Node and Express](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction)*

Before we begin, let's briefly look at what we will be building: the back end for an app called Petstagram.

While we want our app to focus on pictures of pets, until animals learn how to use the internet, we will need to associate human users to pets and their images.

The ERD for this project looks like this:

![Petstagram ERD](https://i.imgur.com/E9rHxzn.png)

So we have three primary resources:
* Users
* Pets
* Images

We will also have four *many to many* associations with those resources:

* Users are associated with other users as friends, helping them to find pets to follow through the people they know in real life.
* Users can relate to pets as followers, so that users can see when the pets they like post new images.
* Users can relate to pets as owners, so that multiple user owners could upload images of their pets.
* Pets and images share a *many to many* relationship so that multiple pets could be tagged in the same image. Users have a one to many relationship with images, as users can only upload images of themselves to be used as profile pictures.

To start this project, I have already included migration and seed files using Knex.js in the `db` folder. I have also configured Knex and Express so that you can begin with a seeded database and a simple server.

You will need Node.js and Postgres installed on your machine. You can check your versions of each by running `node -v` and `psql -v` from the command line.

Here are installation instructions for [Node](https://nodejs.org/en/download/) and [PostgreSQL](https://www.postgresql.org/download/)

I like to use [Homebrew](https://brew.sh/) for these installations. If you have Homebrew, you can just run: `brew install node` and `brew install postgresql`.

Once your environment is set up, run these commands in your CLI:

1. `createdeb petstagram`
1. `npm i` or if you prefer, `npm install`
1. `knex migrate:latest`
1. `knex seed:run`
1. `nodemon`

If everything ran correctly, you should now have an Express server running on localhost:5000.

Using curl, httpie, or your browser, you can send a GET request to `localhost:5000/pets` and see the pets we currently have in our database.

Inside `server.js`, you'll see our sanity check route with our GraphQL configuration:

```js
app.use('/pets', (req, res) => {
  knex('pets').then(results => {res.send(results);});
});

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));
```

One of the major benefits of GraphQL is that your client can make all of its requests to just *one* endpoint.

Here, we've told Express to use the Express-GraphQL middleware on every request that comes into `/graphql`.

The middleware takes an object with two keys: schema and graphiql.

Graph*i*QL is an in-browser IDE where you can test your queries and view your resources via GraphQL's self-documentation. It's a very useful tool in development, though some people prefer to turn it off for production.

Our schema is where we will define our *Root Query* which will contain all the ways we can access our types.

If you have a running Express server and you see pet objects coming back from our `/pets` endpoint, checkout to branch `step-2-root-query` or view the step 2 instructions **here**.
