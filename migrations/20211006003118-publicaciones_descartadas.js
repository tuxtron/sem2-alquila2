'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('publicaciones_descartadas', {
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
      publicacion_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION',
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'publicaciones',
          key: 'id'
        }
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('publicaciones_descartadas');
  }
};



