'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const db = {};

require('dotenv').config();


let database    = process.env.PG_DATABASE
let user        = process.env.PG_USER
let password    = process.env.PG_PASSWORD
let host        = process.env.PG_HOST
let port        = process.env.PG_PORT

const sequelize = new Sequelize(database, user, password, {
		logging: false,
		host: host,
		port: port,
		dialect: 'postgres',
        dialectOptions: {
            ssl: {
              rejectUnauthorized: false
            }
        }
});


fs
	.readdirSync(__dirname)
	.filter(file => {
		return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
	})
	.forEach(file => {
		const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
		db[model.name] = model;
	});

Object.keys(db).forEach(modelName => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
