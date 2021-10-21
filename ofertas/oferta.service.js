require('dotenv').config();
const {getPagingData,getPagination} = require('_helpers/comunes.js');
const { Op } = require("sequelize");


var Oferta = require('../models/index').Oferta;


module.exports = {
    getAllOfertas,
    getOferta,
    createOferta,
    elegirOferta
}

async function getAllOfertas(req) {
    var params = {
         publicacion_id: req.params.publicacion_id 
    }

    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);

    var data = await Oferta.findAndCountAll({
        include: ['user'],
        offset: offset,
        limit: limit,
        where: params
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

