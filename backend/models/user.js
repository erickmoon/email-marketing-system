const mongoose = require('mongoose');

// Define the schema for a User
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true }, // Unique username for login
    password: { type: String, required: true }, // Hashed password for security
    email: { type: String, required: true, unique: true }, // Unique email address for communication
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' }, // Reference to the organization the user belongs to
    role: { type: String, enum: ['admin', 'user'], default: 'user' }, // User role with permissions (admin or regular user)
    createdAt: { type: Date, default: Date.now } // Timestamp of user creation
});

// Create and export the User model
module.exports = mongoose.model('User', UserSchema);
