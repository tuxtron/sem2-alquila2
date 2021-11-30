'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CalificacionUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CalificacionUser.belongsTo(models.User,
				{
					as: 'user',
					foreignKey: 'user_id'
				}
			);
    }
  };
  CalificacionUser.init({
    comentarios: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    comentarista_id: DataTypes.INTEGER,
    calificacion: DataTypes.INTEGER,
    oferta_id: DataTypes.INTEGER,
  }, {
    sequelize,
    //modelName: 'CalificacionUser',
    tableName: 'calificaciones_usuarios',
    timestamps: false
  });
  return CalificacionUser;
};