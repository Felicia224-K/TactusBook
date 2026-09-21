const express = require('express');
const cors = require('cors');

const app = express();

const db = require ('../src/config/database')

const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/api/auth', require('../src/routes/auth'));
app.use('/api/contacts', require('../src/routes/contacts'));

app.get('/api/health', (req, res) => {
  console.log(`The status is running on: http://localhost:${PORT}/api/health`);
  res.status(200).json({ status: 'ok' });
  
});

app.get('/api/auth', (req, res) => {
  console.log(`The status is running on: http://localhost:${PORT}/api/auth`);
  res.status(200).json({ status: 'ok' });
  
});


app.get('/api/contacts', (req, res) => {
  console.log(`The status is running on: http://localhost:${PORT}/api/contacts`);
  res.status(200).json({ status: 'ok' });
  
});



module.exports = app;