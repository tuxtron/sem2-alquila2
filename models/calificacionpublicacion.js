'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CalificacionPublicacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CalificacionPublicacion.belongsTo(models.Publicacion,
				{
					as: 'publicacion',
					foreignKey: 'publicacion_id'
				}
			);
    }
  };
  CalificacionPublicacion.init({
    comentarios: DataTypes.STRING,
    publicacion_id: DataTypes.INTEGER,
    calificacion: DataTypes.INTEGER,
  }, {
    sequelize,
    //modelName: 'CalificacionPublicacion',
    tableName: 'calificaciones_publicaciones',
    timestamps: false
  });
  return CalificacionPublicacion;
};