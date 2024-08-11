const { User, Email, MailingList, Organization, Contact } = require('../models');

// Create a new mailing list
const createMailingList = async (req, res) => {
    try {
        const { name, organization_id } = req.body;

        if (!name || !organization_id) {
            return res.status(400).json({ message: 'Name and organization ID are required' });
        }

        const newMailingList = await MailingList.create({ name, organization_id }); // Correct the key if needed
        return res.status(201).json(newMailingList);
    } catch (error) {
        return res.status(500).json({ message: 'Error creating mailing list', error: error.message });
    }
};

// Update an existing mailing list
const updateMailingList = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, organization_id } = req.body;

        const mailingList = await MailingList.findByPk(id);
        if (!mailingList) {
            return res.status(404).json({ message: 'Mailing list not found' });
        }

        mailingList.name = name || mailingList.name;
        mailingList.organization_id = organization_id || mailingList.organization_id; // Correct the key if needed

        await mailingList.save();
        return res.status(200).json(mailingList);
    } catch (error) {
        return res.status(500).json({ message: 'Error updating mailing list', error: error.message });
    }
};

// Delete a mailing list by ID
const deleteMailingList = async (req, res) => {
    try {
        const { id } = req.params;

        const mailingList = await MailingList.findByPk(id);
        if (!mailingList) {
            return res.status(404).json({ message: 'Mailing list not found' });
        }

        await mailingList.destroy();
        return res.status(200).json({ message: 'Mailing list deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting mailing list', error: error.message });
    }
};

// Get all mailing lists with associated emails
const getMailingListsWithEmails = async (req, res) => {
    try {
        const mailingLists = await MailingList.findAll({
            include: [{ model: Email, as: 'emails' }],
        });

        return res.status(200).json(mailingLists);
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving mailing lists', error: error.message });
    }
};


// Get all mailing lists with associated contacts
const getMailingListsWithContacts = async (req, res) => {
    try {
        const mailingLists = await MailingList.findAll({
            include: [
                { model: Contact, as: 'contacts' }, 
            ],
        });

        return res.status(200).json(mailingLists);
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving mailing lists', error: error.message });
    }
};


// Get all mailing lists without associated emails
const getMailingLists = async (req, res) => {
    try {
        const mailingLists = await MailingList.findAll();

        return res.status(200).json(mailingLists);
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving mailing lists', error: error.message });
    }
};

// Get details of a specific mailing list
const getMailingListDetails = async (req, res) => {
    try {
        const { id } = req.params;

        const mailingList = await MailingList.findByPk(id);
        if (!mailingList) {
            return res.status(404).json({ message: 'Mailing list not found' });
        }

        return res.status(200).json({ mailing_list: mailingList });
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving mailing list details', error: error.message });
    }
};

// Get all contacts in a specific mailing list
const getContactsInMailingList = async (mailingListId) => {
    try {
        // Find the mailing list by its ID with associated contacts
        const mailingList = await MailingList.findByPk(mailingListId, {
            include: [{ model: Contact, as: 'contacts', attributes: ['email'] }]
        });

        if (!mailingList) {
            throw new Error('Mailing list not found');
        }

        // Extract email addresses from the contacts
        const emailAddresses = mailingList.contacts.map(contact => contact.email);

        return emailAddresses;
    } catch (error) {
        console.error(`Failed to get mailing list emails: ${error.message}`);
        return [];
    }
};

// Add this new function to the exports
module.exports = {
    createMailingList,
    updateMailingList,
    deleteMailingList,
    getMailingListsWithEmails,
    getMailingListsWithContacts,
    getMailingLists,
    getMailingListDetails,
    getContactsInMailingList, // Export the new function
};
