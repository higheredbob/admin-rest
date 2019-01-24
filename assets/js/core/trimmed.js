var marker;
//L.svg().addTo(maptwo);
var layerControl = L.control.groupedLayers(baseLayers, overlayLayers);
//layerControlR = L.control.layers( overlayLayersR);
//layerControlO = L.control.layers( overlayLayersO);
var zoom = L.control.zoom({zoomInText: '', zoomOutText: '',position: 'topleft'})
layerControl.addTo(map);
zoom.addTo(map);

layerLoader.addTo(map);
var sidebar = L.control.sidebar('sidebar', {autoPan: false, closeButton: false});
sidebar.addTo(map);

//layerControlR.addTo(map);
//layerControlO.addTo(map);
var searchControl = new L.Control.Search({
  url: 'https://nominatim.openstreetmap.org/search?format=json&q={s}',
  jsonpParam: 'json_callback',
  propertyName: 'display_name',
  propertyLoc: ['lat', 'lon'],
  circleLocation: false,
  autoType: false,
  autoCollapse: false,
  minLength: 2,
  zoom: 13,
  textPlaceholder: 'Search Addresses',
  collapsed: false,
  //moveToLocation: function(latlng, title, map) {
  //  var zoom = map.getBoundsZoom(latlng.layer.getBounds());
  //  map.setView(latlng, zoom);
  //}
  //buildTip: function(text, val){
  //    var type = val.layer.feature.properties;
  //    return '<a href="#" class="'+type+'">'+text+'<b>'+type+'</b></a>';
  //}
});
searchControl.addTo(map);
searchControl.on('search:locationfound', function(e){
  console.log(e);
  //map.fire('click', {latlng:e.latlng});
  searchControl.collapse();
  if(marker){
    map.removeLayer(marker);
  }
  //var name = e.display_name;
  marker = new L.marker([e.latlng.lat, e.latlng.lng], {icon: wiicon}).addTo(map);
  searchControl.addTo(map);
  //moveToLocation(e.latlng, name, map);
  //if(e.layer._popup) {
  //  e.layer.openPopup();
  //}
});







function setTextareaWidth() {
        var widthMaps = $('#map').width() - 15;
        $('#geoInput').width(widthMaps);
        //$('#geoOutput').width(widthMaps);
    }


 setTextareaWidth();

function identifyData(ray, config){
  if(config.addProperties != ""){
    f = config.addProperties;
    props = ray.f;
  } else {
    f = {};
    props = ray.f;
  }
 var  redef = {
              "type": "FeatureCollection",
              "features": [
              {
                "type": "Feature",
                "properties" : props,
                "type": config.geoType,
                "coordinates": [
                  [
                    ray.geometry.coordinates,
                  ]
                ]
              }
            ]
          };
var newray = [];
for(var i = 0; i < redef.features.length; i++){
    f = redef.features[i];
  }
if(config.geoType == "Polygon") {

  newray.push(turf.featureCollection(turf.polygon(f.geometry.coordinates, f.properties)));
} else if(config.geoType == "multiPolygon") {
  newray.push(turf.featureCollection(turf.multiPolygon(f.geometry.coordinates, f.properties)));
} else if(config.geoType == "lineString") {
  newray.push(turf.featureCollection(turf.lineString(f.geometry.coordinates, f.properties)));
} else if(config.geoType == "multiLineString") {
  newray.push(turf.featureCollection(turf.multiLineString(f.geometry.coordinates, f.properties)));
}
return newray;
}



/*
custBar = L.control.custom({
            position: 'bottomleft',
            content : '<div class="btn-toolbar" role="toolbar">'+
                        '<div id="totalV" class="btn-group mr-2" role="group" aria-label="first group">'+
                      '    <button id="lyrbtn" class="btn btn-sm btn-danger type="button">'+
                      '       <i class="material-icons" >layers</i>'+
                      '    </button>'+
                      '    <button id="drawbtn" class="btn btn-sm btn-info" type="button" id="styleditorbtn">'+
                      '       <i class="mdi mdi-marker" ></i>'+
                      '    </button>'+
                      '    <button id="clickNext" class="btn btn-sm btn-primary" type="button">'+
                      '       <i class="material-icons">local_offer</i>'+
                      '    </button>'+
                      //'    <button class="btn btn-sm btn-rose" type="button">'+
                      //'       <i class="material-icons">location_history</i>'+
                      //'    </button>'+
                      //'    <button class="btn btn-sm btn-success" type="button">'+
                      //'       <i class="material-icons">my_location</i>'+
                      //'    </button>'+
                      //'    <button class="btn btn-sm btn-warning" type="button">'+
                      //'       <i class="material-icons">map</i>'+
                      //'    </button>'+
                      '  </div>'+
                      '</div>',
            classes : 'btn-group-vertical btn-group-sm',
            style   :
            {
                margin: '8px 10px 8px',
                width: '15px',
                padding: '0',
                cursor: 'pointer'
            },
            datas   :
            {
                'foo': 'bar',
            },
            events:
            {
                click: function(data)
                {
                    console.log('wrapper div element clicked');
                    console.log(data);
                },
                dblclick: function(data)
                {
                    console.log('wrapper div element dblclicked');
                    console.log(data);
                },
                contextmenu: function(data)
                {
                    console.log('wrapper div element contextmenu');
                    console.log(data);
                },
            }
        });
        custBar.addTo(map);

*/









function loadpleth(){

function getColor(d){
    return  d > 3200 ? '#fff9c4' :
            d > 2800 ? '#fff4a0' :
            d > 2000 ? '#fff280' :
            d > 1800 ? '#fff060':
            d > 1200 ? '#ffee40' :
            d > 980 ? '#ffec20' :
            d > 860 ? '#ffea00' :
            d > 740 ? '#ffc969' :
            d > 620 ? '#ffb754' :
            d > 500 ? '#ffa53f' :
            d > 380 ? '#ff932a' :
            d > 280 ? '#ff8a65' :
            d > 180 ? '#f67a56' :
            d > 108 ? '#f06f49' :
            d > 84 ? '#ea643c' :
            d > 62 ? '#e4592f' :
            d > 32 ? '#de4e22' :
            d > 24 ? '#d84315' :
            d > 16 ? '#bf360c' :
            d > 10 ? '#b3300a' :
            d > 6 ? '#aa2e0a' :
            d > 4 ? '#a12c0a' :
            d > 2 ? '#982a0a' :
            d > 1 ? '#8f280a' :
                    '#86260a';
}

$.getJSON('data/finished.geojson', function (geojson) {
var geojsonlayer;
// ... our listeners


geojsonlayer = L.geoJson();
function plethstyle(feature) {
    return {
        fillColor: getColor(feature.visits),
        weight: 3,
        opacity: 0.15,
        color: '#c12700',
        dashArray: '1',
        fillOpacity: 0.75
    };
}

function plethhighlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        dashArray: '',
        fillOpacity: 0.5
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    plethinfo.update(layer.feature);
}
function plethresetHighlight(e) {
    geojsonlayer.resetStyle(e.target);
    plethinfo.update();
}
function plethzoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}
function plethonEachFeature(feature, layer) {
    layer.on({
        mouseover: plethhighlightFeature,
        mouseout: plethresetHighlight,
        click: plethzoomToFeature
    });
}

geojsonlayer = L.geoJson(geojson, {
    style: plethstyle,
    onEachFeature: plethonEachFeature
}).addTo(map);

var plethinfo = L.control();

plethinfo.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
plethinfo.update = function (props) {
    this._div.innerHTML = '<h4>Visits to Locations</h4>' +  (props ?
        '<b>' + props.visits + '</b><br />' + props.visits / 30 + ' hours / loc<sup></sup>'
        : 'Hover over a Tract');
  };

  plethinfo.addTo(map);
  });
}


$('#chorostart').click(function(){
  loadpleth();
});

$('#menuWrangle').click(function(){

});

function animLate(){
  var toCluster = features1.features;
  var maxDist = 0.35;
  var minPoints = 4;
  clusterMap = turf.clustersDbscan(features1, maxDist, {minPoints: minPoints})
  values = [];
  turf.clusterEach(clusterMap, 'cluster', function(cluster, clusterValue, currentIndex){
    console.log(cluster);
    console.log(clusterValue);
    console.log(currentIndex);
    values.push(clusterValue);
    centroid = turf.centroid(cluster);

  featureLayerD3.addData(centroid);
});
  forceChart()
}

function forceChart(){
  //$('#c3Gauge').modal('show')
  height = 980;
  width = 1800;
  clusterCount = 0;
  var nodes = d3.range(features1.features.length).map(function(i) {
clusterCount ++;
return {
    type: clusterMap.features[i].properties.cluster,
    radius: clusterMap.features[i].properties.rad / 6,
    duration: clusterMap.features[i].properties.dur * 135,
    fixed: false,
    //type: i,
    x: clusterMap.features[i].geometry.coordinates[0], //(i + 1) * (width / 6),
    y: clusterMap.features[i].geometry.coordinates[1]
    };
  });
  var xScale = d3.scaleLinear().domain([0,1]).range([0,width]);
  var yScale = d3.scaleLinear().domain([0,1]).range([height,0]);
  var color = d3.scaleOrdinal(d3.schemePaired);
 // var color = d3.scaleOrdinal()
  //      .range(['#f15525','#e84a5f','#266db8','#f37b2f','#c82a3f','#1352d2','#c3f71c','#fe4038','#8400ff']);

  var sim = d3.forceSimulation(nodes)
    .force('charge', d3.forceManyBody().strength(28))
    .force('x', d3.forceX().x(function(d){return d.x}))
    .force('y', d3.forceY().y(function(d){return d.y}))
    //.force('center', d3.forceCenter(width / 2, height / 2))
    .force('collision', d3.forceCollide().radius(function(d){return d.radius}))
    //.size([width, height])
    .on('tick', ticked);

  var svg = d3.select(map.getPanes().overlayPane).append('svg');
  //.attr('width', width)
  //.attr('height', height);

var g = svg.append('g').attr('class', 'overlay-group');
  var transform = d3.geoTransform({point: projectPoint});
  var path = d3.geoPath().projection(transform);

  //g.append('rect')
  //.attr('width', width)
  //.attr('height', height)
  map.on('mousemove', mousemoved);
  g.selectAll('circle')
    .data(nodes)
    .enter().append('circle')
    .attr('cx', function(d) {return d.x})
    .attr('cy', function(d) {return d.y})
    .attr('r', function(d) { return d.radius; })
    .style('fill', function(d) { return color(d.type);})
    .on('mousemove', mousemoved);
    var p0;
    //force.start();
    //force.force();
    function mousemoved(e) {
      //console.log(e);
      da = e;
      p1 = e.latlng;
      p0 = p1;
      var node = {
        radius: Math.random() * 5 + 1,
        type: Math.random() * clusterCount | 0,
        x: e.containerPoint.x,
        y: e.containerPoint.y,
        px: (e.containerPoint.x || (e.containerPoint.x = e.containerPoint.x)),
        py: e.containerPoint.y
      };
      g.append('circle')
        .data(node)
        .attr('cx', function(d) { return d.x; })
        .attr('cy', function(d) { return d.y; })
        .attr('r', function(d)  { return d.radius})
        .style('fill', function(d) {return color(d.type);})
        .style('opacity', 0.6)
      .transition()
        .delay(3000)
        .attr('r', 1e-6)
        .on('end', function() {nodes.splice(6, 1); })
        .remove();

        nodes.push(node);
        sim.alpha([0.7]);
        sim.nodes(nodes);
}
        function ticked() {
          var u = d3.select('g')
                  .selectAll('circle')
                  .data(nodes);
              u.enter()
                .append('circle')
                .attr('r', function(d) {
                  return d.radius;
                })
                .style('fill', function(d) {
                  return color(d.type);
                })
                .merge(u)
                .attr('cx', function(d) {
                  return d.x;
                })
                .attr('cy', function(d) {
                  return d.y
                })
                u.exit().remove();
}


/*
          var q = d3.quadtree(nodes),
          k = e.alpha * 0.1,
          i = 0,
          n = nodes.length,
          o;

          while (++i < n) {
            o = nodes[i];
            if (o.fixed) continue;
            c = nodes[o.type];
            o.x += (c.x - o.x) * k;
            o.y += (c.y - o.y) * k;
            q.visit(collide(o));
          }
          svg.selectAll('circle')
            .attr('cx', function(d) {return d.x;})
            .attr('cy', function(d) {return d.y;});
        }
        function collide(node) {
          var r = node.radius + 16,
          nx1 = node.x - r,
          nx2 = node.x + r,
          ny1 = node.y - r,
          ny2 = node.y + r;
          return function(quad, x1, y1, x2, y2) {
            if (quad.point && (quad.point !== node)) {
              var x = node.x - quad.point.x,
              y = node.y - quad.point.y,
              l = Matj.sqrt(x * x + y * y),
              r = node.radius + quad.point.radius;
              if ( l < r) {
                l = (l - r) / l * .5;
                node.px += x * l;
                node.py += y * l;
              }
            }
            return x1 > nx2
                || x2 < nx1
                || y1 > ny2
                || y2 < ny1;
          }
        }
        */
    }




function ptsLines(){

    var timecounter = 0;
    var modcounter = 0;
    var bombkeeper = [];
    var setBombDelay = function() {
      for(var i = 0, max = timeArray.length; i < max; i++){
        var timeDiff =  timeArray[i].mins * 425 //Date.parse(timeArray[i].dropoff) - Date.parse(timeArray[i].pickup);
        timecounter += 25;
        var rodiff = timeDiff + timecounter;
        var r = propsholder[i].dist4
        modcounter = (timeArray[i].modified + 20) * 215;
        //bombkeeper[i] = [];
        bombkeeper.push({delay: rodiff, r:r, mod: modcounter, hr: timeArray[i].hour + 1})  ; // Speed up the animation, otherwise it would take 24 hours ><
      }
    }
    setBombDelay();
  animPoint(timecounter, bombkeeper);
}
function animPoint(timecounter, bombkeeper) {
  //var animlayer = L.d3SvgOverlay(function(sel, proj){
  animlayer = L.niceLayer(function(sel, proj){
    var dsel = d3.select(map.getPanes().overlayPane);
    dsel.selectAll("svg.running-path").remove();
    var svg = dsel.append('svg').attr("class", "running-path");
    g = svg.append('g').attr("class", "leaflet-zoom-hide");
    var transform = d3.geoTransform({point: projectPoint});
    var path = d3.geoPath().projection(transform);

    var linedata = features1.features;


     var color = d3.scaleOrdinal()
          .range(['#880000','#9c2020','#b03c3c','#c05858','#ac783c','#bc8c4c','#e09470','#fcbc94','#ffcc99'])

    var ptlngrp = sel.append('g')
        .attr('id', 'ptsgrp');
        /*
    aLine = ptlngrp.selectAll('.aline')
      .data([collect.features])
      .enter().append('path')
      .attr('class', 'aline');
  */
    var aPoint = ptlngrp.selectAll('.apoint')
      .data(features1.features)
      .enter().append('circle')
      .attr('class', 'apoint')
      .attr('cx', function(d) { return proj.latLngToLayerPoint([d.geometry.coordinates[1], d.geometry.coordinates[0]]).x})
      .attr('cy', function(d) { return proj.latLngToLayerPoint([d.geometry.coordinates[1], d.geometry.coordinates[0]]).y})
      .attr('r', 0.1)
      .style('fill', '#ffff99')
      .style('opacity', 1);


 function timez(){

  var datecounter = 0
  for(var i = 0; i < timeArray.length; ++i){
    var mins = (timeArray[i].mins / 20);
    datecounter += mins;
  }
  //datecounter = datecounter * 60000;

  // Setup future date object
  var dateObj = Date.parse(new Date());
  var future = dateObj + datecounter;
  var newdate = new Date(future);

  var x = d3.scaleTime()
          .domain([new Date(), newdate])
          .range([0, 1000]);

  // Append the xAxis on top
  var xAxis = sel.append('g')
                 .attr('id', 'xAxis')
                 .attr('transform', 'translate(20, -340)')
                 .style('stroke', '#fff')
                 .call(d3.axisTop(x));




    // Grab the longest delay for the xAxis marker
    var longestDelay = timecounter;
    //bombkeeper[bombkeeper.length - 1].delay;

    // Changes the radius of the earthquakes to their magnitue using a transition
    // and the delay created from the setQuakeDelay function
      var blowbomb = sel.selectAll('.apoint').data(linedata)
      .transition()
      .ease(d3.easeLinear)
      .delay(function(d, i) { var ran = bombkeeper[i].delay; if(ran > 200000){ var rewa = ran / 8;} else if(ran < -1) { var rewa = 15000 * Math.random(1,9) } else {var rewa = ran } return rewa})
      .duration(function(d, i) { return bombkeeper[i].mod})
      .attr('r', function(d, i) {  if(bombkeeper[i].r < 0.1){(a = bombkeeper[i].r + 24) * 20} else if(bombkeeper[i].r < 0.5){(a = bombkeeper[i].r + 21) * 17} else if(bombkeeper[i].r < 0.95){(a = bombkeeper[i].r + 18) * 15} else if(bombkeeper[i].r < 1.5){(a = bombkeeper[i].r) * 12} else{ a = bombkeeper[i].r * 14} return a})
      .style('opacity', 0)
      .style('fill', function(d){return color(d.hr)});


    var timeline = xAxis.append('circle')
         .attr('class', 'transition-circle')
         .attr('cx', 0)
         .attr('cy', 0)
         .attr('r', 7)
         .style('fill', 'red')
         .transition()
         .ease(d3.easeSinInOut)
         .duration(longestDelay + 2000)
         .attr('cx', 1445)
         .remove();
}
    function reseting(){
       var bounds = map.getBounds(),
       TLe = map.latLngToLayerPoint(bounds.getNorthWest()),
       BRi = map.latLngToLayerPoint(bounds.getSouthEast());
       sel.select("svg").style('width', map.getSize().x + "px")
              .style('height', map.getSize().y + "px")
              .style('left', TLe.x + "px")
              .style('top', TLe.y + "px");




          aPoint.selectAll('.apoint').data(linedata).attr("transform", function(d) { return "translate(" + proj.latLngToLayerPoint(d.geometry.coordinates).x + "," +  proj.latLngToLayerPoint(d.geometry.coordinates).y + ")" })
              timez();
            }

  map.on("viewreset", reseting)
  //ptlinerender(path, aLine);
  reseting();

});
  animlayer.addTo(map);
}



function showthemall(){
  var timeeval = 0;
  var markers = new L.MarkerClusterGroup();

  for (var i = 0; i < collect.features.length; i++) {
   var  f = collect.features[i];

    if (f.geometry) {
      var marker = new L.marker(
            new L.LatLng(f.geometry.coordinates[0][1], f.geometry.coordinates[0][0]), { id: f.properties.id, icon: miicon }
    );
    };
    marker.on("click", function(event){
      console.log(event);
      sortelements(event);
});

  map.addLayer(marker);

  }
//maptwo.addLayer(markers)
}

function sortelements(event){
for(var i = 0; i < collect.features.length; ++i){
  var da = collect.features[i];
  if(event.target.options.id == da.properties.id ){
    var f = da;
    break;
  }
}

  if(f.geometry){
    var reducedata = f;
    var nawr = [];
    for(var i = 0; i < f.geometry.coordinates.length; ++i){
      var xa = f.properties.timeFeatures[i].id
      nawr.push(xa)
    }
    var newfilter = features1.features.filter(function(item) {
      return nawr.indexOf(item.properties.medallion) !== -1;
    })
  animateAll(newfilter);

  }

}
  function animateAll(filter) {
    //var timer;
    var d3overlay = L.d3SvgOverlay(function(selection, projection){
      var color = d3.scaleOrdinal()
                .range(['#cb6a43','#db5e25','#e17262','#cd3d2c','#dd3825','#8d5b32','#a1662e','#bb7a40','#c27217','#e88500','#ff9700','#ffad55','#00623b','#008049','#387f5c','#539773','#6cb08b','#84c9a3','#63c893','#8c433a','#a34638','#b54437','#cd3d2c','#ee6755']);
      var offsetColor = d3.scaleOrdinal()
                .range(['#ffd740','#ff9100','#7c4dff','#e64a19','#00e676','#536dfe','#76ff03']);


// Group to hold all of the earthquake elements
var gQuakes = selection.append('g')
                 .attr('id', 'all-quakes');


     var quake = filter;

    // Create a group with the quake id to hold the quake circle and pulse circle
    var earthquakeGroups = gQuakes.selectAll('g')
       .data(quake)
       .enter().append('g')
       .attr('id', function(d) {
           return d.properties.medallion;
       })
       .attr('class', 'quake-group');

    //Create the pulse-circle circles for the earthquake pulse
    gQuakes.selectAll('.quake-group')
       .append('circle')
       .attr('class', 'circle pulse-circle')
       .attr('cx', function(d)  { return projection.latLngToLayerPoint([d.geometry.coordinates[1], d.geometry.coordinates[0]]).x})
       .attr('cy', function(d)  { return projection.latLngToLayerPoint([d.geometry.coordinates[1], d.geometry.coordinates[0]]).y})
       .attr('r', function(d) {
           return 0;
       })
       .attr('fill', '#fff');


    // Create the main quake circle with title
    gQuakes.selectAll('.quake-group')
      .append('circle')
      .attr('r', 0 )
      .attr('cx', function(d)  { return projection.latLngToLayerPoint([d.geometry.coordinates[1], d.geometry.coordinates[0]]).x})
      .attr('cy', function(d)  { return projection.latLngToLayerPoint([d.geometry.coordinates[1], d.geometry.coordinates[0]]).y})
      .attr('class', 'circle quake-circle')
      .style('fill', 'red')
      .style('opacity', 0.95)
      .append('title')
      .text(function(d) {
        return 'Magnitude ' + d.properties.dist4 + ' ' + d.properties.pickuptime;
      });
   function trans(){
  var datecounter = 0
  for(var i = 0; i < filter.length; ++i){
    var mins = (10000 * filter[i].properties.dur) / 1900;
    datecounter += mins;
  }
  //datecounter = datecounter * 60000;

  // Setup 24 hours ago object
  var dateObj = Date.parse(new Date());
  var future = dateObj + datecounter;
  var newdate = new Date(future);

var x = d3.scaleTime()
            .domain([new Date(), newdate])
            .range([0, 680]);
//width - margin.right - margin.left
  // Append the xAxis on top
  var xAxis = selection.append('g')
                 .attr('id', 'xAxis')
                 .attr('transform', 'translate(20, -190)')
                 .style('stroke', '#fff')
                 .call(d3.axisTop(x));


    var timecounter = 0;
    var setQuakeDelay = function() {
      for(var i = 0, max = quake.length; i < max; i++){
        var timeDiff =  Date.parse(quake[i].properties.dropofftime) - Date.parse(quake[i].properties.pickuptime);
        timecounter += timeDiff;
        //var timedodad = Date.parse(timeno);
       // var timenoob = (timeDiff * 9000) + timedodad
        //var timeDiffObj = new Date(timenoob);
        quake[i].delay = timecounter / 18200; // Speed up the animation, otherwise it would take 24 hours ><
      }
    }
    setQuakeDelay();

    // Grab the longest delay for the xAxis marker
    var longestDelay = quake[quake.length - 1].delay;

    // Changes the radius of the earthquakes to their magnitue using a transition
    // and the delay created from the setQuakeDelay function
    var quakeCircles = selection.selectAll('.quake-circle')
       .data(quake)
       .transition()
       .ease(d3.easeLinear)
       .delay(function(d) {
         return d.delay / 1.95 ;
       })
       .duration(2100)
       .attr('r', function(d) {

         if(d.properties.rad  <= 1) {
           return 9;
         } else if(d.properties.rad < 12) {
            return d.properties.rad * 1.6 * Math.random(1,6)
         }else {
           return d.properties.rad * 0.55 * Math.random();
         }
       })
       .style('opacity', 0.1)
       .style("fill", function(d) {return color(d.properties.rad)})


       var pulseCircles = selection.selectAll('.pulse-circle')
       .data(quake)
       .transition()
       .ease(d3.easeLinear)
       .delay(function(d) {
         return d.delay / 1.9 ;

       })
       .duration(2100)
       .attr('r', function(d) {
         if(d.properties.rad <= 1) {
           return 2.1 * 8 * Math.random(1,10);
         } else if(d.properties.rad < 12) {
            return d.properties.rad * 1.8 * Math.random(1,7)
         } else {
           return d.properties.rad * 0.65 * Math.random(1,2);
         }
       })
       .style('opacity', 0.1)
       .style("fill", function(d) {return offsetColor(d.properties.rad)})
       .style('stoke', '#fff')
       .style('stroke-width', 0.5)
       .style('stoke-opacity', 0.5)


    // Add the time marker that moves across the xAxis while the animation it playing.
    // It's not perfectly in sync, but it's close enough for this example. The length of
    // the animation is equal to the longest delay that we calculated earlier.
    var timeline = xAxis.append('circle')
         .attr('class', 'transition-circle')
         .attr('cx', 0)
         .attr('cy', 0)
         .attr('r', 4)
         .style('fill', 'red')
         .transition()
         .ease(d3.easeSinInOut)
         .duration(longestDelay + 2000)
         .attr('cx', 675)
         .remove();
}
    var timeno = new Date();
    var collection = { type: "FeatureCollection", features: [filter]};
    // Function that calculates the difference between the earthquake and 24 hours ago and
    // creates a delay property.
    function reseting(){
       var bounds = maptwo.getBounds(),
       TLe = map.latLngToLayerPoint(bounds.getNorthWest()),
       BRi = map.latLngToLayerPoint(bounds.getSouthEast());
       selection.select("svg").style('width', map.getSize().x + "px")
              .style('height', map.getSize().y + "px")
              .style('left', TLe.x + "px")
              .style('top', TLe.y + "px");


          gQuakes.selectAll('circle').data(filter).attr("transform", function(d) { return "translate(" + projection.latLngToLayerPoint(d.geometry.coordinates).x + "," +  projection.latLngToLayerPoint(d.geometry.coordinates).y + ")" });

              trans();

    }
    //maptwo.on('viewreset', reseting);
    //maptwo.on('zoomend', reseting);
    reseting();

})
d3overlay.addTo(map);
}




$('#d3loading').click(function(){
  d3file = 'data/8-18.geojson';
  var type = 'nicelayer';
  animationGenerator(type);
})
function shownice(collection){
  //turfray = {};
  //turfray[0] = [];
  //turfray[0].geometry = [];
  //turfray[0].properties = {};
  //for (var i = 0; i < collection.features.length; ++i){
    turfray = collection.features.map(function(d) {
      newpoints = turf.point([d.geometry.coordinates[1], d.geometry.coordinates[0]], { dist4: d.properties.dist4, medallion: d.properties.medallion, rad: d.properties.rad, pickuptime: d.properties.pickuptime, dropofftime: d.properties.dropofftime, dur: d.properties.dur, accuracy: d.properties.Accuracy, mod: d.properties.mod});
      return newpoints;
    });

    //collectionTurf = turf.point(collection.features.map(function(d){return d.geometry.coordinates}), {properties:collection.features.map(function(d){return d.properties})});
    //turfray[i].geometry = [];
    //turfray[i].geometry.push(collectionTurf);
    //turfray[i].properties = []
    //turfray[i].properties.push(collection.features[i].properties);

  //}
  //turfray = collectionTurf;
  featuresTurf = turf.featureCollection(turfray);
   nodes = d3.range(turfray.length).map(function(i) {

        return {
            type: turfray[i].properties.dist4,
            id: turfray[i].properties.medallion,
            radius: turfray[i].properties.rad / 6,
            durExpanded: turfray[i].properties.dur * 135,
            duration: turfray[i].properties.dur,
            start: turfray[i].properties.pickuptime,
            end: turfray[i].properties.dropofftime,
            differenceMs: Date.parse(turfray[i].properties.dropofftime) - Date.parse(turfray[i].properties.pickuptime),
            //type: i,
            x: turfray[i].geometry.coordinates[0], //(i + 1) * (width / 6),
            y: turfray[i].geometry.coordinates[1],
            xy: turfray[i].geometry.coordinates,
            };
          });
   var marker = new L.marker(new L.latLng(turfray[0].geometry.coordinates[0],turfray[0].geometry.coordinates[1]), {icon: miicon});
      var Emarker = new L.marker(new L.latLng(turfray[turfray.length - 1].geometry.coordinates[0], turfray[turfray.length - 1].geometry.coordinates[1]), {icon: wiicon})
      marker.on('click', function(e){
        timeNice(e, nodes)
      })
      marker.addTo(map);
      Emarker.addTo(map);

}
function timeNice(e, nodes) {
  var zoomSnap = 0.1;
  var zoomDelta = 0.5;
  var wheelPxPerZoomLevel = 100;
  var azlayer = new L.niceLayer({zIndex:0}).addTo(map);


}

function niceMarkers(nodes){


  niceSvg = new L.niceLayer({zIndex: 1}).addTo(map);
    g = d3.select(niceSvg.getPathRoot());
    line = d3.line()
      .curve(d3.curveLinear)
      .x(function(d) {return rpath(d.xy).x})
      .y(function(d) {return rpath(d.xy).y});

   var ptFeatures = g.selectAll("circle")
                .data(nodes)
                .enter()
                .append("circle")
                .attr("r", 3)
                .attr("class", "waypoints");

   var linePath = g.selectAll(".lineConnect")
                .data([nodes])
                .enter()
                .append("path")
                .attr("class", "lineConnect");
        linePath.append('.lineConnect')
                .style( 'stroke', 'Blue')
                .stryle( 'fill', 'none')
                .style('stroke-width', '6px' )
                .style("opacity", ".6");

          var marker = g.append("circle")
                .attr("r", 10)
                .attr("id", "marker")
                .attr("class", "travelMarker");



        reset(niceSvg);
        niceSvg.resetSvg = reset;
        transition();
        function reset(layer) {
           var line = d3.line()
                  .curve(d3.curveLinear)
                  .x(function(d) {
                    console.log(d);
                    return applyLayer(d.xy).x;
                  })
                  .y(function(d){
                    return applyLayer(d.xy).y;
                  })

                  ptFeatures.attr("transform",
                    function (d) {
                      console.log(d);
                        return "translate(" +
                            applyLayer(d).x + "," +
                            applyLayer(d).y + ")";
                    });
                   marker.attr("transform",
                    function (d) {
                      console.log(d);
                        //var y = featuresdata[0].geometry.coordinates[1];
                        //var x = featuresdata[0].geometry.coordinates[0];
                        return "translate(" +
                            layer.getMap().latLngToLayerPoint(new L.LatLng(d.y, d.x)).x + "," +
                            layer.getMap().latLngToLayerPoint(new L.LatLng(d.y, d.x)).y + ")";
                    });
                    linePath.attr("d", line).call(transitpath);
}

    function transitpath(path) {
      path.transition()
          .duration(function(d){
            doncole.log(d);
            return d.dur * (d.distance + (d.mod * d.mod));
          })
          .attrTween("stroke-dasharray", tweenDash)

    }
    function tweenDash() {
      var l = this.getTotalLength(),
          i = d3.interpolateString("0, " + l, l + "," + l);
          xa = this;
          return function(d, i, a) {
      return function(t) {;
          var p = x.getPointAtLength(t * l);
          ptmarker = d3.select('#navmark');
            ptmarker.attr('transform', "translate("+p.x+","+p.y+")")
            if(tweenToggle == 0){
              tweenToggle = 1;
              var newCenter = map.layerPointToLatLng(new L.Point(p.x,p.y));
              map.panTo(newCenter, 14);
            } else {
              tweenToggle = 0;
            }
            return i(t);
          }
        }
    };

}
function applyLayer(d){
  y = d[1];
  x = d[0];
  point = map.latLngToLayerPoint(new L.LatLng(y,x));
  return d3.geoStream({
    points: function(x,y){
      this.stream.point(point.x, point.y);
  }})
}
/*
function niceMarkers(nodes){
  overlayNice = new L.niceOverlay(function(sel, proj) {
    niceSvg = L.niceLayer({zIndex: 1}).addTo(map);
    g = d3.select(niceSvg.getPathRoot());
    function paintLine(lines){
    var line = d3.line()
      .curve(d3.curveLinear)
      .x(function(d) {console.log(d); return proj.applyTwo(d.xy).x})
      .y(function(d) {console.log(d); return proj.applyTwo(d.xy).y});
     console.log(line);
     sel.append('path')
      .datum(lines)
      .attr({
        "class": 'niceline',
        'd': line,
        'fill': "transparent",
        'stroke': 'steelblue',
        'stroke-width': 0.5,
        'shape-rendering': 'crispEdges'
      })
    }
    function paintPointPath(points) {
      console.log(points);
      sel.append('g')
        .selectAll('circle')
        .data(points)
        .enter()
        .append('circle')
        .attr({
          'cx': function (d) {
            return proj.applyToLayer(d.xy).x;
          },
          'cy': function (d) {
            return proj.applyToLayer(d.xy).y
          },
          'r': 2
        });
    }
    function paints(){
      paintLine(nodes[0]);
      paintLine(nodes[1]);
      paintPointPath(nodes[0])
    }
    function painting(){
      paintPointPath(nodes[0])
    }
    function delayed(callback) {
      setTimeout(function(){
        console.log("hi");
        callback(null);
      }, 10)
    }
   delayed(paints);
   delayed(painting);
  });
  overlayNice.addTo(map)
};
      //sel = g;
       //featuresdata = collection.features.filter(function(d){
       // return d;
      //});
      */
   /*

      var niceFeatures = sel.selectAll('circle')
        .data(nodes)
        .enter()
        .append('circle')
        .attr('r', 3)
        .attr('class', 'niceWay');

      var nicepath = sel.selectAll('.niceConnect')
        .data([nodes])
        .enter()
        .append('path')
        .attr('class', 'niceConnect')

      var nicePu = sel.append('circle')
        .attr('r', 1)
        .attr('id', 'nicePul')
        .attr('class', 'NicePulse')

      var nicePull = sel.append('circle')
        .attr('r', 3)
        .attr('id', 'nicePull')
        .attr('class', 'NicePulse')

      var niceMk = sel.append('circle')
        .attr('r', 10)
        .attr('id', 'nicelydone')
        .attr('class', 'travelNice')



        reset(niceSvg);
        niceSvg.resetSvg = reset;
        //transition();

        function reset(layer){
          var applyLayer = function(d){
            var y = d.geometry.coordinates[1];
            var x = d.geometry.coordinates[0];
            return layer.getMap().latLngToLayerPoint(new L.LatLng(y,x));
          }
          niceFeatures.attr("transform",
            function (d) {
              return "translate(" +
                proj.coordsToPoint(d.xy).x + "," +
                proj.coordsToPoint(d.xy).y + ")";
            });
          var toLine = d3.line()
          .curve(d3.curveLinear)
          .x(function (d) {
            return applyLayer(d).x;
          })
          .y(function (d) {
            return applyLayer(d).y;
          });
          nicepath.attr('d', toLine).call(proj.transitionTween(nicepath, TweenDash));
        }
        function transition(){
          nicepath.transition()
            .duration(duration)
            .attrTween('stroke-dasharray', TweenDash);
        }
        function TweenDash(){
          return function(t){
            var l = nicepath.node().getTotalLength();
             i = d3.interpolateString('0, ' + l, l + "," + l);
             var marks = d3.select('#nicelydone')
             var pulses = d3.select('circle').selectAll('.NicePulse')
             var p = nicepath.node().getPointAtLength(t * l);
             marks.attr("transform", "translate("+p.x+","+p.y+")");
             pulses.attr("transform", "translate("+p.x+","+p.y+")");
             if(tweenToggle == 0){
              tweenToggle = 1;
              var newCenter = map.layerPointToLatLng(new L.Point(p.x,p.y));
              map.panTo(newCenter, 14);
            } else {
              tweenToggle = 0;
            }
            return i(t);
          }
        }
    });
    overlayNice.addTo(map);
  };

*/







    // Clear button to clear output map and output geojson text area:
    $('#btnOutputClear').click(function(){
        map.clearLayers();
        featuresOut.clearLayers();
        featureLayer.clearLayers();
        $('#demoImage').parent().remove();
        $('#geoOutput').val('');
        intersectL = [];
        bufferL = [];
    });


function routingInit(caller){
  var len = collect.features.length;
  routes = [];

  function sortgeom(array) {
    raylen = array.geometry.coordinates.length;
    returnray = [];
    console.log(array.geometry.coordinates);
    for( var w = 0; w < raylen; w++){
      returnray.push(new L.latLng(array.geometry.coordinates[w][1], array.geometry.coordinates[w][0]));
    }
    return returnray;
  }
  function sortRoute(array) {
    var arrlen = array.length;
    var copyray = [];
    for(var w = 0; w < arrlen; w++) {
      copyray.push(array[w]);
    }
    return copyray;
  }
  for(var i = 0; i < len; i++) {

    routes[i] = [];
    ltlgs[i] = [];
  }
  for(var i = 0; i < len; i++) {
     r = collect.features[i];
     //ltlgs[i].push(sortgeom(r))
     routes[i].push(L.Routing.control({waypoints: sortgeom(r), geocoder: L.Control.Geocoder.nominatim()}).addTo(map));

  }

}
    $('#clean').click(function(){
        var len = features1.features.length;
        result = [];
        for(var i = 0; i < len; i++){
            result.push(turf.cleanCoords(features1.features[i]).geometry.coordinates);
        }
        resultOut = {
            "type": "FeatureCollection",
            "features": result
        };
        //result = turf.cleanCoords(features1.geometry.coordinates).geometry.coordinates;
        var resultShow = L.marker(result, {
            style: style,
            onEachFeature: onEachFeature
        });
        featuresLayer.addLayer(resultShow).addTo(map);
        //maptwo.fitBounds(resultShow.getBounds());

    });

    //to polyline
    $('#toPolyline').click(function(){
        var len = features1.features.length;
        geo = features1.features;
        result = [];
        for(var i = 0; i < len; i++){

            result.push(new L.LatLng(geo[i].geometry.coordinates[1], geo[i].geometry.coordinates[0]));
        }
      //res = turf.featurecollection(result);
      featureLayer.addLayer(L.marker(result[0]));
      featureLayer.addLayer(L.marker(result[len - 1]));
      var resultShow = L.polyline(result);
      featureLayer.addLayer(resultShow).addTo(map);

  });


    $('#clusterKmeans').click(function(){
        var options = {numberOfClusters: 25};
        result = [];
        var len = features1.features.length;
            clustered = turf.clustersKmeans(features1, options);
        for(var i = 0; i < clustered.features.length; i++){
            result.push(new L.LatLng(clustered.features[i].properties.centroid[1], clustered.features[i].properties.centroid[0]));
        }
        console.log(result);
        for(var i = 0; i < result.length; i++){
        featureLayer.addLayer(L.circleMarker(result[i]));
    }
    });
    function clusterDbscan(){
      var maxDistance = 75;
      var result = [];
      var len = features1.features.length;
      var clustered = turf.clustersDbscan(features1, maxDistance);
      for(var i = 0; i < clustered.features.length; i++) {
        result.push(new L.latLng(clustered.features[i].properties.centroid[1], clustered.features[i].properties.centroid[0]));
        featureLayer.addData(L.circleMarker(result[i]));
      }
    }
    function measurePointDist(){
      var measured = [];
      var len = features1.features.length;
      var opts = {units: 'miles'};
      for(var i = 0; i < len; i++) {
        var f = features1.features;
        var from = f[i].geometry.coordinates;
        var to = f[i+1].geometry.coordinates;
        measured.push(turf.distance(from, to, opts));
      }
      featureLayer.addData(measured);
    }
    $('#clusterDBscan').click(function(){
      clusterDbscan();
    });
    $('#distPoint').click(function(){
      measurePointDist();
    });



$('#styleditorbtn').click(function(){
  let styleEditor = L.control.styleEditor({
    position: 'topleft',
    useGrouping: false
  });
  map.addControl(styleEditor);
  let drawnItems = new L.FeatureGroup();
  featureLayer.addLayer(drawnItems);

  let drawControl = new L.Control.Draw({
    draw: {
      position: 'topleft',
      polygon: {
        title: 'Draw a sexy polygon!',
        allowIntersection: false,
        drawError: {
          color: '#b00b00',
          timeout: 1000
        },
        shapeOptions: {
          color: '#bada55'
        },
        showArea: true
      },
      polyline: {
        metric: false
      },
      circle: {
        shapeOptions: {
          color: '#662d91'
        }
      },
      marker: {
        icon: styleEditor.getDefaultIcon()
      }
    },
    edit: {
      featureGroup: drawnItems
    }
  });
  map.addControl(drawControl);
  map.on('draw:created', function(e){
    let type = e.layerType,
    layer = e.layer;
    if(type === 'marker') {
      layer.bindPopup('A popup');
    }
    drawnItems.addLayer(layer);
  });
});
//$('#menuchart').removeClass('show');
//  $('#chartDrop').attr('aria-expanded', "false");

$('#menuWrangle').click(function(){
  $('#wrangleModal').modal('show');
});
$('#clusterDBscan').click(function(){

});





    $('#kinks').click(function(){
        var data = [];

        $.each(featuresdata[0].features, function(i1,v1){
            kinks = turf.kinks(v1.geometry).intersections;

            for (var i=0; i<kinks.features.length; i++) {
                data.push(kinks.features[i]);
            }
        });

        result = {
            "type": "FeatureCollection",
            "features": data
        };

        // Add result to output map:
        var resultShow = L.geoJson(result, {
            width: 5,
            color: 'red',
        });
        featuresOut.addLayer(resultShow).addTo(map);

        var showFeatures = L.geoJson(featuresdata[0], {
            width: 5,
            color: 'red',
        });
        featuresOut.addLayer(showFeatures).addTo(map);
    });

$("#geo-stats").click(function(){
  if(timeArray){

    var result = {};

    var traveladd = 0;
    var timeadd = 0;
    for(key in timelen) {

      timeadd = timeadd +  timelen[key];
      traveladd = traveladd +  proplen[key];
    }
    var minutes = timeadd/60000;
    var hours = minutes/60;
    var reportRange = timeout[0][0].pickup;
    var travelDist = traveladd;

    result = {minutes: minutes, hours: hours, daterange:reportRange, travelDistance:travelDist};

  } else if(geojson){
    var visitcount = 0;
    for(var i = 0; i < geojson.features.length; i++){
      counting = geojson.features[i].visits;
      visitcount = visitcount + counting;

    }
    result = {totalVisits: visitcount};
  }
   var output = JSON.stringify(result, null, '\t');
    var outputText = $('#geoOutput').val(output);
});
