const express = require('express');
const router = express.Router();
const authorize = require('_middleware/authorize')
const publicacionService = require('./publicacion.service');
const validations = require('./publicaciones.validations');

//routes
router.get('/', authorize(), getAllPublicaciones);
router.get('/mis_publicaciones', authorize(), getMisPublicaciones);
router.get('/:id', authorize(), getPublicacionById);
router.post('/store', authorize(), validations.createPublicacionSchema, createPublicacion);
router.put('/:id', authorize(), validations.updatePublicacionSchema, updatePublicaciones);
router.post('/reactivar/:id(\\d+)', authorize(), reactivar);
router.post('/:id(\\d+)', authorize(), validations.calificacionSchema, calificar);

// router.delete('/:id', authorize(), removePublicaciones);

module.exports = router;

function getAllPublicaciones(req, res, next) {
    publicacionService.getAllPublicaciones(req)
        .then(publicacion => res.json(publicacion))
        .catch(next);
}

function getMisPublicaciones(req, res, next) {
    publicacionService.getMisPublicaciones(req)
        .then(publicacion => res.json(publicacion))
        .catch(next);
}



function getPublicacionById(req, res, next) {
    publicacionService.getPublicacion(req.params.id)
    .then(publicacion => res.json(publicacion))
    .catch(next);
}

function createPublicacion(req, res, next) {

    publicacionService.createPublicacion(req.body, req.user.id)
        .then(publicacion => res.json(publicacion))
        .catch(next);
}

function updatePublicaciones(req, res, next) {
    publicacionService.updatePublicacion(req.params.id, req.body)
    .then(publicacion => res.json(publicacion))
    .catch(next);
}

// function removePublicaciones(req, res, next) {
    
// }




function calificar(req, res, next) {
    publicacionService.calificar(req.params.id, req.body, req.user.id)
        .then(() => res.json({ error: false, message: 'Calificación guardada' }))
        .catch(next);
}


function reactivar(req, res, next) {
    publicacionService.reactivar(req.params.id)
        .then(() => res.json({ error: false, message: 'Calificación reactivada' }))
        .catch(next);
}
