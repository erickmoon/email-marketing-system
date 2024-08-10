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
      smtp_host: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      smtp_port: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      smtp_secure: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      smtp_user: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      smtp_pass: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      max_emails_per_hour: {
        type: Sequelize.INTEGER,
        defaultValue: 100,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('organizations');
  },
};
