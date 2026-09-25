const { Sequelize } = require('sequelize');
require('dotenv').config(); 

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    console.error("CRITICAL: DATABASE_URL variable is completely missing!");
}


const sequelize = new Sequelize(
    databaseUrl, {
        dialect: 'postgres',
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
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
