const express = require('express');
const { getSettings, updateSettings } = require('../controllers/settingsController'); // Import settings controllers

const router = express.Router();

// GET route to retrieve current system settings
router.get('/', getSettings);

// PUT route to update system settings
router.put('/', updateSettings);

module.exports = router; // Export the router to be used in the main application
