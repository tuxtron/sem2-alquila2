require('dotenv').config();
const {getPagingData,getPagination} = require('_helpers/comunes.js');
const { Op } = require("sequelize");


var Publicacion = require('../models/index').Publicacion;
var Oferta = require('../models/index').Oferta;
var CalificacionPublicacion = require('../models/index').CalificacionPublicacion;
var PublicacionDescartada = require('../models/index').PublicacionDescartada;


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
    
    
    var publicaciones_descartadas =  await PublicacionDescartada.findAll(
        {where : 
            {user_id: req.user.id} 
        })
        .then(data => {
            return data.map(a => a.publicacion_id);
        })
        .catch(() => {
            return []
        });


    


    const amigos = await userService.getFriends(req.user.id);
    let ids_amigos = amigos.map(a => a.id);
    
    var params = {
        activa: true,
        id: {[Op.notIn]:publicaciones_descartadas},
        user_id:  {[Op.not]:req.user.id},
        [Op.or]:{
            ver_todos: true,
            user_id: {
                [Op.in]: ids_amigos,
            }
            
        },
        es_necesidad: req.query.es_necesidad === "true" ? true : false
    }


    if(req.query.descripcion != null)
        params.descripcion = {[Op.iLike]: '%'+req.query.descripcion+'%'}


    //console.log(params)

    
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);


    var order_by = 'id'
    var order_as = 'ASC'

    if(req.query.order_by != null)
        order_by = req.query.order_by
    
    if(req.query.order_as != null)
        order_as = req.query.order_as

        

    var data = await Publicacion.findAndCountAll({
        include: ['user','categoria'],
        offset: offset,
        limit: limit,
        where: params,
        order: [
                [order_by, order_as],
        ],
      });

    return getPagingData(data, page, limit);
}



async function getMisPublicaciones(req) {
    
    var params = {
        activa: req.query.activa === "true" ? true : false,
        user_id: req.user.id,
        es_necesidad: req.query.es_necesidad === "true" ? true : false
    }

    if(req.query.descripcion != null)
        params.descripcion = {[Op.iLike]: '%'+req.query.descripcion+'%'}
        
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);

    var data = await Publicacion.findAndCountAll({
        include: ['user','categoria','oferta_aceptada'],
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


async function calificar(id, params,comentarista_id) {
    params.publicacion_id = parseInt(id)
    params.comentarista_id = comentarista_id

    await CalificacionPublicacion.create(params);
}

async function reactivar(id, params) {
    const publicacion = await getPublicacion(id);
    Object.assign(publicacion, {activa:true});
    await publicacion.save();

    await Oferta.update({ es_vieja : true },{ where : { publicacion_id : id }});

    return publicacion;
}