require('dotenv').config();
const {getPagingData,getPagination} = require('_helpers/comunes.js');
const { Op } = require("sequelize");


var Categoria = require('../models/index').Categoria;


module.exports = {
    getAll
}

async function getAll(req) {
    var params = {}

    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);

    var data = await Categoria.findAndCountAll({
        offset: offset,
        limit: limit,
        where: params
      });

    return getPagingData(data, page, limit);
}
