var db = require('../server/models/index');
var express = require('express');
var path = require('path');

var utils = express();
function moyenne(){
    var listHeartBeat = db["heartBeat"].findAll({
        where: {
          date: 2017-11-09
        }
    });
    console.log(listHeartBeat);
}
module.exports = utils;