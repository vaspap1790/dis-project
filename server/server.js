import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';
import packets from './data/packets.js';

dotenv.config();

connectDB();

const app = express();

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.get('/api/packets', (req, res) => {
  res.json(packets);
});

app.get('/api/packets/:id', (req, res) => {
  const packet = packets.find((p) => p._id === req.params.id);
  res.json(packet);
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
