const mongoose = require('mongoose');

// Define the schema for an Organization
const OrganizationSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, // Unique name of the organization
    address: { type: String }, // Optional address of the organization
    smtpSettings: { // SMTP settings specific to the organization for sending emails
        host: { type: String, required: true },
        port: { type: Number, required: true },
        secure: { type: Boolean, default: false }, // SSL connection
        auth: {
            user: { type: String, required: true }, // SMTP user for authentication
            pass: { type: String, required: true } // SMTP password for authentication
        }
    },
    maxEmailsPerHour: { type: Number, default: 100 }, // Max number of emails that can be sent per hour
    createdAt: { type: Date, default: Date.now } // Timestamp of organization creation
});

// Create and export the Organization model
module.exports = mongoose.model('Organization', OrganizationSchema);
