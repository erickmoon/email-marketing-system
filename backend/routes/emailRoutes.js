const express = require('express');
const {
  sendAndScheduleEmails,
  cancelScheduledEmail,
  addEmailToMailingList,
  removeEmailFromMailingList,
  updateEmailInMailingList,
  getEmailsInOrganization,
  rescheduleEmail
} = require('../controllers/emailController'); // Import email controllers
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Add an email to a specific mailing list
router.post('/:id/emails',authMiddleware, addEmailToMailingList);

// Remove an email from a specific mailing list
router.delete('/:list_id/emails/:email_id',authMiddleware, removeEmailFromMailingList);

// Update an email's details within a specific mailing list
router.put('/:list_id/emails/:email_id', authMiddleware, updateEmailInMailingList);

// GET route to fetch all contacts with their respective mailing lists for the organization
router.get('/contacts', authMiddleware, getEmailsInOrganization);

// POST route to send emails to individual or mailing list
router.post('/send', authMiddleware, sendAndScheduleEmails);

// POST route to cancel a scheduled email
router.post('/cancel/:id', authMiddleware, cancelScheduledEmail); // Assuming you want to pass the email ID as a URL parameter

// PUT route to reschedule an email
router.put('/reschedule-email/:emailId', rescheduleEmail);

module.exports = router; // Export the router to be used in the main application
