import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import pg from 'pg';

dotenv.config();
const app = express();
const { Pool } = pg;

// Database connection
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

app.use(cors());
app.use(express.json());

// Fetching questions from opentdb website
app.get('/api/questions', async (req, res) => {
  try {
    const { amount, category, difficulty, type } = req.query;
    const apiUrl = new URL('https://opentdb.com/api.php');
    
    apiUrl.searchParams.append('amount', amount || 10);
    if (category) apiUrl.searchParams.append('category', category);
    if (difficulty) apiUrl.searchParams.append('difficulty', difficulty);
    if (type) apiUrl.searchParams.append('type', type);

    const response = await fetch(apiUrl);
    const data = await response.json();
    
    res.json(data);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});

// Fetch all players
app.get('/api/players', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM players');
    res.json(rows);
  } catch (error) {
    console.error('DB Error:', error);
    res.status(500).json({ error: 'Failed to fetch players' });
  }
});

// Fetch a player by id 
app.get('/api/players/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT * FROM players WHERE id = $1', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Player not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('DB Error:', error);
    res.status(500).json({ error: 'Failed to fetch player' });
  }
});

// Add new player
app.post('/api/players', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ error: "Player name is required" });
    }

    const { rows } = await pool.query(
      'INSERT INTO players (name, score) VALUES ($1, 0) RETURNING *',
      [name.trim()]
    );
    res.json(rows[0]);
  } catch (error) {
    console.error('DB Error:', error);
    res.status(500).json({ error: 'Player creation failed' });
  }
});

// Update player score
app.put('/api/players/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { score } = req.body;
    
    const { rows } = await pool.query(
      'UPDATE players SET score = $1 WHERE id = $2 RETURNING *',
      [score, id]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Player not found' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('DB Error:', error);
    res.status(500).json({ error: 'Score update failed' });
  }
});

// Delete player
app.delete('/api/players/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rowCount } = await pool.query('DELETE FROM players WHERE id = $1', [id]);

    if (rowCount === 0) {
      return res.status(404).json({ error: 'Player not found' });
    }

    res.json({ message: 'Player deleted successfully' });
  } catch (error) {
    console.error('DB Error:', error);
    res.status(500).json({ error: 'Failed to delete player' });
  }
});

// Get leaderboard
app.get('/api/leaderboard', async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT 
        id, 
        name, 
        score, 
        ROW_NUMBER() OVER (ORDER BY score DESC) AS rank
      FROM 
        players
      ORDER BY 
        score DESC
      LIMIT 10`
    );
    res.json(rows);
  } catch (error) {
    console.error('DB Error:', error);
    res.status(500).json({ error: 'Leaderboard fetch failed' });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Connected to database: ${process.env.DB_NAME}`);
});





