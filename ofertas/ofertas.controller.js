const express = require('express');
const router = express.Router();
const authorize = require('_middleware/authorize')
const ofertaService = require('./oferta.service');
const validations = require('./ofertas.validations');

//routes
router.get('/getOfertaPublicacion/:publicacion_id(\\d+)', authorize(), getAllOfertas);
router.get('/mis_ofertas', authorize(), getMisOfertas);
router.get('/:id(\\d+)', authorize(), getOfertaById);
router.post('/elegir_oferta/:id(\\d+)', authorize(), elegirOferta);
router.post('/rechazar_oferta/:id(\\d+)', authorize(), rechazarOferta);
router.post('/store/:publicacion_id(\\d+)', authorize(), validations.createOfertaSchema, createOferta);


module.exports = router;

function getAllOfertas(req, res, next) {
    ofertaService.getAllOfertas(req)
        .then(oferta => res.json(oferta))
        .catch(next);
}

function getMisOfertas(req, res, next) {
    ofertaService.getMisOfertas(req)
        .then(ofertas => res.json(ofertas))
        .catch(next);
}

function getOfertaById(req, res, next) {
    ofertaService.getOferta(req.params.id, req.user.id)
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

function rechazarOferta(req, res, next) {
    ofertaService.rechazarOferta(req.params.id)
    .then(_ => res.json("Oferta rechazada"))
    .catch(next);
}
