// Import necessary modules and models
const Organization = require('../models/Organization'); // Organization model to interact with the database

// Function to get the current settings for an organization
exports.getSettings = async (req, res) => {
    try {
        // Find the organization by its ID
        const organization = await Organization.findByPk(req.params.id);

        // If the organization is not found, return an error
        if (!organization) {
            return res.status(404).json({ error: 'Organization not found' });
        }

        // Respond with the organization's settings
        res.json({ organization });
    } catch (error) {
        // Handle any errors that occur during retrieval
        res.status(500).json({ error: error.message });
    }
};

// Function to update the settings for an organization
exports.updateSettings = async (req, res) => {
    try {
        // Find the organization by its ID
        const organization = await Organization.findByPk(req.params.id);

        // If the organization is not found, return an error
        if (!organization) {
            return res.status(404).json({ error: 'Organization not found' });
        }

        // Update the organization's settings with the new data
        organization.smtp_host = req.body.smtp_host;
        organization.smtp_port = req.body.smtp_port;
        organization.smtp_secure = req.body.smtp_secure;
        organization.smtp_user = req.body.smtp_user;
        organization.smtp_pass = req.body.smtp_pass;
        organization.max_emails_per_hour = req.body.max_emails_per_hour;
        await organization.save();

        // Respond with the updated organization's data
        res.json({ organization });
    } catch (error) {
        // Handle any errors that occur during update
        res.status(500).json({ error: error.message });
    }
};
