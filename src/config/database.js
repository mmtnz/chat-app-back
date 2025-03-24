import pkg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pkg; // Destructure Pool from default import
dotenv.config({ path: process.env.NODE_ENV === "test" ? ".env.test" : ".env" });

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: Number(process.env.POSTGRES_PORT),
});

pool.query('SELECT NOW()', (err, res) => {
    if (err) console.error('DB connection failed:', err);
    else console.log('Connected to DB at:', res.rows[0].now);
  });

export default pool;
