const express = require('express');
const router = express.Router();
const authorize = require('_middleware/authorize')
const userService = require('./user.service');
const validations = require('./users.validations');

// routes
router.post('/authenticate', validations.authenticateSchema, authenticate);
router.post('/register', validations.registerSchema, register);
router.get('/', authorize(), getAll);
router.get('/current', authorize(), getCurrent);
router.get('/:id', authorize(), getById);
router.put('/:id', authorize(), validations.updateSchema, update);
router.post('/:id', authorize(), validations.calificacionSchema, calificar);
//router.delete('/:id', authorize(), _delete);

module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => res.json(user))
        .catch(next);
}

function register(req, res, next) {
    userService.create(req.body)
        .then(user => res.json(user))
        .catch(next);
}

function getAll(req, res, next) {
    userService.getAll(req)
        .then(users => res.json(users))
        .catch(next);
}

function getCurrent(req, res, next) {
    res.json(req.user);
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}


function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(user => res.json(user))
        .catch(next);
}

function calificar(req, res, next) {
    userService.calificar(req.params.id, req.body)
        .then(() => res.json({ error: false, message: 'Calificación guardada' }))
        .catch(next);
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({ message: 'User eliminado' }))
        .catch(next);
}