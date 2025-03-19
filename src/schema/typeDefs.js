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
    content: String!
    created_at: String!
  }

  type Query {
    conversations: [Conversation!]!
    conversation(id: ID!): Conversation
    conversationMessages(conversation_id: ID!): [Message!]
  }

  type Mutation {
    createConversation(name: String!): Conversation!
    sendMessage(conversation_id: ID!, sender: String!, content: String!): Message!
  }

  type Subscription {
    messageAdded(conversation_id: ID!): Message!
  }
`;

export default typeDefs;
