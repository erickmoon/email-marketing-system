const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User, Email, MailingList, Organization, Contact } = require('../models');
const { body, validationResult } = require('express-validator');

// Middleware for validating input data
const validateRegistration = [
  body('username').isString().trim().notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

// Function to handle user registration
exports.register = [
  validateRegistration,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        organization_id: req.body.organization_id,
      });
      res.status(201).json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
];

// Function to handle user login
exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });
    res.json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to handle user logout
exports.logout = (req, res) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) return res.status(400).json({ message: 'No token provided' });

  try {
      // Add token to blacklist
      res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
      console.error('Logout error:', error.message);
      res.status(500).json({ message: 'Failed to log out' });
  }
};

