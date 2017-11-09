'use strict';
var db = require('../models/index');
module.exports = function(sequelize, DataTypes) {
  var heartBeat = sequelize.define('heartBeat', {
    value: DataTypes.DOUBLE,
    date: DataTypes.DATEONLY,
    time: DataTypes.TIME,
    hour: DataTypes.INTEGER
  }, {
    timestamps: false
});
 /*removing association between HeartBeat & Profil
  heartBeat.associate = function(models){
    heartBeat.belongsTo(models.Profil, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  }*/

  return heartBeat;
};