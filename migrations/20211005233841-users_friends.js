'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users_friends', {
      user_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION',
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      friend_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION',
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'users',
          key: 'id'
        }
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users_friends');
  }
};
