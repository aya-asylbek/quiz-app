import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pgPromise from 'pg-promise';
import fetch from 'node-fetch';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

//postgres

const db = pgPromise()(process.env.DATABASE_URL);
console.log('DATABASE_URL:', process.env.DATABASE_URL);


app.get('/', (req, res) => {
  res.send('Welcome to the Trivia Game API!');
});


// Add a new player
app.post('/api/players', async (req, res) => {
  try {
    const { name, score } = req.body;
    const result = await db.none('INSERT INTO players(name, score) VALUES($1, $2)', [name, score]);
    res.status(201).json({ message: 'Player created successfully' });
  } catch (error) {
    console.error('Error:', error.message); 
    res.status(500).json({ error: 'Failed to create player', details: error.message });  // Send more details to Postman so I can check error
  }
});


// Update player score
app.put('/api/players/:id', async (req, res) => {
  try {
    const { score } = req.body;
    const { id } = req.params;
    await db.none('UPDATE players SET score = $1 WHERE id = $2', [score, id]);
    res.status(200).json({ message: 'Player score updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update score' });
  }
});

// Delete a player
app.delete('/api/players/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.none('DELETE FROM players WHERE id = $1', [id]);
    res.status(200).json({ message: 'Player removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to remove player' });
  }
});

// leaderboard (top 10 players)
app.get('/api/players', async (req, res) => {
  try {
    const players = await db.any('SELECT * FROM players ORDER BY score DESC LIMIT 10');
    res.json(players);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// Fetch trivia questions from OpenTDB API - checked through Postman -working!
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

const PORT = 3000; 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



























//old code for game that i did in week 7
// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import fetch from 'node-fetch';

// dotenv.config();
// const app = express();
// app.use(cors());

// app.get('/api/questions', async (req, res) => {
//   try {
//     const { amount, category, difficulty, type } = req.query;
//     const apiUrl = new URL('https://opentdb.com/api.php');
    
//     apiUrl.searchParams.append('amount', amount || 10);
//     if (category) apiUrl.searchParams.append('category', category);
//     if (difficulty) apiUrl.searchParams.append('difficulty', difficulty);
//     if (type) apiUrl.searchParams.append('type', type);

//     const response = await fetch(apiUrl);
//     const data = await response.json();
    
//     res.json(data);
//   } catch (error) {
//     console.error('API Error:', error);
//     res.status(500).json({ error: 'Failed to fetch questions' });
//   }
// });

// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));