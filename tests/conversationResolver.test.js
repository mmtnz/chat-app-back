import { createConversation } from '../src/models/conversationModel.js';
import pool from '../src/config/database.js';

describe("Conversation Resolvers", () => {
    afterAll(async () => {
        await pool.end();
    });

    test("should create a conversation", async () => {
        const name = "Test Chat";
        const conversation = await createConversation(name);

        expect(conversation).toHaveProperty("id");
        expect(conversation.name).toBe(name);
    });
});
