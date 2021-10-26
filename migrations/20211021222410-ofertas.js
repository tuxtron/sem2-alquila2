'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ofertas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      publicacion_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION',
        allowNull: false,
        references: {
          model: 'publicaciones',
          key: 'id'
        }
      },
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
      precio: { type: Sequelize.DOUBLE, allowNull: false },
      cantidad_tiempo: { type: Sequelize.INTEGER, allowNull: false },
      unidad_tiempo: { type: Sequelize.STRING, allowNull: false },
      descripcion: { type: Sequelize.STRING, allowNull: false },
      foto: { type: Sequelize.TEXT, allowNull: true, defaultValue: "" },
      elegida: { type: Sequelize.BOOLEAN, defaultValue: false },
      es_vieja: { type: Sequelize.BOOLEAN, defaultValue: false },
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.dropTable('ofertas');
  }
};
