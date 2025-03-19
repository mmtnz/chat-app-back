import { sendMessage, getMessagesByConversation } from '../models/messageModel.js';
import pubsub from '../subscriptions/subscription.js';

const MESSAGE_ADDED = 'MESSAGE_ADDED';

const messageResolver = {
    Query: {
        conversationMessages: async (_, { conversation_id }) => await getMessagesByConversation(conversation_id),
    },
    Mutation: {
        sendMessage: async (_, { conversation_id, sender, content }) => {
            const message = await sendMessage(conversation_id, sender, content);
            pubsub.publish(MESSAGE_ADDED, { messageAdded: message });
            return message;
        },
    },
    Subscription: {
        messageAdded: {
        subscribe: (_, { conversation_id }) => pubsub.asyncIterator([MESSAGE_ADDED]),
        },
    },
};

export default messageResolver;
