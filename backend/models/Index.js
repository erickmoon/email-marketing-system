const sequelize = require('../config/db'); // Correct path to your Sequelize instance

const User = require('./User');
const Email = require('./Email');
const MailingList = require('./MailingList');
const Organization = require('./Organization');
const Contact = require('./Contact');

// Define associations here

// User - Organization
User.belongsTo(Organization, { as: 'organization', foreignKey: 'organization_id' });
Organization.hasMany(User, { as: 'users', foreignKey: 'organization_id' });

// User - Email
User.hasMany(Email, { as: 'emails', foreignKey: 'user_id' });
Email.belongsTo(User, { as: 'user', foreignKey: 'user_id' });

// Email - Organization
Email.belongsTo(Organization, { as: 'organization', foreignKey: 'organization_id' });
Organization.hasMany(Email, { as: 'emails', foreignKey: 'organization_id' });

// Email - MailingList
Email.belongsTo(MailingList, { as: 'mailingList', foreignKey: 'mailing_list_id' });
MailingList.hasMany(Email, { as: 'emails', foreignKey: 'mailing_list_id' });

// MailingList - Organization
MailingList.belongsTo(Organization, { as: 'organization', foreignKey: 'organization_id' });
Organization.hasMany(MailingList, { as: 'mailingLists', foreignKey: 'organization_id' });

// MailingList - Contact
MailingList.hasMany(Contact, { as: 'contacts', foreignKey: 'mailing_list_id' });
Contact.belongsTo(MailingList, { as: 'mailingList', foreignKey: 'mailing_list_id' });

// Contact - Organization
Contact.belongsTo(Organization, { as: 'organization', foreignKey: 'organization_id' });
Organization.hasMany(Contact, { as: 'contacts', foreignKey: 'organization_id' });

module.exports = {
  sequelize,
  User,
  Email,
  MailingList,
  Organization,
  Contact,
};
