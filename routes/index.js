var app = require('../app.js');
var express = require('express');
var Sequelize = require('sequelize');
var router = express.Router();
var http = require('http');
var db = require('../server/models/index');
var utils = require('./utils')
var lastTemp = 0;
var tabTemp = [];
var tabHeart = [];

var cookie = require('cookie-parser');
//var cookie = require('cookie');

//app.use(cookie());

var sequelize = new Sequelize('iot', 'iot', 'iot', {
    host: '172.18.0.2',
    port: '5432',
    dialect: 'postgres',
  
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
  
    // SQLite only
    storage: 'path/to/database.sqlite',
  
    // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
    operatorsAliases: false
  });


/* GET home page. */
/*
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Express' });
});

router.get('/email/:msg', function (req,res,next) {
    var msg = req.params.msg;
    res.mailer.send(
        {
            template: 'email', // REQUIRED
            cc: 'abdou2393@gmail.com'
        },
        {
            to: 'infos1989@gmail.com',
            subject: msg,
            otherProperty: 'Other Property'
        },
        function (err) {
            if (err) {
                console.log(err);
                res.send('There was an error sending the email');
                return;
            };
            res.send('Email Sent');
        }
    );

    

});*/


router.get('/', function (req,res,next) {
    var SerialPort = require('serialport');
    var Readline = SerialPort.parsers.readline;
    var Readable = require('stream').Readable;
    var app = require('../app');
    const Delimiter = SerialPort.parsers.Delimiter;
    var io = require('../bin/www');
    var heart_beat_values = new Readable();
    var temperature_values = new Readable();
    var portName = '/dev/ttyACM0';
    var sp = new SerialPort(portName, {
        baudRate: 115200,
        parser : Readline
    });

    var pars = sp.pipe(new Delimiter({ delimiter: '\n'}));
    pars.on('data',function(input) {
        var values = input.toString("utf-8").slice(0, -1).split(":");
        console.log(values[0]);
        console.log(values[1]);

    heart_beat_values.push(values[0]);
    temperature_values.push(values[1]);
    });


    heart_beat_values._read = function noop() {};
    temperature_values._read = function noop() {};


    io.on('connection', function (socket) {
            heart_beat_values.on('data', function (inp) {
            socket.emit('heart', {message: inp.toString("utf-8")});
            const heart_beat =  db["heartBeat"].build({
                value : parseFloat(inp.toString("utf-8")),
                date: Date.now(),
                time: new Date(),
                hour: new Date().getHours() - 1
            });
            heart_beat.save().then(() =>{
                console.log("----------------------- Persist heart beat");
            })
        });
        //moyenne();
    });

    

    io.on('connection', function (socket) {
        temperature_values.on('data', function (inp) {
            socket.emit('temperature', {message: inp.toString("utf-8")});
            if(parseFloat(inp.toString("utf-8")) != lastTemp){
                lastTemp = parseFloat(inp.toString("utf-8"));
                const Temps =  db["Temps"].build({
                    value : parseFloat(inp.toString("utf-8")),
                    date: Date.now(),
                    time: new Date(),
                    hour: new Date().getHours() - 1
                });
                Temps.save().then(() =>{
                    console.log("----------------------- Persist Temp");
                })
            }
        });
    });

    var pDate = new Date();  
    pDate.setDate(pDate.getDate());
 
    averageHeartBeatByhour(pDate);
    averageTempByhour(pDate);

    var cookie = req.cookies.cHeart;
    console.log("cookie "+cookie);
    
    res.render('home', {title : 'arduino page', varHeart : tabHeart,
         varTemp: tabTemp.join(','), varDate : pDate});
});

//average heart beat by hour
function averageHeartBeatByhour(day){
        var countElem = 0;
        var sumElem = 0;
        db["heartBeat"].findAndCountAll({
            where: {
                date: day
            },
            order: [
                'hour'
            ]
        }).then(data => {
            db["heartBeat"].sum('value', {
                where: {
                    date: day
                }
            }).then(sum => {
                console.log("+++++" + sum / data.count);
            for(var i = 0; i < 24; i++){
               data.rows.forEach((elem) => {
                   if(i == elem.hour){
                        countElem += 1;
                        sumElem += elem.value;
                   }
               });
               if((countElem) === 0)
                tabHeart.push(0); 
                 
               else tabHeart.push(sumElem / countElem);
                    
               //console.log("tab -" + tabHeart);
               countElem = 0;
               sumElem = 0;

               
            }
            callback(null,tabHeart);
            console.log("-->"+tabHeart);
            
              });
        });
        
}

//average temperature by hour
function averageTempByhour(day){
    var countElem = 0;
    var sumElem = 0;
    
    db["Temps"].findAndCountAll({
        where: {
            date: day
        },
        order: [
            'hour'
        ]
    }).then(data => {
        db["Temps"].sum('value', {
            where: {
                date: day
            }
        }).then(sum => {
            console.log("T+++++" + sum / data.count);
        for(var i = 0; i < 24; i++){
           data.rows.forEach((elem) => {
               if(i == elem.hour){
                    countElem += 1;
                    sumElem += elem.value;
               }
           });
           if((countElem) === 0)
            tabTemp.push(0);
           else tabTemp.push(sumElem / countElem);

           countElem = 0;
           sumElem = 0;
        }

       
          });
    });
   
}

module.exports = router;
