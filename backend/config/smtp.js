// Export an object containing default SMTP settings
module.exports = {
    host: process.env.SMTP_HOST, // SMTP server host
    port: process.env.SMTP_PORT, // SMTP server port
    secure: process.env.SMTP_SECURE === 'true', // Use SSL/TLS
    auth: {
        user: process.env.SMTP_USER, // SMTP server username
        pass: process.env.SMTP_PASS, // SMTP server password
    },
};
