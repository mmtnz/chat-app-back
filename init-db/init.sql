-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create conversations table with UUID
CREATE TABLE IF NOT EXISTS conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Create messages table referencing conversations.id
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
    sender TEXT NOT NULL,
    system BOOL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
