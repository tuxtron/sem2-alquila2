const pg = require('pg');
const { Sequelize } = require('sequelize');

require('dotenv').config();

module.exports = db = {};

initialize();

async function initialize() {
    // // create db if it doesn't already exist
    
    // let database    = process.env.PG_DATABASE
    // let user        = process.env.PG_USER
    // let password    = process.env.PG_PASSWORD
    // let host        = process.env.PG_HOST
    // let port        = process.env.PG_PORT
    // // connect to db
    
    // const sequelize = new Sequelize(database, user, password, {
    //     logging: false,
    //     host: host,
    //     port: port,
    //     dialect: 'postgres'
    // });
    
    //await sequelize.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // init models and add them to the exported db object
    
    /*db.User = require('../models/user.model');
    db.CalificacionesUsers = require('../models/calificacion_user.model');
    

    Object.keys(db).forEach(modelName => {
        if (db[modelName].associate) {
            db[modelName].associate(db);
        }

       
    });

    */

    /*Object.keys(db).forEach(modelName => {
        db[modelName] = db[modelName](sequelize)
    });*/
    
    
    // sync all models with database
    //await sequelize.sync().catch(error => { throw error});
}

