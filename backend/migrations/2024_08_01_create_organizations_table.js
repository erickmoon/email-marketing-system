'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('organizations', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      smtpHost: {  // Change this to match the model
        type: Sequelize.STRING,
        allowNull: false,
      },
      smtpPort: {  // Change this to match the model
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      smtpSecure: {  // Change this to match the model
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      smtpUser: {  // Change this to match the model
        type: Sequelize.STRING,
        allowNull: false,
      },
      smtpPass: {  // Change this to match the model
        type: Sequelize.STRING,
        allowNull: false,
      },
      maxEmailsPerHour: {  // Change this to match the model
        type: Sequelize.INTEGER,
        defaultValue: 100,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('organizations');
  },
};
