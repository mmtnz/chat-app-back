import pool from '../config/database.js';

export const getMessagesByConversation = async (conversation_id) => {
    const res = await pool.query('SELECT * FROM messages WHERE conversation_id = $1', [conversation_id]);
    return res.rows;
};

export const sendMessage = async (conversation_id, sender, content) => {
    const res = await pool.query(
        'INSERT INTO messages (conversation_id, sender, content) VALUES ($1, $2, $3) RETURNING *',
        [conversation_id, sender, content]
    );
    return res.rows[0];
};
