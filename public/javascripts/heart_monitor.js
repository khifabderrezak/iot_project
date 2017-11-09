var rythme_heart = 0;
window.onload = function monitor() {

    var svg = null;
    var latestBeat = null;
    var insideBeat = false;
    var data = [];
    var SECONDS_SAMPLE = 5;
    var BEAT_TIME = 500;
    var TICK_FREQUENCY = SECONDS_SAMPLE * 1000 / BEAT_TIME;
    var BEAT_VALUES = [];
    var socket = io.connect('/');
    var beep0 = document.createElement('audio');
    beep0.src = '/static/ecg/0.mp3';
    var beep1 = document.createElement('audio');
    beep1.src = '/static/ecg/1.mp3';

    socket.on('heart', function(data) {
        console.log(data.message);
        $('#heart').html(data.message);
        rythme_heart = parseInt(data.message);
        if (rythme_heart===0){
            BEAT_VALUES = [0];
        }else{
            BEAT_VALUES = [0, 0, 3, -4, 10, -7, 3, 0, 0];
        }
        //alert(rythme_heart);
        //$(".heart, .heart:focus").css("-moz-animation-duration",rythme_heart+"s");
        //window.onload(monitor(parseFloat(data.message)))

    });
    function beat() {

        if (insideBeat) return;
        insideBeat = true;

        var now = new Date();
        var nowTime = now.getTime();
        if (BEAT_VALUES.length > 1){
            //beep0.end();
            beep1.play();
            //alert("1     "+BEAT_VALUES.length);
        }else{
           beep0.play(); 
           //alert("0      "+BEAT_VALUES.length);
        } 
        if (data.length > 0 && data[data.length - 1].date > now) {
            data.splice(data.length - 1, 1);
        }

        data.push({
            date: now,
            value: 0
        });
        var step = BEAT_TIME / BEAT_VALUES.length - 2;

        
        for (var i = 1; i < BEAT_VALUES.length; i++) {
            data.push({
                date: new Date(nowTime + i * step),
                value: BEAT_VALUES[i]
            });
        }
        latestBeat = now;
        setTimeout(function() {
            insideBeat = false;
        }, BEAT_TIME);
    }


    var svgWrapper = document.getElementById("svg-wrapper");
    var margin = {left: 10, top: 10, right: 10, bottom: 10},
        width = svgWrapper.offsetWidth - margin.left - margin.right,
        height = svgWrapper.offsetHeight - margin.top - margin.bottom;

// create SVG
    svg = d3.select('#svg-wrapper').append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.bottom + margin.top)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// init scales
    var now = new Date(),
        fromDate = new Date(now.getTime() - SECONDS_SAMPLE * 1000);

// create initial set of data
    data.push({
        date: now,
        value: 0
    });

    var x = d3.time.scale()
            .domain([fromDate, new Date(now.getTime())])
            .range([0, width]),
        y = d3.scale.linear()
            .domain([-10, 10])
            .range([height, 0]);

    var line = d3.svg.line()
        .interpolate("basis")
        .x(function(d) {
            return x(d.date);
        })
        .y(function(d) {
            return y(d.value);
        });

// add clipPath
    svg.append("defs").append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("width", width)
        .attr("height", height);

    var path = svg.append("g")
        .attr("clip-path", "url(#clip)")
        .append("path")
        .attr("class", "line");

    svg.select(".line")
        .attr("d", line(data));

    var transition = d3.select("path").transition()
        .duration(200)
        .ease("linear");

    (function tick() {

        transition = transition.each(function() {

            // update the domains
            now = new Date();
            fromDate = new Date(now.getTime() - SECONDS_SAMPLE * 1000);
            x.domain([fromDate, new Date(now.getTime() - 100)]);

            var translateTo = x(new Date(fromDate.getTime()) - 100);

            // redraw the line
            svg.select(".line")
                .attr("d", line(data))
                .attr("transform", null)
                .transition()
                .attr("transform", "translate(" + translateTo + ")");
        }).transition().each("start", tick);
    })();

    setInterval(function() {

        now = new Date();
        fromDate = new Date(now.getTime() - SECONDS_SAMPLE * 1000);

        for (var i = 0; i < data.length; i++) {
            if (data[i].date < fromDate) {
                data.shift();
            } else {
                break;
            }
        }
        if (insideBeat) return;

        data.push({
            date: now,
            value: 0
        });

    }, TICK_FREQUENCY);

    function periodicall() {
        beat();
        setTimeout(periodicall, 60 / rythme_heart * 1000);
    };
    periodicall();
};
//$(".heart").css("-moz-animation-duration",60/rythme_heart+"s");

