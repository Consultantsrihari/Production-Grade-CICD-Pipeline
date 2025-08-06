// backend/src/db.js
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

const initDb = async () => {
    try {
        const createTableQuery = `
        CREATE TABLE IF NOT EXISTS posts (
            id SERIAL PRIMARY KEY,
            content TEXT NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
        `;
        await pool.query(createTableQuery);
        console.log('Database table "posts" is ready.');
    } catch (err) {
        console.error('Error initializing database:', err);
        // Exit the process if the DB can't be initialized
        process.exit(1); 
    }
};

module.exports = {
    query: (text, params) => pool.query(text, params),
    initDb
};