// Import necessary modules and models
const Email = require('../models/Email'); // Email model to interact with the database
const emailScheduler = require('../utils/emailScheduler'); // Utility for scheduling emails

// Function to handle scheduling of emails
exports.scheduleEmail = async (req, res) => {
    try {
        const email = await Email.create({
            subject: req.body.subject,
            body: req.body.body,
            organization_id: req.body.organization_id,
            mailing_list_id: req.body.mailing_list_id,
            send_at: req.body.send_at,
            status: 'scheduled',
        });

        emailScheduler.scheduleEmail(email);

        res.status(201).json({ email });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to handle immediate sending of emails
exports.sendEmailNow = async (req, res) => {
    try {
        const email = await Email.create({
            subject: req.body.subject,
            body: req.body.body,
            organization_id: req.body.organization_id,
            mailing_list_id: req.body.mailing_list_id,
            send_at: new Date(),
            status: 'sending',
        });

        emailScheduler.sendEmailNow(email);

        res.status(201).json({ email });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to handle cancellation of scheduled emails
exports.cancelScheduledEmail = async (req, res) => {
    try {
        const email = await Email.findByPk(req.params.id);

        if (!email || email.status !== 'scheduled') {
            return res.status(400).json({ error: 'Cannot cancel this email' });
        }

        email.status = 'canceled';
        await email.save();

        res.json({ email });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
