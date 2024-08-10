const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Adjust the path as necessary
const Organization = require('./Organization'); // Adjust the path as necessary
const MailingList = require('./MailingList'); // Adjust the path as necessary

const Email = sequelize.define('Email', {
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('scheduled', 'sent', 'failed'),
    defaultValue: 'scheduled',
  },
  sendAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false, // Set to false if you don't want Sequelize to automatically manage createdAt and updatedAt
  tableName: 'emails', // Ensure the table name matches the migration
});

// Define associations
Email.belongsTo(Organization, { foreignKey: 'organizationId', as: 'organization' });
Email.belongsTo(MailingList, { foreignKey: 'mailingListId', as: 'mailingList' });

module.exports = Email;
