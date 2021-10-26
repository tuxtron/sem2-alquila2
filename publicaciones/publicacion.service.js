require('dotenv').config();
const {getPagingData,getPagination} = require('_helpers/comunes.js');
const { Op } = require("sequelize");


var Publicacion = require('../models/index').Publicacion;
var Oferta = require('../models/index').Oferta;
var CalificacionPublicacion = require('../models/index').CalificacionPublicacion;
const userService = require('../users/user.service');


module.exports = {
    getAllPublicaciones,
    getPublicacion,
    createPublicacion,
    updatePublicacion,
    calificar,
    reactivar,
    getMisPublicaciones
}

async function getAllPublicaciones(req) {
    
    
    const amigos = await userService.getFriends(req.user.id);
    let ids_amigos = amigos.map(a => a.id);
    
    console.log(req.query.es_necesidad)
    var params = {
        activa: true,
        [Op.or]:{
            ver_todos: true,
            user_id: {
                [Op.in]: ids_amigos,
            }
            
        },
        es_necesidad: req.query.es_necesidad === "true" ? true : false
    }

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



async function getMisPublicaciones(req) {
    
    var params = {
        activa: req.query.activa === "true" ? true : false,
        user_id: req.user.id,
        es_necesidad: req.query.es_necesidad === "true" ? true : false
    }

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



async function createPublicacion(params, user_id) {
    params.user_id = user_id
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

async function reactivar(id, params) {
    const publicacion = await getPublicacion(id);
    Object.assign(publicacion, {activa:true});
    await publicacion.save();

    await Oferta.update({ es_vieja : true },{ where : { publicacion_id : id }});

    return publicacion;
}