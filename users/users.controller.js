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
router.get('/:id(\\d+)', authorize(), getById);
router.put('/:id(\\d+)', authorize(), validations.updateSchema, update);
router.post('/:id(\\d+)', authorize(), validations.calificacionSchema, calificar);
router.post('/addFriend', authorize(), validations.addFriendSchema, addFriend);
router.post('/deleteFriend/:friend_id(\\d+)', authorize(), deleteFriend);
router.post('/descartarPublicacion/:publicacion_id(\\d+)', authorize(), descartarPublicacion);
//router.delete('/:id(\\d+)', authorize(), _delete);

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
    userService.calificar(req.params.id, req.body, req.user.id)
        .then(() => res.json({ error: false, message: 'Calificación guardada' }))
        .catch(next);
}


function addFriend(req, res, next) {
    userService.addFriend(req.user.id, req.body)
        .then((respuesta) => res.json({ error: false, message: respuesta }))
        .catch(next);
}

function deleteFriend(req, res, next) {
    userService.deleteFriend(req.user.id,req.params.friend_id)
        .then((respuesta) => res.json({error: false, message: respuesta }))
        .catch(next);
}

function descartarPublicacion(req, res, next) {
    userService.descartarPublicacion(req.user.id,req.params.publicacion_id)
        .then((respuesta) => res.json({error: false, message: respuesta }))
        .catch(next);
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({ message: 'User eliminado' }))
        .catch(next);
}