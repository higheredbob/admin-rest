



function set_markers(collect){
    var marker = new L.marker(
            new L.LatLng(collect.geometry.coordinates[0][1], collect.geometry.coordinates[0][0], {id:'start-marker', icon: tlicon})
        )

 featureLayerD3.addData(marker);



var tweenToggle = 0;


var topLeft,bottomRight;

var time = moment();


var running = {
    "distance":0,
    "time":0,
    "hour":0,
    "Time_at_radius":0,
    "POI":0,
    "WorkorHome":0
} ;



var svg = d3.select(map.getPanes().overlayPane).append("svg"),
g = svg.append("g").attr("class", "leaflet-zoom-hide");


//area chart
var margin = {top: 30, right: 20, bottom: 20, left: 40},
areaChartWidth = $(window).width() - margin.left - margin.right -40,
areaChartHeight = 140 - margin.top - margin.bottom;

var parseDate = d3.time.format("%d-%b-%y").parse;

var x = d3.scale.linear()
.range([0, areaChartWidth]);

var y = d3.scale.linear()
.range([areaChartHeight, 0]);

var xAxis = d3.svg.axis()
.scale(x)
.orient("bottom");

var yAxis = d3.svg.axis()
.scale(y)
.orient("left")
.ticks(4);

var area = d3.svg.area()
.x(function(d) { return x(d.time); })
.y0(areaChartHeight)
.y1(function(d) { return y(d.location); });

var areaChartSvg = d3.select(".areaChartBox").append("svg")
.attr("width", areaChartWidth + margin.left + margin.right)
.attr("height", areaChartHeight + margin.top + margin.bottom)
.attr("class","areaChart")
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var markerLine = areaChartSvg.append('line')
.attr('x1', 0)
.attr('y1', 0)
.attr('x2', 0)
.attr('y2', areaChartHeight )
.attr("class","chartLine");

var dummyData = [];

durScale = d3.scale.linear()
  .domain([0, 100])
  .range([0,1])
  .clamp(true);



x.domain([0, 24]);
y.domain([0, 600]);

var chartPath = areaChartSvg.append("path")
.datum(dummyData)
.attr("class", "chartArea");
//.attr("d", area);

areaChartSvg.append("g")
.attr("class", "chartX")
.attr("transform", "translate(0," + areaChartHeight + ")")
.call(xAxis)
.append("text")
.attr("y", 9)
.attr("x", 39)
.attr("dy", ".71em")
.style("text-anchor", "end")
.text("Hour");

areaChartSvg.append("g")
.attr("class", "chartY")
.call(yAxis)
.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 6)
.attr("dy", ".71em")
.style("text-anchor", "end")
.text("Location (xy)");

durScale = d3.scale.linear()
  .domain([0, 100])
  .range([0,1])
  .clamp(true);

//end area chart
newslideUI = document.getElementById('slower');
newslideField = document.getElementsByClassName('timeFactor');
noUiSlider.create(newslideUI, {
  start: 25,
 // tooltips: [slider({decimals: 1 })],;
  connect: [true,false],
  range: {
    min: 0,
    max: 100
  }
});
newslideUI.noUiSlider.on('update', function (values, handle) {
    newslideField.innerHTML = values[handle];
    newslideVal = values[handle];
    //updateTimer();
});

var timeFactor = 6; //number of minutes in real life to a second in the viz
$('.timeFactor').html(newslideVal); //Displays the timeFactor in the UI.

range_counter = 0;
var nodes = d3.range(collect.length).map(function(i) {
    range_counter += collect[i].properties.raw_duration;
    nodes[i] = [];
    return {
        start: collect[i].geometry.coordinates[0],
        end: collect[i].geomertry.coordinates[1],
        start_travel: true,
        end_travel: false,
        id: collect[i].properties.id,
        counter: i,
        timestamp: collect[i].pickuptime,
        current_duration: collect[i].properties.secdur,
        next_duration: collect[i].properties.raw_duration,
        next_distance: collect[i].properties.turf_distance,
        coordinates: collect[i].geometry.coordinates,
        total_duration: range_counter,
        duration_average: (range_counter / collect.length),
        timer: time,

    };
});
function move_time(i){
    var node = {
        duration_up: durScale(newslideVal) * nodes[nodes.length - 1].duration_average;
        duration_down: durScale(newslideVal) /  nodes[nodes.length - 1].duration_average;
        alt_up: durScale(newslideVal) * 200;
        alt_down:  durScale(newslideVal) / 200;
    }
    nodes[i].push(node)

}
var timer;
function update_time(i){
    if(nodes[i].next_duration < 60000 || nodes[i].next_distance < 0.002) {
        time.add(nodes[i].duration_up, 'seconds');
        $('.readableTime').text(time.format('h:mm a'));
        $('.date').text(time.format('dddd, MMMM Do YYYY'));
        timer = setTimeout(function(){update_time()}, (100*nodes[i].duration_up))
    } else {
        time.add(nodes[i].alt_up, 'seconds');
        $('.readableTime').text(time.format('h:mm a'));
        $('.date').text(time.format('dddd, MMMM Do YYYY'));
        timer = setTimeout(function(){update_time()}, (10*nodes[i].alt_up))
    }

}
//end time-series



//start initial mapping functions
        var animLayer = new L.SvgLayer({ zIndex: 2 }).addTo(map);
        var g = d3.select(animLayer.getPathRoot());
        var transform = d3.geo.transform({ point: projectPoint }),
        d3path = d3.geo.path().projection(transform);

//data assignments

feature = g.selectAll("path")
    .data(nodes)
    .enter().append("path")
    .attr("id", function (d) {
        var a = "trip"+d.counter
        return a;
    })
    .attr('class', function(d){
        var b = "trip"+d.counter+" end "+d.end_travel;

        return b
    })
    .attr("style", "opacity:0");

    var pointsArray = [];
    var points = g.selectAll(".point")
        .data(pointsArray);




var outmarkT = g.append("circle");
    outmarkT.attr('r', 15)
        .attr('id', 'outmarkTruck');
var markerT = g.append("circle");
    markerT.attr("r", 5)
        .attr("id", "markerTruck");

//location functions


          // when the user zooms in or out you need to reset the view



var i = 0;

function iterate() {

    var chartInterval = 0;

    var emptyData = [];

    var emptyPath = areaChartSvg.append("path")
        .datum(emptyData)
        .attr("class", "emptyChart");



    var path = animLayer.select("#trip" + i)
        .attr("opacity", "0.7")
        .attr('d', d3path)
        .call(transition);



    function pathStartPoint(path) {
        var d = path.attr('d');

        dsplitted = d.split("L")[0].slice(1).split(",");
        var point = [];
        point[0]=parseInt(dsplitted[0]);
        point[1]=parseInt(dsplitted[1]);

        return point;
    }


    var startPoint = pathStartPoint(path);
    outmarkT.attr('transform', 'translate('+ startPoint[0] + ',' + startPoint[1] + ")");
    markerT.attr("transform", "translate(" + startPoint[0] + "," + startPoint[1] + ")");

//transitions

path.each(function(d){

//add the translation of the map's g element
    startPoint[0] = startPoint[0]; //+ topLeft[0];
    startPoint[1] = startPoint[1]; //+ topLeft[1];
    var newLatLon = coordToLatLon(startPoint);
    pointsArray.push([newLatLon.lng,newLatLon.lat,d.start_travel]);


    points = g.selectAll(".point")
        .data(pointsArray)
        .enter()
        .append('circle')
        .attr("r",5)
        .attr("class",function(d){

          console.log(d);
            if(d[2]) {
              console.log(d[2]);
                return "startPoint point";
            } else {
                return "endPoint point";
            }
        })
            .attr("transform",function(d){
                return translatePoint(d);
            });

if(d.start_travel) { //transition marker to show full taxi
  outmarkT
    .transition()
      .duration(1500)
      .attr('r', 14)
      .attr('style', 'opacity:0.75')
      .attr('fill', '#f55f30')
    .transition()
      .duration(750)
      .attr('r', 55)
      .attr('style', 'opacity:0.05')
      .attr('fill', '#821d57')
    .transition()
      .duration(750)
      .attr('r', 3)
      .attr('fill', '#ad1457')
      .attr('opacity', '0.7');

  markerT
   .transition()
        .duration(375)
        .attr("r",1)
        .attr('style','opacity:1')
    .transition()
        .duration(375)
        .attr('r', 20)
        .attr('opacity', '0.4')
        .attr('fill', '#76ff03')
    .transition()
        .duration(750)
        .attr('r', 8)
        .attr('fill', '#18ffff')
        .attr('opacity', '1')
    .transition()
        .duration(1500)
        .attr("r",35)
        .attr('fill', '#7b1fa2')
        .attr('style','opacity:.15');


function transition(path) {

    g.selectAll

    path.transition()
    .duration(function(d){
        //calculate seconds
        //var start = Date.parse(d.properties.pickuptime),
        //finish = Date.parse(d.properties.dropofftime),
        //duration = finish - start;

        //duration = duration/60000; //convert to minutes
        duration = d.current_duration / 5; // 60000;
        durmim = duration * (durScale(newslideVal)) * 70;

        time = moment(d.timestamp.toString());



        $('.readableTime').text(time.format('h:mm a'));


        return (durmim);
})
    .attrTween("stroke-dasharray", tweenDash)
    .each("end", function (d, i) {

        if(d.start_travel) {

            running.distance += parseFloat(d.distance);
            running.time += parseFloat(d.time);
            running.hour += parseFloat(d.mins/60);
            running.Time_at_radius += parseFloat(d.mod);
            running.POI += parseFloat(d.id);
            running.WorkorHome += parseFloat(d.time);



            for(var p = 0;p<d.id;p++){
                $('.passengerGlyphs').append('<span class="mdi mdi-car"></span>');
            }

            updateRunning();



        };
        i++;

//tweens
var nextPath = svg.select("#trip" + i);
        if (nextPath[0][0]==null){
            clearTimeout(timer);
        } else {
            iterate();
        }




//resets and conversion functions


});

function tweenDash(d) {

    var l = path.node().getTotalLength();
var i = d3.interpolateString("0," + l, l + "," + l); // interpolation of stroke-dasharray style attr
return function (t) {
    var marker = d3.select("#markerTruck");
    var outmark = d3.select('#outmarkTruck');
    var p = path.node().getPointAtLength(t * l);
marker.attr("transform", "translate(" + p.x + "," + p.y + ")");//move marker
outmark.attr("transform", "translate(" + p.x + "," + p.y + ")")

if (tweenToggle == 0) {
    tweenToggle = 1;
    var newCenter = map.layerPointToLatLng(new L.Point(p.x,p.y));

    map.panTo(newCenter, 8);
} else {
    tweenToggle = 0;
}


//update chart data every X frames
if(chartInterval == 5){

    chartInterval = 0;



    var decimalHour = parseInt(time.format('H')) + parseFloat(time.format('m')/60)




    if(isNaN(d.mins)){
        d.mins = 0;
    }

    var incrementalFare = d.mins*t;


    dummyData.push({
        "time": decimalHour,
        "distance": running.mins + parseFloat(incrementalFare)
    });


chartPath.attr("d", area); //redraw area chart
if(d.start_travel == false) { //draw purple area for nonfare time
    emptyData.push({
        "time": decimalHour,
        "runningFare": running.mins + parseFloat(incrementalFare)
    });

    emptyPath.attr("d", area);
}

markerLine
.attr('x1', x(decimalHour))
.attr('x2', x(decimalHour));




} else {
    chartInterval++;
}


return i(t);
}
}

}

 marker.on('click', function(){
       $('#overlay').fadeOut(250);
       $('.box').fadeIn(250);
       setTimeout(function(){
        updateTimer();
        initLoop();
       }, 500);
    });


function updateRunning() {
    $('.runningFare').text('mi'+running.distance.toFixed(2));
    $('.runningSurcharge').text('$'+running.time.toFixed(2));
    $('.runningTax').text('$'+running.hour.toFixed(2));
    $('.runningTip').text('$'+running.Time_at_radius.toFixed(2));
    $('.runningTolls').text('$'+running.POI.toFixed(2));
    $('.runningTotal').text('$'+running.WorkorHome.toFixed(2));

}
 reset(animLayer);
    animLayer.resetSvg = reset;
    reset();

function reset(layer) {
    var applyLayer = function(a,b){
        return layer.getMap().latLngToLayerPoint(new L.LatLng(a, b));
    }
    g.selectAll('.point')
        .attr('transform', function(d) {
            return 'translate(' +
                applyLayer(d.start[1],d.start[0]).x + ',' +
                applyLayer(d.start[1],d.start[0]).y + ")";
        })

         var toLine = d3.svg.line()
                    .interpolate("linear")
                    .x(function (d) {
                        return applyLayer(d.start[1],d.start[0]).x;
                    })
                    .y(function (d) {
                        return applyLayer(d.start[1],d.start[0]).y;
                    });
                    feature.attr('d', toLine);


    };


}
});
}};






















































function update() {

            previousTime = time; //keep track of the previous time before incrementing
            time = time + 86400; //increment by 24 hours
                        //get thefts that fall between the previous time and the current time
            grab = collection.filter(function(d){
                return (d.UnixResult &lt; time)&amp;&amp;(d.UnixResult &gt; previousTime);
            });

            var feature = g.selectAll("circle")
            .data(grab,function(d){
                return d.Key; //this key function tells d3 to actually keep track of which elements are entering and exiting, not just remove blindly from the end of the array
            });
                        //fade in a circle for new data
            feature.enter().append("circle").attr("fill",function(d){
                if(d.UCR==615) return "red";
                if(d.UCR==625) return "yellow";
                if(d.UCR==635) return "green";
                        //change circle radius based on zoom level
            }).attr("r",0).transition().duration(100).attr("r",function(d){
                return map.getZoom();
            });
                        //fade out yesterday's circles
            feature.exit().transition().duration(250).attr("r",0).remove();
                        //update x and y position for each circle based on the map's viewport
            feature.attr("cx",function(d) { return map.latLngToLayerPoint(d.LatLng).x});
            feature.attr("cy",function(d) { return map.latLngToLayerPoint(d.LatLng).y});

                        //repeat, every 100 milliseconds!
            setTimeout(update,100);

         }





var customTimeFormat = d3.time.format.multi([
  [".%L", function(d) { return d.getMilliseconds(); }],
  [":%S", function(d) { return d.getSeconds(); }],
  ["%I:%M", function(d) { return d.getMinutes(); }],
  ["%I %p", function(d) { return d.getHours(); }],
  ["%a %d", function(d) { return d.getDay() && d.getDate() != 1; }],
  ["%b %d", function(d) { return d.getDate() != 1; }],
  ["%B", function(d) { return d.getMonth(); }],
  ["%Y", function() { return true; }]
]);



// Format an absolute time relative to the epoch (e.g., thirty seconds after the
// epoch is formatted as "T+0:30").
function formatRelativeTime(absolute) {
  var delta = absolute - epoch;
  if (!delta) return "T";
  var milliseconds = Math.abs(delta);
  return "T" + (delta < 0 ? "-" : "+")
      + Math.floor(milliseconds / 6e4) + ":"
      + pad(Math.floor(milliseconds % 6e4 / 1e3));
}

// Convert an absolute time to a time relative to the epoch.
function toRelative(absolute) {
  return new Date(absolute - epoch);
}

// Convert a time relative to the epoch to an absolute time.
function toAbsolute(relative) {
  return new Date(+relative + +epoch);
}









  // sample 2: layer with animated path
        var animatedPathLayer = new L.SvgLayer({ zIndex: 2 }).addTo(map);
        var g = d3.select(animatedPathLayer.getPathRoot());
        //read in the GeoJSON. This function is asynchronous so
        // anything that needs the json file should be within
        d3.json("http://oliverheilig.github.io/leaflet-d3layer/points.geojson", function (collection) {
            // this is not needed right now, but for future we may need
            // to implement some filtering. This uses the d3 filter function
            // featuresdata is an array of point objects
            var featuresdata = collection.features.filter(function (d) {
                return d.properties.id == "route1";
            });
            // From now on we are essentially appending our features to the
            // group element. We're adding a class with the line name
            // and we're making them invisible
            // these are the points that make up the path
            // they are unnecessary so I've make them
            // transparent for now
            var ptFeatures = g.selectAll("circle")
                .data(featuresdata)
                .enter()
                .append("circle")
                .attr("r", 3)
                .attr("class", "waypoints");
            // Here we will make the points into a single
            // line/path. Note that we surround the featuresdata
            // with [] to tell d3 to treat all the points as a
            // single line. For now these are basically points
            // but below we set the "d" attribute using the
            // line creator function from above.
            var linePath = g.selectAll(".lineConnect")
                .data([featuresdata])
                .enter()
                .append("path")
                .attr("class", "lineConnect")
                .attr("class", "lineConnect")
                .style({ 'stroke': 'Blue', 'fill': 'none', 'stroke-width': '6px' }).style("opacity", ".6");
            // This will be our traveling circle it will
            // travel along our path
            var marker = g.append("circle")
                .attr("r", 10)
                .attr("id", "marker")
                .attr("class", "travelMarker");
            // For simplicity I hard-coded this! I'm taking
            // the first and the last object (the origin)
            // and destination and adding them separately to
            // better style them. There is probably a better
            // way to do this!
            var originANDdestination = [featuresdata[0], featuresdata[17]];
            var begend = g.selectAll(".drinks")
                .data(originANDdestination)
                .enter()
                .append("circle", ".drinks")
                .attr("r", 5)
                .style("fill", "red")
                .style("opacity", "1");
            // I want names for my coffee and beer
            var text = g.selectAll("text")
                .data(originANDdestination)
                .enter()
                .append("text")
                .text(function (d) {
                    return d.properties.name;
                })
                .attr("class", "locnames")
                .attr("y", function (d) {
                    return -10;
                });
            // when the user zooms in or out you need to reset the view
            reset(animatedPathLayer);
            animatedPathLayer.resetSvg = reset;
            transition();
            // Create and reposition the SVG to cover the features.
            function reset(layer) {
                // similar to projectPoint this function converts lat/long to
                // svg coordinates except that it accepts a point from our
                // GeoJSON
                var applyLatLngToLayer = function (d) {
                    var y = d.geometry.coordinates[1];
                    var x = d.geometry.coordinates[0];
                    return layer.getMap().latLngToLayerPoint(new L.LatLng(y, x));
                }
                // here you're setting some styles, width, heigh etc
                // to the SVG. Note that we're adding a little height and
                // width because otherwise the bounding box would perfectly
                // cover our features BUT... since you might be using a big
                // circle to represent a 1 dimensional point, the circle
                // might get cut off.
                text.attr("transform",
                    function (d) {
                        return "translate(" +
                            applyLatLngToLayer(d).x + "," +
                            applyLatLngToLayer(d).y + ")";
                    });
                // for the points we need to convert from latlong
                // to map units
                begend.attr("transform",
                    function (d) {
                        return "translate(" +
                            applyLatLngToLayer(d).x + "," +
                            applyLatLngToLayer(d).y + ")";
                    });
                ptFeatures.attr("transform",
                    function (d) {
                        return "translate(" +
                            applyLatLngToLayer(d).x + "," +
                            applyLatLngToLayer(d).y + ")";
                    });
                // again, not best practice, but I'm harding coding
                // the starting point
                marker.attr("transform",
                    function () {
                        var y = featuresdata[0].geometry.coordinates[1];
                        var x = featuresdata[0].geometry.coordinates[0];
                        return "translate(" +
                            layer.getMap().latLngToLayerPoint(new L.LatLng(y, x)).x + "," +
                            layer.getMap().latLngToLayerPoint(new L.LatLng(y, x)).y + ")";
                    });
                // Here we're creating a FUNCTION to generate a line
                // from input points. Since input points will be in
                // Lat/Long they need to be converted to map units
                // with applyLatLngToLayer
                var toLine = d3.svg.line()
                    .interpolate("linear")
                    .x(function (d) {
                        return applyLatLngToLayer(d).x;
                    })
                    .y(function (d) {
                        return applyLatLngToLayer(d).y;
                    });
                // linePath.attr("d", d3path);
                linePath.attr("d", toLine);
            } // end reset
            // the transition function could have been done above using
            // chaining but it's cleaner to have a separate function.
            // the transition. Dash array expects "500, 30" where
            // 500 is the length of the "dash" 30 is the length of the
            // gap. So if you had a line that is 500 long and you used
            // "500, 0" you would have a solid line. If you had "500,500"
            // you would have a 500px line followed by a 500px gap. This
            // can be manipulated by starting with a complete gap "0,500"
            // then a small line "1,500" then bigger line "2,500" and so
            // on. The values themselves ("0,500", "1,500" etc) are being
            // fed to the attrTween operator
            function transition() {
                linePath.transition()
                    .duration(5000)
                    .attrTween("stroke-dasharray", tweenDash)
                    .each("end", function () {
                        d3.select(this).call(transition);// infinite loop
                    });
            } //end transition
            // this function feeds the attrTween operator above with the
            // stroke and dash lengths
            function tweenDash() {
                return function (t) {
                    //total length of path (single value)
                    var l = linePath.node().getTotalLength();
                    // this is creating a function called interpolate which takes
                    // as input a single value 0-1. The function will interpolate
                    // between the numbers embedded in a string. An example might
                    // be interpolatString("0,500", "500,500") in which case
                    // the first number would interpolate through 0-500 and the
                    // second number through 500-500 (always 500). So, then
                    // if you used interpolate(0.5) you would get "250, 500"
                    // when input into the attrTween above this means give me
                    // a line of length 250 followed by a gap of 500. Since the
                    // total line length, though is only 500 to begin with this
                    // essentially says give me a line of 250px followed by a gap
                    // of 250px.
                    interpolate = d3.interpolateString("0," + l, l + "," + l);
                    //t is fraction of time 0-1 since transition began
                    var marker = d3.select("#marker");
                    // p is the point on the line (coordinates) at a given length
                    // along the line. In this case if l=50 and we're midway through
                    // the time then this would 25.
                    var p = linePath.node().getPointAtLength(t * l);
                    //Move the marker to that point
                    marker.attr("transform", "translate(" + p.x + "," + p.y + ")"); //move marker
                    //                console.log(interpolate(t))
                    return interpolate(t);
                };
            } //end tweenDash
        });
        // returns a layer group for xmap back- and foreground layers
        function getXMapBaseLayers(token, style, pane) {
            var attribution = '<a href="http://www.ptvgroup.com">PTV</a>, HERE';
            var background = L.tileLayer('https://api{s}-test.cloud.ptvgroup.com/WMS/GetTile/' +
                (style ? 'xmap-' + style + '-bg' : 'xmap-ajaxbg') + '/{x}/{y}/{z}.png', {
                    minZoom: 0, maxZoom: 19, opacity: 1.0,
                    attribution: attribution,
                    subdomains: '1234'
                });
            var foreground = new L.NonTiledLayer.WMS('https://api-test.cloud.ptvgroup.com/WMS/WMS' + (token? '?xtok=' + token : ''), {
                minZoom: 0, maxZoom: 19, opacity: 1.0,
                layers: style ? 'xmap-' + style + '-fg' : 'xmap-ajaxfg',
                format: 'image/png', transparent: true,
                attribution: attribution,
                zIndex: 1,
                pointerEvents: 'none'
            });
            return L.layerGroup([background, foreground]);
        }
    </script>








const streets  = L.tileLayer(
  'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoia3Jpc3RpbmhlbnJ5IiwiYSI6ImNqMWdxMjd5aDAwM28zM2xtaGV2azYwcjYifQ.NTJiOqcnhP-_3etf4aZYmQ',
  { id: 'mapbox.streets',   attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>' });

const map = L.map('map', {
  layers: [streets]})
  .setView([48.7792, 2.38], 14);
  //.setView([53.61614, 58.84689], 9);

// we will be appending the SVG to the Leaflet map pane
// g (group) element will be inside the svg
const svg = d3.select(map.getPanes().overlayPane).append("svg");

// if you don't include the leaflet-zoom-hide when a
// user zooms in or out you will still see the phantom
// original SVG
const g = svg.append("g").attr("class", "leaflet-zoom-hide");

const transform = d3.geoTransform({ point: projectPoint });
const d3path = d3.geoPath().projection(transform);

d3.json("https://cdn.rawgit.com/mfd/692a3f4c904f7e313a82c59f7fc63aae/raw/b41f27a04f79c93665938da4703752a9e498262a/nodes.geojson", function(collection) {
  const featuresdata = collection.features;

  // Here we're creating a FUNCTION to generate a line
  // from input points. Since input points will be in
  // Lat/Long they need to be converted to map units
  // with applyLatLngToLayer
  const toLine = d3.line()
      .curve(d3.curveLinear)
      .x((d) => applyLatLngToLayer(d).x)
      .y((d) => applyLatLngToLayer(d).y);

  // From now on we are essentially appending our features to the
  // group element. We're adding a class with the line name
  // and we're making them invisible

  // these are the points that make up the path
  // they are unnecessary so I've make them
  // transparent for now
  var ptFeatures = g.selectAll("circle")
      .data(featuresdata)
      .enter()
      .append("circle")
      .attr("r", 3)
      .attr("class", "waypoints");

  // Here we will make the points into a single
  // line/path. Note that we surround the featuresdata
  // with [] to tell d3 to treat all the points as a
  // single line. For now these are basically points
  // but below we set the "d" attribute using the
  // line creator function from above.
  var linePath = g.selectAll(".lineConnect")
      .data([featuresdata])
      .enter()
      .append("path")
      .attr("class", "lineConnect");

  // This will be our traveling circle it will
  // travel along our path
  var marker = g.append("circle")
      .attr("r", 10)
      .attr("id", "marker")
      .attr("class", "travelMarker");

  var marker_start = g.selectAll("g.start_end_point")
      .data([featuresdata[0]])
      .enter()
      .append('g')
      .attr('class', '.start_end_point');

  marker_start
      .append("circle", )
      .attr("r", 5)
      .style("fill", "red")
      .style("opacity", "1");

  marker_start
      .append("text")
      .text('!!!')
      .attr("class", "locnames")
      .attr("y", -10);

  // when the user zooms in or out you need to reset
  // the view
  map.on("viewreset", reset);

  // this puts stuff on the map!
  reset();
  transition();

  // Reposition the SVG to cover the features.
  function reset() {
      var bounds = d3path.bounds(collection),
          topLeft = bounds[0],
          bottomRight = bounds[1];

      marker_start.attr("transform", d => "translate(" + applyLatLngToLayer(d).x + "," + applyLatLngToLayer(d).y + ")");
      ptFeatures.attr("transform", d => "translate(" + applyLatLngToLayer(d).x + "," + applyLatLngToLayer(d).y + ")");
      marker.attr("transform", function() {
            const coords = featuresdata[0].geometry.coordinates;
                        const pt = map.latLngToLayerPoint(new L.LatLng(coords[1], coords[0]));
            return "translate(" + pt.x + "," + pt.y + ")";
        });

      // Setting the size and location of the overall SVG container
      svg.attr("width", bottomRight[0] - topLeft[0] + 120)
          .attr("height", bottomRight[1] - topLeft[1] + 120)
          .style("left", topLeft[0] - 50 + "px")
          .style("top", topLeft[1] - 50 + "px");

      linePath.attr("d", toLine)
      g.attr("transform", "translate(" + (-topLeft[0] + 50) + "," + (-topLeft[1] + 50) + ")");

  } // end reset

  // the transition function could have been done above using
  // chaining but it's cleaner to have a separate function.
  // the transition. Dash array expects "500, 30" where
  // 500 is the length of the "dash" 30 is the length of the
  // gap. So if you had a line that is 500 long and you used
  // "500, 0" you would have a solid line. If you had "500,500"
  // you would have a 500px line followed by a 500px gap. This
  // can be manipulated by starting with a complete gap "0,500"
  // then a small line "1,500" then bigger line "2,500" and so
  // on. The values themselves ("0,500", "1,500" etc) are being
  // fed to the attrTween operator
  function transition() {
      linePath.transition()
          .duration(18500)
          .attrTween("stroke-dasharray", tweenDash)
          //.on("end", transition); // Restart the transition at it's end
  } //end transition

  // this function feeds the attrTween operator above with the
  // stroke and dash lengths
  function tweenDash() {
      return function(t) {
          //total length of path (single value)
          var l = linePath.node().getTotalLength();

          // this is creating a function called interpolate which takes
          // as input a single value 0-1. The function will interpolate
          // between the numbers embedded in a string. An example might
          // be interpolatString("0,500", "500,500") in which case
          // the first number would interpolate through 0-500 and the
          // second number through 500-500 (always 500). So, then
          // if you used interpolate(0.5) you would get "250, 500"
          // when input into the attrTween above this means give me
          // a line of length 250 followed by a gap of 500. Since the
          // total line length, though is only 500 to begin with this
          // essentially says give me a line of 250px followed by a gap
          // of 250px.
          interpolate = d3.interpolateString("0," + l, l + "," + l);
          //t is fraction of time 0-1 since transition began

          // p is the point on the line (coordinates) at a given length
          // along the line. In this case if l=50 and we're midway through
          // the time then this would 25.
          var p = linePath.node().getPointAtLength(t * l);

          //Move the marker to that point
          marker.attr("transform", "translate(" + p.x + "," + p.y + ")"); //move marker
          return interpolate(t);
      }
  } //end tweenDash
});

function projectPoint(x, y) {
    var point = map.latLngToLayerPoint(new L.LatLng(y, x));
    this.stream.point(point.x, point.y);
}

// similar to projectPoint this function converts lat/long to
// svg coordinates except that it accepts a point from our
// GeoJSON
function applyLatLngToLayer(d) {
    return map.latLngToLayerPoint(
            new L.LatLng(d.geometry.coordinates[1], d.geometry.coordinates[0]));
}
