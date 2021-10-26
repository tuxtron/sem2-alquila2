require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const {getPagingData,getPagination} = require('_helpers/comunes.js');
const { Op } = require("sequelize");
const secret = process.env.SECRETKEY

var User = require('../models/index').User;
var UserFriend = require('../models/index').UserFriend;
var CalificacionUser = require('../models/index').CalificacionUser;
var PublicacionDescartada = require('../models/index').PublicacionDescartada;



module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    calificar,
    addFriend,
    deleteFriend,
    descartarPublicacion,
    delete: _delete,
    getFriends
};

async function authenticate({ email, password }) {
    const user = await User.scope('withHash').findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.hash)))
        throw 'Usuario o contraseña incorrecta';

    const token = jwt.sign({ sub: user.id }, secret, { expiresIn: '365d' });
    return { ...omitHash(user.get()), token };
}




async function getAll(req) {
    var params = {}
    
    if(req.query.nombre != null)
        params.nombre = {[Op.like]: '%'+req.query.nombre+'%'}

    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);

    var data = await User.findAndCountAll({
        offset: offset,
        limit: limit,
        where: params
      });

    return getPagingData(data, page, limit);
}



async function getById(id) {
    return await getUser(id);
}

async function create(params) {
    if (await User.findOne({ where: { email: params.email } })) {
        throw 'Email "' + params.email + '" se encuentra en uso';
    }

    if (params.password) {
        params.hash = await bcrypt.hash(params.password, 10);
    }

    const user = await User.create(params).then( async(user) => {
        try{
            const token = jwt.sign({ sub: user.id }, secret, { expiresIn: '365d' });
            return { ...omitHash(user.get()), token };
        }catch(e){
            console.error(e);
        }
    });


    return user;
}

async function update(id, params) {
    const user = await getUser(id);


    const usernameChanged = params.email && user.email !== params.email;
    if (usernameChanged && await User.findOne({ where: { email: params.email } })) {
        throw 'Email "' + params.email + '" se encuentra en uso.';
    }

    /*if (params.password) {
        params.hash = await bcrypt.hash(params.password, 10);
    }*/

    Object.assign(user, params);
    await user.save();

    return omitHash(user.get());
}


async function calificar(id, params) {
    params.user_id = id
    await CalificacionUser.create(params);
}

async function descartarPublicacion(user_id, publicacion_id) {
    return await PublicacionDescartada.create({user_id: user_id, publicacion_id:  publicacion_id}).then(data => {
        return "Publicación descartada"
    })
    .catch(() => {
        return "Error al descartar la publicacion"
    });
}


async function addFriend(user_id, params) {

    const user = await User.findOne({ where: { telefono: params.telefono_friend } }, {
        include: []
    }).then( async(user) => {
        return user;
    });
    if (!user) throw 'User no encontrado';

    if(user_id == user.id) throw 'No puedes vincularte a ti mismo.';

    const respuesta = await UserFriend.findOne({ where:{user_id: user_id, friend_id:  user.id} }, {
        include: []
    }).then( async(relacion) => {
        console.log(relacion)
        if(!relacion){
            await UserFriend.create({user_id: user_id, friend_id:  user.id})
            await UserFriend.create({user_id: user.id, friend_id:  user_id})
            return user
        }else{
            return "Ya eres amigo de ese usuario"
        }

    });

    console.log(respuesta)
    return respuesta;
   
}

async function deleteFriend(user_id, friend_id) {
    await UserFriend.destroy({
        where: {
            [Op.or]: [{
                    user_id: user_id, 
                    friend_id:  friend_id
                },
                {
                    user_id: friend_id, 
                    friend_id:  user_id
                }
            ]
        }
     });
    return "Amigo eliminado correctamente";
   
}

async function getFriends(user_id){
    const user =await getUser(user_id);
    return user.friends;
}

async function _delete(id) {
    const user = await getUser(id);
    await user.destroy();
}



async function getUser(id) {
    const user = await User.findByPk(id, {
        include: ['calificaciones', 'friends']
    }).then( async(user) => {
        try{
            const sum = user.calificaciones.reduce( function(a, b){
                    return a + b.calificacion;
                }, 0);
            user.setDataValue("promedio",sum/user.calificaciones.length)
            return user;
        }catch(e){
            console.error(e);
        }
    });
    if (!user) throw 'User no encontrado';
    return user;
}

function omitHash(user) {
    const { hash, ...userWithoutHash } = user;
    return userWithoutHash;
}