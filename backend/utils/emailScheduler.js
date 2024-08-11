// Import necessary modules and models
const cron = require('node-cron'); // Cron for scheduling tasks
const nodemailer = require('nodemailer'); // Nodemailer for sending emails
const { Op } = require('sequelize'); // Import Op from Sequelize
const moment = require('moment-timezone'); // Import moment-timezone
const { User, Email, MailingList, Organization, Contact } = require('../models');


// Function to send an email immediately
const sendEmailNow = async (email) => {
    try {
        // Find the organization by its ID to get SMTP settings
        const organization = await Organization.findByPk(email.organization_id);
        if (!organization) {
            throw new Error('Organization not found');
        }

        // Log the organization settings for debugging
        console.log('SMTP Settings:', {
            host: organization.smtpHost,
            port: organization.smtpPort,
            secure: organization.smtpSecure,
            user: organization.smtpUser,
            pass: organization.smtpPass,
        });

        // Create a transporter object using the organization's SMTP settings
        const transporter = nodemailer.createTransport({
            host: organization.smtpHost,
            port: organization.smtpPort,
            secure: organization.smtpSecure, // true for 465, false for other ports
            auth: {
                user: organization.smtpUser,
                pass: organization.smtpPass,
            },
        });

        // Determine recipients
        let recipients;
        if (email.recipient_email) {
            // Single recipient email
            recipients = [email.recipient_email];
        } else if (email.mailing_list_id) {
            // Get mailing list emails if recipient_email is not provided
            recipients = await getMailingListEmails(email.mailing_list_id);
        } else {
            throw new Error('No recipient or mailing list provided');
        }

        if (recipients.length === 0) {
            throw new Error('No recipients found');
        }

        // Send the email using the transporter
        await transporter.sendMail({
            from: `"${organization.name}" <${organization.smtpUser}>`,
            to: recipients.join(','), // Join all emails with a comma
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



// Function to check and send scheduled emails
const processScheduledEmails = async () => {
    try {
        // Get current time in Nairobi timezone
        const now = moment().tz('Africa/Nairobi').toDate();
        console.log('Current Nairobi time:', moment().tz('Africa/Nairobi').format());

        // Find all emails where send_at is less than or equal to the current time and status is 'scheduled'
        const emails = await Email.findAll({
            where: {
                send_at: {
                    [Op.lte]: now // Check if send_at is less than or equal to the current time
                },
                status: 'scheduled'
            }
        });

        console.log('Emails to process:', emails);

        for (const email of emails) {
            email.status = 'sending';
            await email.save();

            console.log('Sending email:', email);
            await sendEmailNow(email);
        }
    } catch (error) {
        console.error(`Failed to process scheduled emails: ${error.message}`);
    }
};


const getMailingListEmails = async (mailingListId) => {
    try {
        // Log the ID being queried
        console.log(`Retrieving mailing list with ID: ${mailingListId}`);

        // Find the mailing list by ID with associated contacts
        const mailingList = await MailingList.findByPk(mailingListId, {
            include: [{ model: Contact, as: 'contacts', attributes: ['email'] }]
        });

        // Check if the mailing list was found
        if (!mailingList) {
            console.error(`Mailing list with ID ${mailingListId} not found`);
            throw new Error('Mailing list not found');
        }

        // Check the structure of mailingList
        console.log('Mailing list retrieved:', mailingList);

        // Extract email addresses from the contacts
        const emailAddresses = mailingList.contacts.map(contact => contact.email);

        // Log the email addresses
        console.log('Extracted email addresses:', emailAddresses);

        return emailAddresses;
    } catch (error) {
        // Log detailed error information
        console.error(`Failed to get mailing list emails: ${error.message}`);
        console.error('Error stack trace:', error.stack);
        return [];
    }
};


// Schedule the task to run every minute
cron.schedule('* * * * *', () => {
    console.log('Checking for scheduled emails...');
    processScheduledEmails();
});

// Export the functions
module.exports = {
    sendEmailNow,
    processScheduledEmails
};
