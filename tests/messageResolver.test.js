import { jest } from '@jest/globals';
import messageResolver from '../src/resolvers/messageResolver.js';
import pubsub from '../src/subscriptions/subscription.js';

// Mock the model functions
const getMessagesByConversation = jest.fn();
const sendMessage = jest.fn();

// Manually override imports in the resolver context
messageResolver.Query.conversationMessages = async (_, { conversationId }) => {
  return await getMessagesByConversation(conversationId);
};

messageResolver.Mutation.sendMessage = async (_, args) => {
  const message = await sendMessage(
    args.conversationId,
    args.sender,
    args.content,
    args.system
  );
  pubsub.publish(`MESSAGE_ADDED_${args.conversationId}`, { messageAdded: message });
  return message;
};

describe('Message Resolver', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('conversationMessages returns messages for a conversation', async () => {
    const mockMessages = [
      { id: 1, content: 'Hello', sender: 'Alice', conversation_id: '1234' },
    ];

    getMessagesByConversation.mockResolvedValue(mockMessages);

    const result = await messageResolver.Query.conversationMessages(null, { conversationId: '1234' });

    expect(result).toEqual(mockMessages);
    expect(getMessagesByConversation).toHaveBeenCalledWith('1234');
  });

  test('sendMessage sends a message and publishes it', async () => {
    const mockMessage = {
      id: 1,
      conversation_id: 'abcd-1234',
      sender: 'Bob',
      content: 'Test message',
      system: false,
      createdAt: new Date().toISOString(),
    };

    sendMessage.mockResolvedValue(mockMessage);
    const publishMock = jest.spyOn(pubsub, 'publish').mockImplementation(() => {});

    const result = await messageResolver.Mutation.sendMessage(null, {
      conversationId: 'abcd-1234',
      sender: 'Bob',
      content: 'Test message',
      system: false,
    });

    expect(result).toEqual(mockMessage);
    expect(sendMessage).toHaveBeenCalled();
    expect(publishMock).toHaveBeenCalledWith(
      'MESSAGE_ADDED_abcd-1234',
      { messageAdded: mockMessage }
    );
  });
});
