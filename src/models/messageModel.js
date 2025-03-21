import pool from '../config/database.js';

export const getMessagesByConversation = async (conversationId) => {
    const res = await pool.query('SELECT * FROM messages WHERE conversation_id = $1 ORDER BY created_at ASC', [conversationId]);
    return res.rows;
};

export const sendMessage = async (conversationId, sender, content, system) => {
    const res = await pool.query(
        'INSERT INTO messages (conversation_id, sender, content, system) VALUES ($1, $2, $3, $4) RETURNING *',
        [conversationId, sender, content, system]
    );
    return res.rows[0];
};
