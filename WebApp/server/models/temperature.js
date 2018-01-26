'use strict';
var db = require('../models/index');
module.exports = function(sequelize, DataTypes) {
  var Temps = sequelize.define('Temps', {
    value: DataTypes.DOUBLE,
    date: DataTypes.DATEONLY,
    time: DataTypes.TIME,
    hour: DataTypes.INTEGER,
    ProfilId: DataTypes.INTEGER
  }, {
    timestamps: false
});

  return Temps;
};