  // Import necessary modules and models
const cron = require('node-cron'); // Cron for scheduling tasks
const nodemailer = require('nodemailer'); // Nodemailer for sending emails
const Email = require('../models/Email'); // Email model to interact with the database
const Organization = require('../models/Organization'); // Organization model to interact with the database

// Function to schedule an email
exports.scheduleEmail = (email) => {
    // Schedule the email to be sent at the specified time using a cron job
    cron.schedule(new Date(email.send_at), async () => {
        // Send the email when the scheduled time is reached
        await this.sendEmailNow(email);
    });
};

// Function to send an email immediately
exports.sendEmailNow = async (email) => {
    try {
        // Find the organization by its ID to get SMTP settings
        const organization = await Organization.findByPk(email.organization_id);

        // Create a transporter object using the organization's SMTP settings
        const transporter = nodemailer.createTransport({
            host: organization.smtp_host,
            port: organization.smtp_port,
            secure: organization.smtp_secure,
            auth: {
                user: organization.smtp_user,
                pass: organization.smtp_pass,
            },
        });

        // Send the email using the transporter
        await transporter.sendMail({
            from: `"${organization.name}" <${organization.smtp_user}>`,
            to: email.mailing_list_id, // Assume mailing_list_id is the recipient email
            subject: email.subject,
            text: email.body,
        });

        // Update the email's status to 'sent'
        email.status = 'sent';
        await email.save();
    } catch (error) {
        // Handle any errors that occur during email sending
        console.error(`Failed to send email: ${error.message}`);
    }
};
