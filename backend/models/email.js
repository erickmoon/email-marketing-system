const mongoose = require('mongoose');

// Define the schema for an Email
const EmailSchema = new mongoose.Schema({
    subject: { type: String, required: true }, // Subject of the email
    body: { type: String, required: true }, // Body content of the email
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' }, // Reference to the organization sending the email
    mailingList: { type: mongoose.Schema.Types.ObjectId, ref: 'MailingList' }, // Reference to the mailing list to which the email is sent
    status: { type: String, enum: ['scheduled', 'sent', 'failed'], default: 'scheduled' }, // Status of the email
    sendAt: { type: Date, required: true }, // Scheduled time to send the email
    createdAt: { type: Date, default: Date.now } // Timestamp of email creation
});

// Create and export the Email model
module.exports = mongoose.model('Email', EmailSchema);
