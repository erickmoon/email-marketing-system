// Import necessary modules
const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables

// Create a new Sequelize instance to connect to the database
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres', // Specify the database dialect as PostgreSQL
    port: process.env.DB_PORT,
    timezone: 'Africa/Nairobi', // Set time zone to Nairobi
});

// Export the Sequelize instance for use in other parts of the application
module.exports = sequelize;
