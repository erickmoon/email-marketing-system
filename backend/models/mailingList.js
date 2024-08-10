const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Adjust the path as necessary
const Organization = require('./Organization'); // Adjust the path as necessary

const MailingList = sequelize.define('MailingList', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false, // Set to false if you don't want Sequelize to automatically manage createdAt and updatedAt
  tableName: 'mailing_lists', // Ensure the table name matches the migration
});

// Define associations
MailingList.belongsTo(Organization, { foreignKey: 'organization', as: 'organizationDetails' });

// Define the MailingListContact model for the contacts array
const MailingListContact = sequelize.define('MailingListContact', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
  },
  unsubscribed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
}, {
  timestamps: false,
  tableName: 'mailing_list_contacts',
});

// Define associations
MailingList.hasMany(MailingListContact, { foreignKey: 'mailingListId', as: 'contacts' });
MailingListContact.belongsTo(MailingList, { foreignKey: 'mailingListId' });

module.exports = {
  MailingList,
  MailingListContact,
};
