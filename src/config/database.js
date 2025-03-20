import pkg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pkg; // Destructure Pool from default import
dotenv.config({ path: process.env.NODE_ENV === "test" ? ".env.test" : ".env" });

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

export default pool;
