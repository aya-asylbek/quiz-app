# Trivia Quiz Game 🎮

A full-stack trivia game built with React (Vite), Node.js/Express, and PostgreSQL. Test your knowledge across various categories and compete on the leaderboard!

[![React](https://img.shields.io/badge/React-19.0-blue)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-green)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16+-blue)](https://www.postgresql.org/)

## Features ✨
- 🎯 10,000+ questions from [Open Trivia Database](https://opentdb.com/)
- 🏆 Real-time score tracking and leaderboard
- 🔧 Customizable game settings:
  - Number of questions (1-50)
  - Difficulty levels (Easy/Medium/Hard)
  - Question types (Multiple Choice/True-False)
  - 24+ categories
- 📊 Persistent player stats in PostgreSQL
- 🚀 Responsive UI with interactive elements


https://github.com/user-attachments/assets/20b5f7d7-7dd9-4b71-9ff2-e5a15187daf2


## Installation 🛠️

### Prerequisites
- Node.js v20+
- PostgreSQL v16+
- npm v9+



## Getting Started 🚦

### 1. Clone the Repository
```bash
git clone https://github.com/aya-asylbek/quiz-app
cd trivia-game

### Client Setup
```bash
cd client
npm install

Server Setup

cd server
npm install

Configuration ⚙️
Create .env file in /server:

DB_HOST=localhost
DB_USER=your_postgres_user
DB_PASSWORD=your_postgres_password
DB_NAME=trivia_game
DB_PORT=5432
PORT=3000


Database Setup 🗄️
Use pg_dump file 

psql -U your_username -d trivia_game -f trivia_game_dump.sql

Running the App 🚀
Start Client

cd client
npm run dev

Start Server

cd server
npm run dev


App will be available at: http://localhost:5173


Tech Stack 💻
Component	Technology
Frontend	React 19 + Vite
Backend	Node.js + Express
Database	PostgreSQL
Testing	Vitest + React Testing Library
Styling	CSS Modules
API Integration	Open Trivia DB API
Screenshots 📸
Game Setup
Gameplay
Leaderboard

Contributing 🤝
Contributions welcome! Please:

Fork the repository

Create your feature branch (git checkout -b feature/amazing-feature)

Commit your changes (git commit -m 'Add amazing feature')

Push to the branch (git push origin feature/amazing-feature)

Open a Pull Request

License 📄
MIT License - see LICENSE for details

