import pool from '../src/config/database.js';
import { jest } from '@jest/globals';

beforeAll(async () => {
    // Clean tables before starting
    await pool.query('DELETE FROM conversations');
    await pool.query('DELETE FROM messages');
});

afterAll(async () => {
    await pool.end();
});
