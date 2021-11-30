'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Publicacion extends Model {
        /**
             * Helper method for defining associations.
             * This method is not a part of Sequelize lifecycle.
             * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Publicacion.belongsTo(models.User,
				{
					as: 'user',
					foreignKey: 'user_id'
				}
			);
            
            Publicacion.belongsTo(models.Categoria,
				{
					as: 'categoria',
					foreignKey: 'categoria_id'
				}
			);

            Publicacion.hasMany(models.CalificacionPublicacion, {foreignKey: 'publicacion_id' ,as: 'calificaciones'});

            Publicacion.hasOne(models.Oferta, {foreignKey: 'publicacion_id' ,as: 'oferta_aceptada', scope:{elegida:true}});

        }
    }
    Publicacion.init(
        {
            // id: DataTypes.INTERGER,
            descripcion: { type: DataTypes.STRING },
            categoria_id: { type: DataTypes.INTEGER },
            cantidad_tiempo: { type: DataTypes.INTEGER },
            unidad_tiempo: { type: DataTypes.STRING },
            precio: { type: DataTypes.DOUBLE },
            fecha_limite: { type: DataTypes.DATEONLY },
            ver_todos: { type: DataTypes.BOOLEAN },
            user_id: { type: DataTypes.INTEGER },
            es_necesidad: { type: DataTypes.BOOLEAN },
            foto: { type: DataTypes.STRING },
            activa: { type: DataTypes.BOOLEAN }
        },
        {
            sequelize,
            //modelName: 'Publicacion',
            tableName: "publicaciones",
            timestamps: true,
        }
    );
    return Publicacion;
}