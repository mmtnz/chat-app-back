import pool from '../config/database.js';

const toGraphQLMessage = (row) => ({
    id: row.id,
    conversationId: row.conversation_id,
    sender: row.sender,
    content: row.content,
    system: row.system,
    createdAt: row.created_at
});
  

export const getMessagesByConversation = async (conversationId) => {
    const res = await pool.query('SELECT * FROM messages WHERE conversation_id = $1 ORDER BY created_at ASC', [conversationId]);
    return res.rows.map(toGraphQLMessage);
};

export const sendMessage = async (conversationId, sender, content, system) => {
    const res = await pool.query(
        'INSERT INTO messages (conversation_id, sender, content, system) VALUES ($1, $2, $3, $4) RETURNING *',
        [conversationId, sender, content, system]
    );
    return toGraphQLMessage(res.rows[0]);
};
