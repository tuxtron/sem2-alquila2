const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
module.exports = { createOfertaSchema };

function createOfertaSchema(req, res, next) {
    const schema = Joi.object({
        cantidad_tiempo     : Joi.number().required(),
        unidad_tiempo       : Joi.string().required(),
        precio              : Joi.number().required(),
        descripcion         : Joi.string().required(),
        foto                : Joi.string(),
    });
    validateRequest(req, next, schema);
}
