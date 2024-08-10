const mongoose = require('mongoose');

// Define the schema for a Mailing List
const MailingListSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Name of the mailing list
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' }, // Reference to the organization the mailing list belongs to
    contacts: [{ // Array of contacts in the mailing list
        email: { type: String, required: true }, // Email of the contact
        name: { type: String }, // Optional name of the contact
        unsubscribed: { type: Boolean, default: false } // Flag to check if the contact has unsubscribed
    }],
    createdAt: { type: Date, default: Date.now } // Timestamp of mailing list creation
});

// Create and export the Mailing List model
module.exports = mongoose.model('MailingList', MailingListSchema);
