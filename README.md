# Step Seven: Simple Auth

In this step, we'll be setting up simple authentication on our GraphQL server. We want to be able send a JWT to the front end any time a user logs in so that we can dynamically render components based on if the logged in user follows a pet, owns a pet, etc.

If you forked and cloned this repo, the `package.json` has been updated with `bcrypt`, `dotenv`, and `jsonwebtoken`, so you can simply `npm i` from the project directory in your CLI to install these node modules.

Otherwise you'll want to run `npm i bcrypt dotenv jsonwebtoken -S` to install these as dependencies.
