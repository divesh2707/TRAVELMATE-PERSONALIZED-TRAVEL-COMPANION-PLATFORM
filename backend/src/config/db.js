import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Use Render's database URL
    ssl: {
        rejectUnauthorized: false, // Required for Render PostgreSQL
    },
});

pool.on('connect', () => {
    console.log('Connected to the database');
});

export default pool;
