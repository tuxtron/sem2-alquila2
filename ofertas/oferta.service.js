require('dotenv').config();
const {getPagingData,getPagination} = require('_helpers/comunes.js');
const { Op } = require("sequelize");

const publicacionService = require('../publicaciones/publicacion.service');


var Oferta = require('../models/index').Oferta;
var CalificacionPublicacion = require('../models/index').CalificacionPublicacion;
var CalificacionUser = require('../models/index').CalificacionUser;


module.exports = {
    getAllOfertas,
    getOferta,
    createOferta,
    elegirOferta,
    rechazarOferta,
    getMisOfertas
}

async function getAllOfertas(req) {
    var params = {
         publicacion_id: req.params.publicacion_id,
         es_vieja: false
    }

    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);

    var order_by = 'id'
    var order_as = 'ASC'

    if(req.query.order_by != null)
        order_by = req.query.order_by
    
    if(req.query.order_as != null)
        order_as = req.query.order_as

    var data = await Oferta.findAndCountAll({
        include: ['user'],
        offset: offset,
        limit: limit,
        where: params,
        order: [
                [order_by, order_as],
        ],
      });

    return getPagingData(data, page, limit);
}

async function getMisOfertas(req) {
    var params = { 
        user_id: req.user.id
    }

    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);


    var order_by = 'id'
    var order_as = 'ASC'

    if(req.query.order_by != null)
        order_by = req.query.order_by
    
    if(req.query.order_as != null)
        order_as = req.query.order_as

        
    var data = await Oferta.findAndCountAll({
        include: ['publicacion'],
        offset: offset,
        limit: limit,
        where: params,
        order: [
                [order_by, order_as],
        ],
      });

    return getPagingData(data, page, limit);
}


async function createOferta(params, publicacion_id, user_id) {
    params.user_id = user_id
    params.publicacion_id = publicacion_id

    const oferta = await Oferta.create(params).then( async(oferta) => {
        try{
            return { oferta }
        }catch(e){
            console.error(e);
        }
    });
    return oferta;
}

async function elegirOferta(id) {

    var oferta = await Oferta.findByPk(id, {
        include: []
    }).then( async(oferta) => {
        return oferta
    });


    Object.assign(oferta, {elegida:true});
    await oferta.save();

    const publicacion = await publicacionService.getPublicacion(oferta.publicacion_id);
    Object.assign(publicacion, {activa:false});
    await publicacion.save();

    return oferta;
}



async function rechazarOferta(id) {

    var oferta = await Oferta.findByPk(id, {
        include: []
    }).then( async(oferta) => {
        return oferta
    });

    Object.assign(oferta, {es_vieja:true});
    await oferta.save();


    return oferta;
}



async function getOferta(id, user_id = null) {
    var oferta = await Oferta.findByPk(id, {
        include: ['user','publicacion']
    }).then( async(oferta) => {
        return oferta
    });

    if (!oferta) throw 'Oferta no encontrado';

    oferta = oferta.toJSON();
    if(user_id != null){
        const respuesta = await CalificacionPublicacion.findOne({ where:{comentarista_id: user_id, oferta_id:  id} }).then( async(relacion) => {
            if(!relacion){
                return false;
            }else{
                return true;
            }
        });
        
        const respuesta2 = await CalificacionUser.findOne({ where:{comentarista_id: user_id, oferta_id:  id} }).then( async(relacion) => {
            if(!relacion){
                return false;
            }else{
                return true;
            }
        });
        oferta.producto_calificado = respuesta
        oferta.user_calificado = respuesta2
    }else{
        oferta.producto_calificado = false;
        oferta.user_calificado = false;
    }
    
    return oferta;
}

