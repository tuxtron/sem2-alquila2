require('dotenv').config();
const {getPagingData,getPagination} = require('_helpers/comunes.js');
const { Op } = require("sequelize");

const publicacionService = require('../publicaciones/publicacion.service');


var Oferta = require('../models/index').Oferta;


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

    const oferta = await getOferta(id);
    Object.assign(oferta, {elegida:true});
    await oferta.save();

    const publicacion = await publicacionService.getPublicacion(oferta.publicacion_id);
    Object.assign(publicacion, {activa:false});
    await publicacion.save();

    return oferta;
}



async function rechazarOferta(id) {

    const oferta = await getOferta(id);
    Object.assign(oferta, {es_vieja:true});
    await oferta.save();


    return oferta;
}



async function getOferta(id) {
    const oferta = await Oferta.findByPk(id, {
        include: ['user','publicacion']
    }).then( async(oferta) => {
        return oferta
    });

    if (!oferta) throw 'Oferta no encontrado';

    return oferta;
}

