const { Sequelize } = require('sequelize');
require('dotenv').config(); 

// 1. Initialize the Sequelize connection pool
const sequelize = new Sequelize(
    process.env.DATABASE_URL, {
        dialect: 'postgres',
        logging: console.log 
    }
);

// 2. Test the connection instantly when the app starts
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Executing (default): SELECT 1+1 AS result');
        console.log('PostgreSQL connection established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

testConnection();

module.exports = sequelize;
