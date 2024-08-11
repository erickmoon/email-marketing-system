const { User, Email, MailingList, Organization, Contact } = require('../models');
const emailScheduler = require('../utils/emailScheduler');
const { body, validationResult } = require('express-validator');


// Middleware for validating input data
const validateEmail = [
  body('subject').isString().trim().notEmpty().withMessage('Subject is required'),
  body('body').isString().trim().notEmpty().withMessage('Body is required'),
  body('send_at').optional().isISO8601().toDate().withMessage('Invalid send date'),
  body('mailing_list_id').optional().isInt().withMessage('Invalid mailing list ID'),
  body('recipient_email').optional().isEmail().withMessage('Invalid recipient email address')
];


// Function to handle sending of emails
exports.sendAndScheduleEmails = [
  validateEmail,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Step 1: Extract user ID from authenticated user
      const userId = req.user.id; // Assuming the user ID is stored in req.user after authentication

      // Step 2: Fetch the organization associated with the user
      const user = await User.findByPk(userId, {
        include: [{ model: Organization, as: 'organization' }]
      });
      
      if (!user || !user.organization) {
        return res.status(404).json({ message: 'User or organization not found' });
      }
      
      const organizationId = user.organization.id;

 
      if ((req.body.recipient_email && req.body.mailing_list_id) || (!req.body.recipient_email && !req.body.mailing_list_id)) {
        return res.status(400).json({ message: 'Either recipient_email or mailing_list_id must be provided, but not both or neither' });
      }

      // Determine status based on `send_at` value
      console.log("Send at:"+req.body.send_at);
      const status = req.body.send_at && req.body.send_at !== "" ? 'scheduled' : 'sending';

      // Create the email
      const email = await Email.create({
        subject: req.body.subject,
        body: req.body.body,
        user_id: userId,
        organization_id: organizationId, // Make sure this matches your schema
        mailing_list_id: req.body.mailing_list_id, // Make sure this matches your schema
        recipient_email: req.body.recipient_email, // Make sure this matches your schema
        send_at: req.body.send_at || new Date(),
        status: status,
      });

      // Conditionally schedule or send the email based on the status
      if (status === 'sending') {
        emailScheduler.sendEmailNow(email);
      } else {
        /*emailScheduler.scheduleEmail(email);*/
      }

      res.status(201).json({ email });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
];

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
    console.error('Error canceling scheduled email:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Add an email to a specific mailing list
exports.addEmailToMailingList = async (req, res) => {
    try {
        const { id } = req.params;
        const { email, name, unsubscribed,organization_id} = req.body;

        const mailingList = await MailingList.findByPk(id);
        if (!mailingList) {
            return res.status(404).json({ message: 'Mailing list not found' });
        }

        const newEmail = await Contact.create({
            email,
            name,
            unsubscribed,
            mailing_list_id: id,
            organization_id: organization_id
        });

        return res.status(201).json(newEmail);
    } catch (error) {
        return res.status(500).json({ message: 'Error adding email to mailing list', error: error.message });
    }
};

// Remove an email from a specific mailing list
exports.removeEmailFromMailingList = async (req, res) => {
    try {
        const { list_id, email_id } = req.params;

        const email = await Contact.findOne({
            where: { id: email_id, mailing_list_id: list_id },
        });

        if (!email) {
            return res.status(404).json({ message: 'Email not found in mailing list' });
        }

        await email.destroy();
        return res.status(200).json({ message: 'Email removed from mailing list successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error removing email from mailing list', error: error.message });
    }
};

// Update an email's details within a specific mailing list
exports.updateEmailInMailingList = async (req, res) => {
    try {
        const { list_id, email_id } = req.params;
        const { email, name, unsubscribed } = req.body;

        const emailEntry = await Contact.findOne({
            where: { id: email_id, mailing_list_id: list_id },
        });

        if (!emailEntry) {
            return res.status(404).json({ message: 'Email not found in mailing list' });
        }

        emailEntry.email = email || emailEntry.email;
        emailEntry.name = name || emailEntry.name;
        emailEntry.unsubscribed = unsubscribed !== undefined ? unsubscribed : emailEntry.unsubscribed;

        await emailEntry.save();
        return res.status(200).json(emailEntry);
    } catch (error) {
        return res.status(500).json({ message: 'Error updating email in mailing list', error: error.message });
    }
};

// Get all emails in an organization with their respective mailing lists
exports.getEmailsInOrganization = async (req, res) => {
  try {
      const userId = req.user.id; // Assuming user info is stored in the token and decoded via middleware

      // Get the organization of the user
      const user = await User.findByPk(userId, {
          include: [{ model: Organization, as: 'organization' }] // Ensure 'Organization' is defined
      });

      if (!user || !user.organization) {
          return res.status(404).json({ message: 'User or organization not found' });
      }

      const organizationId = user.organization.id;

      // Fetch all contacts in the organization with their mailing lists
      const contacts = await Contact.findAll({
          where: { organization_id: organizationId },
          include: [{ model: MailingList, as: 'mailingList' }]
      });

      return res.status(200).json(contacts);
  } catch (error) {
      return res.status(500).json({ message: 'Error retrieving contacts', error: error.message });
  }
};

// Function to handle rescheduling of emails
exports.rescheduleEmail = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const emailId = req.params.emailId;
  const { send_at } = req.body; // Corrected this line

  try {
    // Step 1: Fetch the email record
    const email = await Email.findByPk(emailId);

    if (!email) {
      return res.status(404).json({ message: 'Email not found' });
    }

    // Step 2: Update the send_at field
    email.send_at = send_at || email.send_at;
    email.status = send_at ? 'scheduled' : 'sending'; // Update status based on the new send_at value
    await email.save();

    // Step 3: Reschedule or immediately send the email based on the new schedule
    if (send_at) {
      //emailScheduler.scheduleEmail(email);
    } else {
      emailScheduler.sendEmailNow(email);
    }

    res.status(200).json({ email });
  } catch (error) {
    console.error('Error rescheduling email:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
