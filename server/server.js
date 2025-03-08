import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();
const app = express();
app.use(cors());

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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));