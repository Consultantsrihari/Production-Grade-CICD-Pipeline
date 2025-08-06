// backend/src/index.js
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize the database on startup
db.initDb();

// Middleware
app.use(cors()); // Allow requests from our frontend
app.use(express.json()); // Parse JSON bodies

// --- API Routes ---

// Health Check
app.get('/health', (req, res) => {
    res.status(200).send('Backend is healthy!');
});

// Get all posts
app.get('/api/posts', async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM posts ORDER BY created_at DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new post
app.post('/api/posts', async (req, res) => {
    const { content } = req.body;
    if (!content) {
        return res.status(400).json({ error: 'Content cannot be empty' });
    }
    try {
        const { rows } = await db.query(
        'INSERT INTO posts (content) VALUES ($1) RETURNING *',
        [content]
        );
        res.status(201).json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Backend server is running on port ${PORT}`);
});
