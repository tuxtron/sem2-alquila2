'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.CalificacionUser, {foreignKey: 'user_id' ,as: 'calificaciones'});
    }
  };
  User.init({
      nombre: { type: DataTypes.STRING},
      apellido: { type: DataTypes.STRING},
      email: { type: DataTypes.STRING},
      hash: { type: DataTypes.STRING},
      fecha_nacimiento: { type: DataTypes.DATEONLY},
      telefono: { type: DataTypes.STRING},
      latitud: { type: DataTypes.DOUBLE},
      longitud: { type: DataTypes.DOUBLE},
      is_empresa: { type: DataTypes.BOOLEAN}
  }, {
    sequelize,
    //modelName: 'User',
    tableName: 'users',
    defaultScope: {
        // exclude hash by default
        attributes: { exclude: ['hash'] }
    },
    scopes: {
        // include hash with this scope
        withHash: { attributes: {}, }
    },
    timestamps: false
  });
  return User

};