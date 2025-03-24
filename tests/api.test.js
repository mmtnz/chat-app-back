import request from "supertest";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "../src/schema/typeDefs.js";
import resolvers from "../src/resolvers/index.js";
import express from "express";
import { jest } from '@jest/globals';

let server, app;

beforeAll(async () => {
    app = express();
    server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    server.applyMiddleware({ app });
});

afterAll(async () => {
    await server.stop();
});

test("Fetch all conversations", async () => {
    const res = await request(app)
        .post("/graphql")
        .send({
            query: `query { conversations { id name } }`
        });

    expect(res.body).toHaveProperty("data");
    expect(res.body.data.conversations).toBeInstanceOf(Array);
});
