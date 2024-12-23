
const db=require("./src/models/index")
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./src/graphql/schema/schema.js');
const resolvers = require('./src/graphql/resolver/resolvers.js');
const { authenticate } = require('./src/middleware/auth');
const {connectDB} = require('./src/models/index.js');

//token for authentication
require('./genrateToken.js')
// env configuration
require('dotenv').config()

// db connection
connectDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    let user = null;
    try {
      user = authenticate(req);
    } catch (err) {
      console.error(err.message);
    }
    return { user };
  },
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
