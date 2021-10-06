require('dotenv').config();
const {getPagingData,getPagination} = require('_helpers/comunes.js');
const { Op } = require("sequelize");


var Publicacion = require('../models/index').Publicacion;
var CalificacionPublicacion = require('../models/index').CalificacionPublicacion;

module.exports = {
    getAllPublicaciones,
    getPublicacion,
    createPublicacion,
    updatePublicacion,
    calificar
}

async function getAllPublicaciones(req) {
    var params = {}

    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);

    var data = await Publicacion.findAndCountAll({
        include: ['user','categoria'],
        offset: offset,
        limit: limit,
        where: params
      });

    return getPagingData(data, page, limit);
}

async function createPublicacion(params) {
    const publicacion = await Publicacion.create(params).then( async(publicacion) => {
        try{
            return { publicacion }
        }catch(e){
            console.error(e);
        }
    });
    return publicacion.publicacion;
}

async function updatePublicacion(id, params) {
    const publicacion = await getPublicacion(id);
    Object.assign(publicacion, params);
    await publicacion.save();
    return publicacion;
}

async function getPublicacion(id) {
    const publicacion = await Publicacion.findByPk(id, {
        include: ['calificaciones', 'user','categoria']
    }).then( async(publicacion) => {
        try{

            try{
                const sum = publicacion.calificaciones.reduce( function(a, b){
                        return a + b.calificacion;
                    }, 0);
                    publicacion.setDataValue("promedio",sum/publicacion.calificaciones.length)
                return publicacion;
            }catch(e){
                console.error(e);
            }
        }catch(e){
            console.error(e);
        }
    });

    if (!publicacion) throw 'Publicación no encontrado';

    return publicacion;
}


async function calificar(id, params) {
    params.publicacion_id = id
    await CalificacionPublicacion.create(params);
}