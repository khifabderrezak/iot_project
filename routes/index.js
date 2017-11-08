var express = require('express');
var router = express.Router();
var http = require('http');

/* GET home page. */
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

    //res.render('index', {title : msg});

});


router.get('/arduino', function (req,res,next) {
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
        console.log("hdhdhhd");
        console.log(values[0]+"             "+values[1]);
        heart_beat_values.push(values[0]);
        temperature_values.push(values[1]);
            });


    heart_beat_values._read = function noop() {};
    temperature_values._read = function noop() {};


    io.on('connection', function (socket) {
            heart_beat_values.on('data', function (inp) {
            socket.emit('heart', {message: inp.toString("utf-8")});
        });
    });


    io.on('connection', function (socket) {
        temperature_values.on('data', function (inp) {
            socket.emit('temperature', {message: inp.toString("utf-8")});
        });
    });

    res.render('home', {title : 'arduino page'});
});




module.exports = router;
