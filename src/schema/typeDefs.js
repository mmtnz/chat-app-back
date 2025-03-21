import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Conversation {
    id: ID!
    name: String!
    messages: [Message!]!
  }

  type Message {
    id: ID!
    conversation_id: ID!
    sender: String!
    system: Boolean
    content: String!
    created_at: String!
  }

  type Query {
    conversations: [Conversation!]!
    conversation(id: ID!): Conversation
    conversationMessages(conversationId: ID!): [Message!]
  }

  type Mutation {
    createConversation(name: String!): Conversation!
    sendMessage(conversationId: ID!, sender: String!, content: String!, system: Boolean): Message!
  }

  type Subscription {
    messageAdded(conversationId: ID!): Message!
  }
`;

export default typeDefs;
