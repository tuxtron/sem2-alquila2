'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserFriend extends Model {
    

  };
  UserFriend.init({
      user_id: { type: DataTypes.INTEGER, primaryKey: true},
      friend_id: { type: DataTypes.INTEGER, primaryKey: true},
     
  }, {
    sequelize,
    tableName: 'users_friends',
    timestamps: false
  });
  return UserFriend

};