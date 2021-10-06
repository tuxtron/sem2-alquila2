'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PublicacionDescartada extends Model {
    

  };
  PublicacionDescartada.init({
      user_id: { type: DataTypes.INTEGER, primaryKey: true},
      publicacion_id: { type: DataTypes.INTEGER, primaryKey: true},
     
  }, {
    sequelize,
    tableName: 'publicaciones_descartadas',
    timestamps: false
  });
  return PublicacionDescartada

};