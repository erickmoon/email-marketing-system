const jwt = require('jsonwebtoken');
const { User, Email, MailingList, Organization, Contact } = require('../models');

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    try {
       
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Use findOne method
        req.user = await User.findOne({ where: { id: decoded.id } });
        //console.log('Received Token:', req.user);
        if (!req.user) {
            return res.status(401).json({ message: 'User not found' });
        }

        next();
    } catch (error) {
        console.error('Token verification error:', error.message);
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authMiddleware;
