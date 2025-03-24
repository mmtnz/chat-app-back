# Chat App Backend

This is the backend for a real-time message chat application, built using GraphQL with apollo-server-express and a PostgreSQL database running inside Docker. It provides APIs for sending, retrieving, and managing chat messages.

## 🚀 Features
- **Create Conversations**:
Start a new chat thread between users. 
- **Send Messages**:
Send messages within a conversation. Each message is stored in the PostgreSQL database.
- **Real-time Subscriptions**:
Subscribe to conversations and receive real-time updates when new messages are sent (powered by GraphQL Subscriptions).

## 🛠️ Tech Stack

- GraphQL (Apollo Server with Express)
- PostgreSQL (via Docker)
- Node.js
- Docker & Docker Compose

## Getting Started

### Prerequisites

- Node.js (>= 14.x)
- npm
- docker

### 1. Clone the repo
```bash
git clone https://github.com/mmtnz/chat-app-backend.git
cd chat-app-backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create .env file
Create a .env file in the root directory and define your environment variables:
```bash
POSTGRES_USER=chat_user
POSTGRES_PASSWORD=super_secure_password
POSTGRES_DB=chat_db
POSTGRES_PORT=5432 # or custom port
POSTGRES_HOST=127.0.0.1 # or ip where is the db will be running
```

### 4. Start PostgreSQL with Docker
```bash
docker-compose up -d
```

### 5. Start the server
```bash
node src/server.js
```

Server will be running at:
🔗 http://localhost:4000/graphql

You can test queries and mutations in Apollo Studio or any GraphQL client.

### 6. Launch the front end (Optional)
To have a user friendly GUI install the front end [Chat App Frontend](https://github.com/mmtnz/chat-app-front).

## 🎯 Project Purpose
This App was built for practicing:

- GraphQL API
- WebSockets
- PostgreSQL

## ⚖️ License
This project is licensed under the MIT License.

## Contributing
Pull requests are welcome! Feel free to open issues or suggest features.


## 📌 TODOs
- Add user authentication
- Have the option to delete chats (if authentication) or delete old ones