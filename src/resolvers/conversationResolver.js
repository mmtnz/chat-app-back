import { getConversations, getConversationById, createConversation } from '../models/conversationModel.js';

const conversationResolver = {
    Query: {
        conversations: async () => await getConversations(),
        conversation: async (_, { id }) => await getConversationById(id),
    },
    Mutation: {
        createConversation: async (_, { name }) => {
            const conversation = await createConversation(name);
            return {
                id: conversation.id,
                name: conversation.name,
            };
        }
    },
};

export default conversationResolver;
