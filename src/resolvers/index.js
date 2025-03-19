import conversationResolver from './conversationResolver.js';
import messageResolver from './messageResolver.js';

const resolvers = {
    Query: {
        ...conversationResolver.Query,
        ...messageResolver.Query,
    },
    Mutation: {
        ...conversationResolver.Mutation,
        ...messageResolver.Mutation,
    },
    Subscription: {
        ...messageResolver.Subscription,
    },
};

export default resolvers;
