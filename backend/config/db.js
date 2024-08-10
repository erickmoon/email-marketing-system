// Import necessary modules
const { Sequelize } = require('sequelize');

// Create a new Sequelize instance to connect to the database
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres', // Specify the database dialect as PostgreSQL
});

// Export the Sequelize instance for use in other parts of the application
module.exports = sequelize;
