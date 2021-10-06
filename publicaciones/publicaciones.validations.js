const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
module.exports = { createPublicacionSchema, updatePublicacionSchema, calificacionSchema };

function createPublicacionSchema(req, res, next) {
    const schema = Joi.object({
        descripcion         : Joi.string().required(),
        categoria_id        : Joi.number().required(),
        cantidad_tiempo     : Joi.number().required(),
        unidad_tiempo       : Joi.string().required(),
        precio              : Joi.number().required(),
        fecha_limite        : Joi.date().required(),
        ver_todos           : Joi.boolean().required(),
        user_id             : Joi.number().required(),
        es_necesidad        : Joi.boolean().required(),
        foto                : Joi.string().required(),
        activa              : Joi.boolean().required(),
    });
    validateRequest(req, next, schema);
}

function updatePublicacionSchema(req, res, next) {
    const schema = Joi.object({
        descripcion         : Joi.string().required(),
        categoria_id        : Joi.number().required(),
        cantidad_tiempo     : Joi.number().required(),
        unidad_tiempo       : Joi.string().required(),
        precio              : Joi.number().required(),
        fecha_limite        : Joi.date().required(),
        ver_todos           : Joi.boolean().required(),
        // user_id             : Joi.number().required(),
        // es_necesidad        : Joi.boolean().required(),
        foto                : Joi.string().required(),
        activa              : Joi.boolean().required(),
    });
    validateRequest(req, next, schema);
}

function calificacionSchema(req, res, next) {
    const schema = Joi.object({
        
        calificacion        : Joi.number().min(1).max(5).required(),
        comentarios         : Joi.string().required()

    });
    validateRequest(req, next, schema);
}



