const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const app = express();

const db = require ('./config/database')



app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
  
});

app.get('/api/auth', (req, res) => {
  res.status(200).json({ status: 'ok' });
  
});


app.get('/api/contacts', (req, res) => {
  res.status(200).json({ status: 'ok' });
  
});



module.exports = app;