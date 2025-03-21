import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './schema/typeDefs.js';
import resolvers from './resolvers/index.js';
import cors from 'cors';
import { useServer } from 'graphql-ws/use/ws';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import pubsub from './subscriptions/subscription.js';


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
useServer({
    schema,
    onConnect: async (ctx) => {
        // Store the connectionParams in ctx.extra so we can access them later
        const userName = ctx.connectionParams?.userName;
        const conversationId = ctx.connectionParams?.conversationId;
        ctx.extra.userName = userName;
        ctx.extra.conversationId = conversationId
        console.log(conversationId)
        console.log(ctx.connectionParams?.userName)
        if (userName && conversationId) {
            const displayName = userName.split('-')[0];
            console.log(`📢 Publishing to MESSAGE_ADDED_${conversationId}`);
            // pubsub.publish(`${MESSAGE_ADDED}_${conversationId}`, { messageAdded: message });
            pubsub.publish(`MESSAGE_ADDED_${conversationId}`, {
                messageAdded: {
                //   id: generateId(),
                    id: 0,
                    content: `${displayName} joined the chat`,
                    sender: "",
                    system: true,
                    conversationId,
                    created_at: 1,
                },
                // conversationId
            });
        }
    },
    onDisconnect: async (ctx, code, reason) => {
        const userName = ctx.connectionParams?.userName;
        const conversationId = ctx.connectionParams?.conversationId;
        console.log('entro')
        console.log(userName)
        // Send an info message
        if (userName && conversationId) {
            // Save message to DB or publish via pubsub
            const displayName = userName.split('-')[0];
            console.log(`${displayName} left the chat`);
            pubsub.publish(`MESSAGE_ADDED_${conversationId}`, {
                messageAdded: {
                    id: 0,
                    content: `${displayName} left the chat`,
                    sender: "",
                    system: true,
                    conversationId,
                    created_at: 1,
                },
                conversationId
            });
        }
      }
}, wsServer);

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
