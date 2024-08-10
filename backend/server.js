// Load environment variables from .env file
require('dotenv').config();

// Import necessary modules and configurations
const express = require('express'); // Express for creating the server
const bodyParser = require('body-parser'); // Body-parser for parsing request bodies
const cors = require('cors'); // CORS middleware for handling cross-origin requests
const sequelize = require('./config/db'); // Database connection
const jwtConfig = require('./config/jwt'); // JWT configuration
const smtpConfig = require('./config/smtp'); // SMTP configuration

// Create an instance of the Express application
const app = express();

// Use CORS middleware
app.use(cors({
    origin: 'http://127.0.0.1/' // Replace with your frontend's domain
}));

// Use body-parser middleware to parse JSON request bodies
app.use(bodyParser.json());

// Import and use the route handlers from the controllers
app.use('/auth', require('./routes/authRoutes')); // Authentication routes
app.use('/email', require('./routes/emailRoutes')); // Email routes
app.use('/user', require('./routes/userRoutes')); // User routes
app.use('/settings', require('./routes/settingsRoutes')); // Settings routes

// Start the server and listen on the specified port
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Test the database connection
sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch((err) => console.log(`Error: ${err.message}`));
