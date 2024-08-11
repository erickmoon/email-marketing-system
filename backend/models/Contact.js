const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Adjust path as necessary

const Contact = sequelize.define('Contact', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  unsubscribed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
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
    type: DataTypes.INTEGER,
    references: {
      model: 'mailing_lists', // Ensure this matches the table name
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: true, // Match with migration configuration
  tableName: 'contacts',
});


module.exports = Contact;