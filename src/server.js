import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './schema/typeDefs.js';
import resolvers from './resolvers/index.js';
import cors from 'cors';

const app = express();

// Enable CORS
app.use(cors());

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

await server.start();
server.applyMiddleware({ app });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
});
