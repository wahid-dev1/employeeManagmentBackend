const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const { graphqlUploadExpress } = require('graphql-upload');
const typeDefs = require('./src/graphql/schema/schema');
const resolvers = require('./src/graphql/resolver/resolvers');
const { connectDB } = require('./src/models/index');
const { authenticate } = require('./src/middleware/auth');
require('dotenv').config();

connectDB();

const app = express();
app.use(graphqlUploadExpress({ maxFileSize: 100000000000000, maxFiles: 10 }));

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

server.start().then(() => {
  server.applyMiddleware({ app });
  app.listen({ port: 4000 }, () => {
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
  });
});
