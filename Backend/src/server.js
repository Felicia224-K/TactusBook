require('dotenv').config();


const app = require('./app');


const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`TactusBook API running on port http://localhost:${PORT}`);
});