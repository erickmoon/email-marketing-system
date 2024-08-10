const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Adjust the path as necessary
const Organization = require('./Organization'); // Adjust the path as necessary

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  role: {
    type: DataTypes.ENUM('admin', 'user'),
    defaultValue: 'user',
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false, // Set to false if you don't want Sequelize to automatically manage createdAt and updatedAt
  tableName: 'users', // Ensure the table name matches the migration
});

// Define associations
User.belongsTo(Organization, { foreignKey: 'organizationId', as: 'organization' });

module.exports = User;
