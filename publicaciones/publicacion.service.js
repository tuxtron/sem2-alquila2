require('dotenv').config();
const {getPagingData,getPagination} = require('_helpers/comunes.js');
const { Op } = require("sequelize");


var Publicacion = require('../models/index').Publicacion;

module.exports = {
    getAllPublicaciones,
    getPublicacion,
    createPublicacion,
    updatePublicacion
}

async function getAllPublicaciones(req) {
    var params = {}

    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);

    var data = await Publicacion.findAndCountAll({
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
    const publicacion = await Publicacion.findByPk(id).then( async(publicacion) => {
        try{
            return publicacion;
        }catch(e){
            console.error(e);
        }
    });
    if (!publicacion) throw 'Publicación no encontrado';
    return publicacion;
}