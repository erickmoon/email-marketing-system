const express = require('express');
const { getUser, createUser, updateUser, deleteUser } = require('../controllers/userController'); // Import user controllers

const router = express.Router();

// GET route to retrieve a user by ID
router.get('/:id', getUser);

// POST route to create a new user
router.post('/', createUser);

// PUT route to update an existing user
router.put('/:id', updateUser);

// DELETE route to delete a user by ID
router.delete('/:id', deleteUser);

module.exports = router; // Export the router to be used in the main application
