import { createConversation,  getConversationById, getConversations } from '../src/models/conversationModel.js';
import pool from '../src/config/database.js';
import { jest } from '@jest/globals';

describe("Conversation Resolvers", () => {
    
    let createdConversation;

    afterEach(() => {
        jest.clearAllMocks();
    });
    
    // afterAll(async () => {
    //     await pool.end();
    // });

    test("should create a conversation", async () => {
        const name = "Test Chat";
        try {
            const conversation = await createConversation(name);
            expect(conversation).toHaveProperty("id");
            expect(conversation.name).toBe(name);
        } catch (err) {
            console.error("Test failed:", err);
            throw err;
        }
    });

    test("should get conversation by id", async () => {
        
        const name = "Test Chat";
        try {
            createdConversation = await createConversation(name);
        
            const fetched = await getConversationById(createdConversation.id);
            expect(fetched).not.toBeNull();
            expect(fetched.id).toBe(createdConversation.id);
            expect(fetched.name).toBe(name);
        } catch (err) {
            console.error("Test failed:", err);
            throw err;
        }
    });

    test("should get all conversations", async () => {
        const name = "Test Chat";
        try {
            createdConversation = await createConversation(name);
        
            const conversations = await getConversations();
            expect(Array.isArray(conversations)).toBe(true);
            const match = conversations.find((c) => c.id === createdConversation.id);
            expect(match).toBeDefined();
            expect(match.name).toBe(name);
        } catch (err) {
            console.error("Test failed:", err);
            throw err;
        }
    });


});
