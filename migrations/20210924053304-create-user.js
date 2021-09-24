'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER},
      nombre: { type: Sequelize.STRING, allowNull: false },
      apellido: { type: Sequelize.STRING, allowNull: false },
      email: { type: Sequelize.STRING, allowNull: false },
      hash: { type: Sequelize.STRING, allowNull: false },
      fecha_nacimiento: { type: Sequelize.DATEONLY, allowNull: false },
      telefono: { type: Sequelize.STRING, allowNull: false },
      latitud: { type: Sequelize.DOUBLE, allowNull: false, defaultValue: 0 },
      longitud: { type: Sequelize.DOUBLE, allowNull: false, defaultValue: 0 },
      is_empresa: { type: Sequelize.BOOLEAN, defaultValue: false }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};
