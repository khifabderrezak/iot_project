'use strict';
module.exports = function(sequelize, DataTypes) {
  var Profil = sequelize.define('Profil', {
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    mail: DataTypes.STRING,
    password: DataTypes.STRING,
    contact: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  Profil.associate = function(models){
    Profil.hasMany(models.Temps);
  }

  return Profil;
};