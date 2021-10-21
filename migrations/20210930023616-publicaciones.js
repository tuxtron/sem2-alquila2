'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('publicaciones', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER},
      descripcion: { type: Sequelize.STRING, allowNull: false },
      categoria_id: { type: Sequelize.INTEGER, allowNull: false },
      cantidad_tiempo: { type: Sequelize.INTEGER, allowNull: false },
      unidad_tiempo: { type: Sequelize.STRING, allowNull: false },
      precio: { type: Sequelize.DOUBLE, allowNull: false },
      fecha_limite: { type: Sequelize.DATEONLY, allowNull: false },
      ver_todos: { type: Sequelize.BOOLEAN, allowNull: false },
      user_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION',
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      es_necesidad: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
      foto: { type: Sequelize.TEXT, allowNull: false, defaultValue: "" },
      activa: { type: Sequelize.BOOLEAN, defaultValue: false },
      updatedAt: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      },
      createdAt: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      }

    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('publicaciones');
  }
};


