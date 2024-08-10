// Export an object containing JWT settings
module.exports = {
    secret: process.env.JWT_SECRET, // Secret key for signing JWT tokens
    expiresIn: '1h', // Token expiration time
};
