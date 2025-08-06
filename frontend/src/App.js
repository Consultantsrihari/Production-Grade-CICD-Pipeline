// frontend/src/App.js
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [posts, setPosts] = useState([]);
    const [newPostContent, setNewPostContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchPosts = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
        // Note: The proxy in package.json handles forwarding this to http://localhost:5000
        const response = await axios.get('/api/posts');
        setPosts(response.data);
        } catch (err) {
        setError('Failed to fetch posts. Is the backend running?');
        console.error(err);
        } finally {
        setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newPostContent.trim()) return;

    try {
        await axios.post('/api/posts', { content: newPostContent });
        setNewPostContent('');
        fetchPosts(); // Re-fetch posts to show the new one
    } catch (err) {
        setError('Failed to create post.');
        console.error(err);
    }
    };

    return (
        <div className="App">
        <header className="App-header">
            <h1>Micro-Blog</h1>
            <p>Powered by React, Node.js, and a CI/CD Pipeline</p>
        </header>
        <main className="App-main">
            <form onSubmit={handleSubmit} className="post-form">
            <textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="What's on your mind?"
                rows="3"
                required
            />
            <button type="submit">Post</button>
            </form>

        {loading && <p>Loading posts...</p>}
        {error && <p className="error">{error}</p>}
        
        <div className="posts-container">
            <h2>Latest Posts</h2>
            {posts.map((post) => (
                <div key={post.id} className="post-card">
                <p>{post.content}</p>
                <small>Posted on: {new Date(post.created_at).toLocaleString()}</small>
                </div>
            ))}
        </div>
        </main>
    </div>
    );
}

export default App;