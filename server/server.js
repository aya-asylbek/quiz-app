import express from 'express';
import cors from 'cors';
import fakeData from './fakedata.js';

const app = express();
app.use(cors());

// Add root route
app.get('/', (req, res) => {
    res.send('Trivia API Server is running!');
});

// API endpoint
app.get('/api/questions', (req, res) => {
    res.json(fakeData); // Send the fakeData object directly
});


app.listen(5000, () => console.log('Server running on port 5000'));
