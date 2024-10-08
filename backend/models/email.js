const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Adjust path as necessary

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
  send_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  },
  recipient_email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', // Ensure this matches the table name
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  organization_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'organizations', // Ensure this matches the table name
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  mailing_list_id: {
    allowNull: true,
    type: DataTypes.INTEGER,
    references: {
      model: 'mailing_lists', // Ensure this matches the table name
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  createdAt: {
    allowNull: true,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    allowNull: true,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,
  tableName: 'emails',
});

module.exports = Email;
