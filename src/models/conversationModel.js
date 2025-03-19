import pool from '../config/database.js';

export const getConversations = async () => {
    const res = await pool.query('SELECT * FROM conversations');
    return res.rows;
};

export const getConversationById = async (id) => {
     const res = await pool.query('SELECT * FROM conversations WHERE id = $1', [id]);
    return res.rows[0];
};

export const createConversation = async (name) => {
    const res = await pool.query(
        'INSERT INTO conversations (name) VALUES ($1) RETURNING id, name',
        [name]
    );
    return res.rows[0];
};
