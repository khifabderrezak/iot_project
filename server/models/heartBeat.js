'use strict';
var db = require('../models/index');
module.exports = function(sequelize, DataTypes) {
  var heartBeat = sequelize.define('heartBeat', {
    value: DataTypes.DOUBLE,
    date: DataTypes.TIME
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  heartBeat.associate = function(models){
    heartBeat.belongsTo(models.Profil, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  }

  return heartBeat;
};



//db["Users"].BelongsTo(db["Temps"], {foreignKey : "userId"});
//db["Temps"].HasOne(db["Users"], {foreignKey : "userId"});