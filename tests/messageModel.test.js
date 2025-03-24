import pool from '../src/config/database.js';
import { createConversation } from '../src/models/conversationModel.js';
import { sendMessage, getMessagesByConversation } from '../src/models/messageModel.js';

describe('Message Model (Integration)', () => {
  let conversationId;

  beforeAll(async () => {
    await pool.query('DELETE FROM messages');
    await pool.query('DELETE FROM conversations');

    // ✅ Create a real conversation in the DB
    const conversation = await createConversation('Conversation for Message Tests');
    conversationId = conversation.id;
  });


  test('should send a message to the conversation', async () => {
    const message = await sendMessage(conversationId, 'Alice', 'Hello message', false);

    expect(message).toHaveProperty('id');
    expect(message.conversation_id).toBe(conversationId);
    expect(message.sender).toBe('Alice');
    expect(message.content).toBe('Hello message');
  });

  test('should fetch messages by conversation ID', async () => {
    const messages = await getMessagesByConversation(conversationId);

    expect(Array.isArray(messages)).toBe(true);
    expect(messages.length).toBeGreaterThan(0); // ✅ You sent at least one message above
    expect(messages[0].conversation_id).toBe(conversationId);
  });
});
