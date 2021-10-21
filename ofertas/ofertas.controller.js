const express = require('express');
const router = express.Router();
const authorize = require('_middleware/authorize')
const ofertaService = require('./oferta.service');
const validations = require('./ofertas.validations');

//routes
router.get('/getOfertaPublicacion/:publicacion_id(\\d+)', authorize(), getAllOfertas);
router.get('/:id(\\d+)', authorize(), getOfertaById);
router.post('/elegir_oferta/:id(\\d+)', authorize(), elegirOferta);
router.post('/store/:publicacion_id(\\d+)', authorize(), validations.createOfertaSchema, createOferta);


module.exports = router;

function getAllOfertas(req, res, next) {
    ofertaService.getAllOfertas(req)
        .then(oferta => res.json(oferta))
        .catch(next);
}

function getOfertaById(req, res, next) {
    ofertaService.getOferta(req.params.id)
    .then(oferta => res.json(oferta))
    .catch(next);
}

function createOferta(req, res, next) {
    ofertaService.createOferta(req.body, req.params.publicacion_id, req.user.id)
        .then(oferta => res.json(oferta))
        .catch(next);
}

function elegirOferta(req, res, next) {
    ofertaService.elegirOferta(req.params.id)
    .then(_ => res.json("Oferta elegida"))
    .catch(next);
}
