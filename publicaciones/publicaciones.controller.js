const express = require('express');
const router = express.Router();
const authorize = require('_middleware/authorize')
const publicacionService = require('./publicacion.service');
const validations = require('./publicaciones.validations');

//routes
router.get('/', authorize(), getAllPublicaciones);
router.get('/:id', authorize(), getPublicacionById);
router.post('/:id', authorize(), validations.createPublicacionSchema, createPublicacion);
router.put('/:id', authorize(), validations.updatePublicacionSchema, updatePublicaciones);
// router.delete('/:id', authorize(), removePublicaciones);

module.exports = router;

function getAllPublicaciones(req, res, next) {
    publicacionService.getAllPublicaciones(req.body)
        .then(publicacion => res.json(publicacion))
        .catch(next);
}

function getPublicacionById(req, res, next) {
    publicacionService.getPublicacionById(req.params.id)
    .then(publicacion => res.json(publicacion))
    .catch(next);
}

function createPublicacion(req, res, next) {
    publicacionService.createPublicacion(req.body)
        .then(publicacion => res.json(publucacion))
        .catch(next);
}

function updatePublicaciones(req, res, next) {
    publicacionService.update(req.params.id, req.body)
    .then(publicacion => res.json(publicacion))
    .catch(next);
}

// function removePublicaciones(req, res, next) {
    
// }


