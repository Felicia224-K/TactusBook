const express = require('express');
const cors = require('cors');

const app = express();

const db = require ('../src/config/database')

const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  console.log(`The status is running on: http://localhost:${PORT}/api/health`);
  res.status(200).json({ status: 'ok' });
  
});

module.exports = app;