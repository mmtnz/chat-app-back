import { jest } from '@jest/globals';
import conversationResolver from '../src/resolvers/conversationResolver.js';

// Mocked model functions
const getConversations = jest.fn();
const getConversationById = jest.fn();
const createConversation = jest.fn();

// Override resolver to use mocks
conversationResolver.Query.conversations = async () => {
  return await getConversations();
};

conversationResolver.Query.conversation = async (_, { id }) => {
  return await getConversationById(id);
};

conversationResolver.Mutation.createConversation = async (_, { name }) => {
  const conv = await createConversation(name);
  return { id: conv.id, name: conv.name };
};

describe('Conversation Resolver (Unit)', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('conversations returns all conversations', async () => {
    const mockData = [
      { id: '1', name: 'Chat 1' },
      { id: '2', name: 'Chat 2' },
    ];
    getConversations.mockResolvedValue(mockData);

    const result = await conversationResolver.Query.conversations();
    expect(result).toEqual(mockData);
    expect(getConversations).toHaveBeenCalled();
  });

  test('conversation returns a specific conversation', async () => {
    const mockData = { id: '1234', name: 'My Chat' };
    getConversationById.mockResolvedValue(mockData);

    const result = await conversationResolver.Query.conversation(null, { id: '1234' });
    expect(result).toEqual(mockData);
    expect(getConversationById).toHaveBeenCalledWith('1234');
  });

  test('createConversation creates and returns a conversation', async () => {
    const mockConv = { id: 'abcd', name: 'New Chat' };
    createConversation.mockResolvedValue(mockConv);

    const result = await conversationResolver.Mutation.createConversation(null, { name: 'New Chat' });
    expect(result).toEqual(mockConv);
    expect(createConversation).toHaveBeenCalledWith('New Chat');
  });
});
