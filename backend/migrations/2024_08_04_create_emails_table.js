'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('emails', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      subject: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      body: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      organization_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'organizations', // Table name
          key: 'id', // Column name in the referenced table
        },
        onDelete: 'SET NULL', // Action when referenced row is deleted
        allowNull: true, // Allow null if no organization is set
      },
      mailing_list_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'mailing_lists', // Table name
          key: 'id', // Column name in the referenced table
        },
        onDelete: 'SET NULL', // Action when referenced row is deleted
        allowNull: true, // Allow null if no mailing list is set
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'scheduled',
      },
      send_at: {
        type: Sequelize.DATE,
        allowNull: false,
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
    await queryInterface.dropTable('emails');
  },
};
