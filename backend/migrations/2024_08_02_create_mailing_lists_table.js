'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('mailing_lists', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
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
    await queryInterface.dropTable('mailing_lists');
  },
};
