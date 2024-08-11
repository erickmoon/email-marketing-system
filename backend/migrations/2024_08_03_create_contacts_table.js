'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('contacts', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      unsubscribed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      organization_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'organizations', // Table name
          key: 'id', // Column name in the referenced table
        },
        onDelete: 'CASCADE', // Action when referenced row is deleted
        allowNull: true, // Allow null if no organization is set
      },
      mailing_list_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'mailing_lists',
          key: 'id',
        },
        onDelete: 'CASCADE',
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
    await queryInterface.dropTable('contacts');
  },
};
