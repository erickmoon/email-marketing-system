const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Adjust path as necessary

const MailingList = sequelize.define('MailingList', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  organization_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'organizations', // Ensure this matches the table name
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,
  tableName: 'mailing_lists',
});

module.exports = MailingList;
