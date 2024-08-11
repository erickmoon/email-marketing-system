const express = require('express');
const router = express.Router();
const {
    createMailingList,
    updateMailingList,
    deleteMailingList,
    getMailingListsWithEmails,
    getMailingListsWithContacts,
    getMailingLists,
    getMailingListDetails,
    getContactsInMailingList // Include the new controller method
} = require('../controllers/mailingListController');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new mailing list
router.post('/', authMiddleware, createMailingList);

// Update an existing mailing list
router.put('/:id', authMiddleware, updateMailingList);

// Delete a mailing list by ID
router.delete('/:id', authMiddleware, deleteMailingList);

// Get all mailing lists with associated emails
router.get('/emails', authMiddleware, getMailingListsWithEmails);

// Get all mailing lists with associated contacts
router.get('/contacts', authMiddleware, getMailingListsWithContacts);

// Get all mailing lists without associated emails
router.get('/', authMiddleware, getMailingLists);

// Get details of a specific mailing list
router.get('/:id', authMiddleware, getMailingListDetails); // New route for getting mailing list details

// Get all contacts in a specific mailing list
router.get('/:id/contacts', authMiddleware, getContactsInMailingList); // New route for getting contacts

module.exports = router;
