const express = require('express');
const router = express.Router();
const authorize = require('_middleware/authorize')
const categoriaService = require('./categoria.service');


//routes
router.get('/', authorize(), getAll);


module.exports = router;

function getAll(req, res, next) {
    categoriaService.getAll(req)
        .then(categorias => res.json(categorias))
        .catch(next);
}
