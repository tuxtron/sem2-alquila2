const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
module.exports = {updateSchema, authenticateSchema, registerSchema, calificacionSchema, addFriendSchema};

function updateSchema(req, res, next) {
    const schema = Joi.object({
        nombre              : Joi.string().required(),
        apellido            : Joi.string().required(),
        email               : Joi.string().required(),
        //password            : Joi.string().min(6).required(),
        fecha_nacimiento    : Joi.date().required(),
        telefono            : Joi.string().required(),
        latitud             : Joi.number(),
        longitud            : Joi.number(),
        is_empresa          : Joi.boolean(),
    });
    validateRequest(req, next, schema);
}

function authenticateSchema(req, res, next) {
    const schema = Joi.object({
        
        email       : Joi.string().required(),
        password    : Joi.string().required()

    });
    validateRequest(req, next, schema);
}


function registerSchema(req, res, next) {
    const schema = Joi.object({

        nombre              : Joi.string().required(),
        apellido            : Joi.string().required(),
        email               : Joi.string().required(),
        password            : Joi.string().min(6).required(),
        fecha_nacimiento    : Joi.date().required(),
        telefono            : Joi.string().required(),
        is_empresa          : Joi.boolean().required(),

    });
    validateRequest(req, next, schema);
}

function calificacionSchema(req, res, next) {
    const schema = Joi.object({
        
        calificacion        : Joi.number().min(1).max(5).required(),
        comentarios         : Joi.string().required(),
        oferta_id           : Joi.number().required()

    });
    validateRequest(req, next, schema);
}



function addFriendSchema(req, res, next) {
    const schema = Joi.object({
        telefono_friend         : Joi.string().required()
    });
    validateRequest(req, next, schema);
}