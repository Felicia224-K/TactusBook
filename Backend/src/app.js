const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const app = express();

const db = require ('../src/config/database')

const PORT =process.env.PORT || 5000;

app.use(cors( {
  origin: [

    'http://localhost:5173',
    'http://localhost:3000'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [ 'Content-Type', 'Authorization'],
  credentials: true
}));


app.use(express.json());

app.use('/api/auth', require('../src/routes/auth'));
app.use('/api/contacts', require('../src/routes/contacts'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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