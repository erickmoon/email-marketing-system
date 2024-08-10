const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Adjust the path as necessary

const Organization = sequelize.define('Organization', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  smtpHost: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  smtpPort: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  smtpSecure: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  smtpUser: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  smtpPass: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  maxEmailsPerHour: {
    type: DataTypes.INTEGER,
    defaultValue: 100,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false, // Set to false if you don't want Sequelize to automatically manage createdAt and updatedAt
  tableName: 'organizations', // Ensure the table name matches the migration
});

module.exports = Organization;
