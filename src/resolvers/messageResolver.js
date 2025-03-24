import { sendMessage, getMessagesByConversation } from '../models/messageModel.js';
import pubsub from '../subscriptions/subscription.js';

const MESSAGE_ADDED = 'MESSAGE_ADDED';


const messageResolver = {
    Query: {
        conversationMessages: async (_, { conversationId }) => {
            return await getMessagesByConversation(conversationId)
        },
    },
    Mutation: {
        sendMessage: async (_, { conversationId, sender, content, system }) => {
            const message = await sendMessage(conversationId, sender, content, system);

            // Publish to a specific conversation topic
            pubsub.publish(`${MESSAGE_ADDED}_${conversationId}`, { messageAdded: message });
            return message;
        },
    },
    Subscription: {
        messageAdded: {
            subscribe: (_, { conversationId }) => {
                console.log(`Subscribed to messages in conversation ${conversationId}`);
                return pubsub.asyncIterableIterator([`${MESSAGE_ADDED}_${conversationId}`]);
            }
        },
    },
};

export default messageResolver;
