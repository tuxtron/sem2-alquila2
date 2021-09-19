const express = require('express');
const mongoose = require('mongoose');
const consola = require("consola");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    consola.success('SERVER: Listening to port', port, '...');
});