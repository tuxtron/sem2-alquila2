'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Oferta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Oferta.belongsTo(models.User,
				{
					as: 'user',
					foreignKey: 'user_id'
				}
			);

        Oferta.belongsTo(models.Publicacion,
            {
                as: 'publicacion',
                foreignKey: 'publicacion_id'
            }
        );
    }
  };
  Oferta.init({
    user_id: DataTypes.INTEGER,
    publicacion_id: DataTypes.INTEGER,
    cantidad_tiempo: { type: DataTypes.INTEGER },
    unidad_tiempo: { type: DataTypes.STRING },
    precio: { type: DataTypes.DOUBLE },
    descripcion: { type: DataTypes.STRING },
    foto: { type: DataTypes.STRING },
    elegida: { type: DataTypes.BOOLEAN },
    es_vieja: { type: DataTypes.BOOLEAN }
  }, {
    sequelize,
    //modelName: 'Oferta',
    tableName: 'ofertas',
    timestamps: false
  });
  return Oferta;
};