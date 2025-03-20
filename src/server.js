import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './schema/typeDefs.js';
import resolvers from './resolvers/index.js';
import cors from 'cors';
import { useServer } from 'graphql-ws/use/ws';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';


const app = express();

// Enable CORS
app.use(cors());

// Create GraphQL schema
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Create an HTTP server
const httpServer = createServer(app);

// Create WebSocket server for subscriptions
const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
});

// Use GraphQL WebSocket server
useServer({ schema }, wsServer);

const server = new ApolloServer({
    schema,
    context: ({ req }) => ({ req }),
    formatError: (err) => {
        console.error("GraphQL Error:", err);
        return err;
    },
});

await server.start();
server.applyMiddleware({ app });

const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    console.log(`📡 WebSocket listening on ws://localhost:${PORT}/graphql`);
});
