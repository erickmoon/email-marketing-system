// controllers/authController.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Function to handle user registration
exports.register = async (req, res) => {
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
        res.status(500).json({ error: error.message });
    }
};

// Function to handle user login
exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });
        if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.json({ token, user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to handle user logout (if implemented)
exports.logout = (req, res) => {
    res.status(200).json({ message: 'Logged out successfully' });
};
