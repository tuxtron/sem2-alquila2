'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('calificaciones_publicaciones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      calificacion: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      comentarios: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      oferta_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      comentarista_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
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
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('calificaciones_publicaciones');
  }
};