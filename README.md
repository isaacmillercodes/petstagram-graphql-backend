# Step Ten: Enabling CORS

Our final step before we begin working on the [front end for Petstagram](https://github.com/isaacmillercodes/petstagram-graphql-frontend) is to enable Cross-Origin Resource Sharing, or CORS.

Because modern browsers all enforce the same-origin policy, we need to allow domains outside of our server's domain to access our server's resources.

How you choose to enable CORS depends project by project. You might to only whitelist certain domains or you may want it enabled so any domain can access it during development if your server uses a machine name as its domain.

For this example, we'll enable CORS for any domain accessing `localhost:5000/graphql`, our GraphQL endpoint.

Install the `cors` node module with the command `npm i cors -S`.

Then import `cors` into `server.js` and add it to our GraphQL endpoint:

```js
const expressGraphQL = require('express-graphql');
const cors = require('cors');
const app = express();
// other imports and methods removed for space

app.use('/graphql', cors(), expressGraphQL({
  schema,
  graphiql: true
}));
```

And that's it! Now any domain can make requests to our GraphQL server.

If you'd like to learn more about GraphQL, you can find resources below, including a link to my meetup talk featuring this project.

* [My GraphQL/React/Apollo Tutorial](https://github.com/isaacmillercodes/petstagram-graphql-frontend)
* [Official GraphQL Docs](http://graphql.org/)
* [How To GraphQL](https://www.howtographql.com/)
* [Graph.Cool](https://www.graph.cool/)

[![Intro to GraphQL: The People's Query Language Video](https://i.imgur.com/EQ0BrgX.png)](http://www.youtube.com/watch?v=1sSizCGqcwY "Intro to GraphQL: The People's Query Language")
