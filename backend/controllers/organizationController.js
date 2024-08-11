const { User, Email, MailingList, Organization, Contact } = require('../models');
const { body, validationResult } = require('express-validator');

// Middleware for validating input data
const validateOrganization = [
  body('name').isString().trim().notEmpty().withMessage('Name is required'),
  body('address').optional().isString().trim(),
  body('smtpHost').isString().trim().notEmpty().withMessage('SMTP Host is required'),
  body('smtpPort').isInt().withMessage('SMTP Port must be a number'),
  body('smtpSecure').isBoolean().withMessage('SMTP Secure must be a boolean'),
  body('smtpUser').isString().trim().notEmpty().withMessage('SMTP User is required'),
  body('smtpPass').isString().trim().notEmpty().withMessage('SMTP Password is required'),
  body('maxEmailsPerHour').isInt().withMessage('Max Emails Per Hour must be a number'),
];


// Create a new organization
exports.createOrganization = [
  validateOrganization,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      //console.log('Request Body:', req.body); // Log the request body
      const organization = await Organization.create(req.body);
      res.status(201).json(organization);
    } catch (err) {
      console.error('Error:', err); // Log any errors
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
];


// Get all organizations
exports.getAllOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.findAll();
    res.status(200).json(organizations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a specific organization by ID
exports.getOrganizationById = async (req, res) => {
  try {
    const organization = await Organization.findByPk(req.params.id);
    if (!organization) {
      return res.status(404).json({ error: 'Organization not found' });
    }
    res.status(200).json(organization);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update an organization by ID
exports.updateOrganization = [
  validateOrganization,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const [updated] = await Organization.update(req.body, {
        where: { id: req.params.id },
      });
      if (!updated) {
        return res.status(404).json({ error: 'Organization not found' });
      }
      const updatedOrganization = await Organization.findByPk(req.params.id);
      res.status(200).json(updatedOrganization);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
];

// Delete an organization by ID
exports.deleteOrganization = async (req, res) => {
  try {
    // Attempt to delete the organization
    const deleted = await Organization.destroy({
      where: { id: req.params.id },
    });

    // Check if any rows were deleted
    if (deleted === 0) {
      return res.status(404).json({ error: 'Organization not found' });
    }

    // Return a success message with the message body
    res.status(200).json({ message: 'Organization deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
