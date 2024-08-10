const express = require('express');
const { sendEmailNow, scheduleEmail, cancelScheduledEmail } = require('../controllers/emailController'); // Import email controllers

const router = express.Router();

// POST route to send an email immediately
router.post('/send', sendEmailNow);

// POST route to schedule an email for later sending
router.post('/schedule', scheduleEmail);

// POST route to cancel a scheduled email
router.post('/cancel/:id', cancelScheduledEmail); // Assuming you want to pass the email ID as a URL parameter

module.exports = router; // Export the router to be used in the main application
