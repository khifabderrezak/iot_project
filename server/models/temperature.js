'use strict';
var db = require('../models/index');
module.exports = function(sequelize, DataTypes) {
  var Temps = sequelize.define('Temps', {
    value: DataTypes.DOUBLE,
    date: DataTypes.DATEONLY,
    time: DataTypes.TIME
  }, {
    timestamps: false
});

  /* removing association between Temperature & Profil
  Temps.associate = function(models){
    Temps.belongsTo(models.Profil, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  }
*/
  return Temps;
};