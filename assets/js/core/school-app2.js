
config = {
    hoverProperty: "pickuptime",
    hoverPropertyTwo: 'dist4',
    hprop: 'dropofftime',
    hproptwo: 'dropoffx',
    hpropthree: 'dropoffy',
    base: [33.2852648,  -111.7012255],
    opts: {units: 'miles'},
    geoType: 'multiLineString',
    customerComplete: '2018-01-23'

};

$('#lastcomplete').html('<h5>Completed Imagery: '+config.customerComplete+'</h5>');

$(document).ready(function(){
var mapboxOSM = L.tileLayer("https://{s}.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token={access_token}", {
  maxZoom: 19,
  access_token: 'pk.eyJ1IjoiaGlnaGVyYm9iIiwiYSI6ImNqbzZsZXR5cDA1cDUza29qYnV1NjA0OTAifQ.pvTwwdIdX0vK0P7e18U9CQ',
  subdomains: ["a", "b", "c", "d"],
  attribution: 'Basemap <a href="https://www.mapbox.com/about/maps/" target="_blank">© Mapbox © OpenStreetMap</a>'
});

var  mapboxDark = L.tileLayer("https://{s}.tiles.mapbox.com/v3/mapbox.world-dark/{z}/{x}/{y}.png", {
  attribution: 'Basemap <a href="https://www.mapbox.com/about/maps/" target="_blank">© Mapbox © OpenStreetMap</a>'
});

var mapboxSat = L.tileLayer("https://{s}.tiles.mapbox.com/v4/mapbox.streets-satellite/{z}/{x}/{y}.png?access_token={access_token}", {
  maxZoom: 19,
  access_token: 'pk.eyJ1IjoiaGlnaGVyYm9iIiwiYSI6ImNqbzZsZXR5cDA1cDUza29qYnV1NjA0OTAifQ.pvTwwdIdX0vK0P7e18U9CQ',
  subdomains: ["a", "b", "c", "d"],
  attribution: 'Basemap <a href="https://www.mapbox.com/about/maps/" target="_blank">© Mapbox © OpenStreetMap</a>'
});
var mapboxStyled = L.tileLayer('https://api.mapbox.com/styles/v1/higherbob/cjp0uuubn0lks2smif2xgf4cy/tiles/{z}/{x}/{y}?access_token=sk.eyJ1IjoiaGlnaGVyYm9iIiwiYSI6ImNqcDFqb3owcjAxdHUzd2xieW1mcnFxZzQifQ.SglahG2gZ66A7orjOxzWKg', {
  tileSize: 512,
  zoomOffset: -1,
  attribution: '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});
var mapboxBluebox = L.tileLayer('https://api.mapbox.com/styles/v1/higherbob/cjp1ep6bn14452smi9uk1nvon/tiles/{z}/{x}/{y}?access_token=sk.eyJ1IjoiaGlnaGVyYm9iIiwiYSI6ImNqcDFqb3owcjAxdHUzd2xieW1mcnFxZzQifQ.SglahG2gZ66A7orjOxzWKg', {
  tileSize: 512,
  zoomOffset: -1,
  attribution: '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

var mapboxGreybox = L.tileLayer('https://api.mapbox.com/styles/v1/higherbob/cjp2q1xgr11822rnsd5oael0q/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGlnaGVyYm9iIiwiYSI6ImNqbzZsZXR5cDA1cDUza29qYnV1NjA0OTAifQ.pvTwwdIdX0vK0P7e18U9CQ', {
  tileSize: 512,
  zoomOffset: -1,
  attribution: '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});
var mapboxDecimal = L.tileLayer('https://api.mapbox.com/styles/v1/higherbob/cjp1ep6bn14452smi9uk1nvon/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGlnaGVyYm9iIiwiYSI6ImNqbzZsZXR5cDA1cDUza29qYnV1NjA0OTAifQ.pvTwwdIdX0vK0P7e18U9CQ', {
  tileSize: 512,
  zoomOffset: -1,
  attribution: '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});
var mapboxTraffic = L.tileLayer('https://api.mapbox.com/styles/v1/higherbob/cjq9du46o2a0w2rqu6iic6djf/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGlnaGVyYm9iIiwiYSI6ImNqbzZsZXR5cDA1cDUza29qYnV1NjA0OTAifQ.pvTwwdIdX0vK0P7e18U9CQ', {
  tileSize: 512,
  zoomOffset: -1,
  attribution: '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});
var OSM = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19
  });

var OSM_hot = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
});

var OSM_topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  maxZoom: 17,
  attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

var open_grey = L.tileLayer('https://korona.geog.uni-heidelberg.de/tiles/roadsg/x={x}&y={y}&z={z}', {
  maxZoom: 19,
  attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

var hyda_street = L.tileLayer('https://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: 'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

var stamen_terrain = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 18,
  ext: 'png'
});

var esri_street = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
});

var esri_delohme = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Specialty/DeLorme_World_Base_Map/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Copyright: &copy;2012 DeLorme',
  minZoom: 1,
  maxZoom: 18
});

var esri_satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

var carto_dark = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: 'abcd',
  maxZoom: 19
});

var hike_bike = L.tileLayer('http://{s}.tiles.wmflabs.org/hikebike/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

function getColorY(n) {
  return (n > 3.4 ? '#fff59d' :
           n > 2.5 ? '#fff176' :
           n > 1.5 ? '#ffee58' :
           n > 0.5 ? '#ffeb3b' :
           n > 0.25 ? '#ffe436' :
           n > 0.18 ? '#fdd835' :
           n > 0.12 ? '#fbc02d' :
           n > 0.08 ? '#f9a825' :
           n > 0.04 ? '#f57f17' :
           n > 0.02 ? '#d46e13' :
                    '#be6314');

}

function getColorO(n) {
    return (n > 3.4 ? '#94f0ff' :
           n > 2.5 ? '#7fd5f0' :
           n > 1.75 ? '#71c3e6' :
           n > 1.2 ? '#63b1dc' :
           n > 0.60 ? '#559fd2' :
           n > 0.25 ? '#478dc8' :
           n > 0.12 ? '#397bbe' :
           n > 0.08 ? '#2b69b4' :
           n > 0.04 ? '#164ea5' :
           n > 0.02 ? '#013396' :
                    '#002588');

}


function getColor(n) {
    return (n > 3.4 ? '#ff7272' :
           n > 2.5 ? '#f06363' :
           n > 1.75 ? '#e65959' :
           n > 1.2 ? '#dc4f4f' :
           n > 0.60 ? '#d24545' :
           n > 0.25 ? '#c83b3b' :
           n > 0.12 ? '#be3131' :
           n > 0.08 ? '#af2222' :
           n > 0.04 ? '#a51818' :
           n > 0.02 ? '#960909' :
                    '#8c0303');
}


function getColorR(n) {
    return (n > 3.4 ? '#018664' :
           n > 2.5 ? '#e5eac4' :
           n > 1.75 ? '#cbdeb9' :
           n > 1.2 ? '#b1d2ae' :
           n > 0.60 ? '#97c6a3' :
           n > 0.25 ? '#7dba98' :
           n > 0.12 ? '#63ae8d' :
           n > 0.08 ? '#49a282' :
           n > 0.04 ? '#2f9677' :
           n > 0.02 ? '#158a6c' :
                    '#fff6cf');

}


highlightLayer = L.geoJson(null, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, {
            radius: 3,
            color: '#536dfe',
            weight: 2,
            opacity: 1,
            fillColor: '#536dfe',
            fillOpacity: 1,
            clickable: false
        });
    },
    style: function (feature) {
        return {
            color: '#536dfe',
            weight: 2,
            opacity: 1,
            fillColor: '#536dfe',
            fillOpacity: 0.5,
            clickable: false
        };
    }
});


featureLayer = L.geoJson(null, {
    filter: function(feature, layer) {
        return feature.geometry.coordinates[0] !== 0 && feature.geometry.coordinates[1] !== 0;
    },
    pointToLayer: function(feature, latlng) {
      var props = L.Util.extend({
        'start': '',
        'end': '',
        'distance': '',
        'name': '',
        'venue': ''
      }, feature.properties),
      textPopup = L.Util.template('<h3>{start}</h3>{end}<br>{distance}<br>{name}<br>{venue}', props);
        return L.circleMarker(latlng, {
            radius: 3,
            weight: 2,
            fillColor: getColorY(feature.properties.dist4),
            color: getColorY(feature.properties.dist4),
            opacity: 1,
            fillOpacity: 1
        });
    },
    onEachFeature: function(feature, layer) {
        //console.log(layer);
        layer.on({
            mouseover: function (e) {

                $(".info-control").html(feature.properties[config.hoverProperty]);
                $('.info-control').html(["Pickup: "+feature.properties[config.hoverProperty]+"<br />","distance: "+ feature.properties[config.hoverPropertyTwo]]);
                $('.info-control').show();
            },
            mouseout: function (e) {

                $('.info-control').hide();
            },
            click: function(e) {
                identifyFeature(L.stamp(layer));
                highlightLayer.clearLayers();
                highlightLayer.addData(featureLayer.getLayer(L.stamp(layer)).toGeoJSON());
            }
        });
    }

});


featureLayerAlt = L.geoJson(null, {
    filter: function(feature, layer) {
        return feature.geometry.coordinates[0] !== 0 && feature.geometry.coordinates[1] !== 0;
    },
    pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng, {
            radius: 3,
            weight: 2,
            fillColor: getColorR(feature.properties.dist4),
            color: getColorR(feature.properties.dist4),
            opacity: 1,
            fillOpacity: 1
        });
    },
    onEachFeature: function(feature, layer) {
        //console.log(layer);
        layer.on({
            mouseover: function (e) {

                $(".info-control").html(feature.properties[config.hoverProperty]);
                $('.info-control').html(["Pickup: "+feature.properties[config.hoverProperty]+"<br />","distance: "+ feature.properties[config.hoverPropertyTwo]]);
                $('.info-control').show();
            },
            mouseout: function (e) {

                $('.info-control').hide();
            },
            click: function(e) {
                identifyFeature(L.stamp(layer));
                highlightLayer.clearLayers();
                highlightLayer.addData(featureLayer.getLayer(L.stamp(layer)).toGeoJSON());
            }
        });
    }

});


featureLayerAlt2 = L.geoJson(null, {
    filter: function(feature, layer) {
        return feature.geometry.coordinates[0] !== 0 && feature.geometry.coordinates[1] !== 0;
    },
    pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng, {
            radius: 3,
            weight: 2,
            fillColor: getColorO(feature.properties.dist4),
            color: getColorO(feature.properties.dist4),
            opacity: 1,
            fillOpacity: 1
        });
    },
    onEachFeature: function(feature, layer) {
        //console.log(layer);
        layer.on({
            mouseover: function (e) {

                $(".info-control").html(feature.properties[config.hoverProperty]);
                $('.info-control').html(["Pickup: "+feature.properties[config.hoverProperty]+"<br />","distance: "+ feature.properties[config.hoverPropertyTwo]]);
                $('.info-control').show();
            },
            mouseout: function (e) {

                $('.info-control').hide();
            },
            click: function(e) {
                identifyFeature(L.stamp(layer));
                highlightLayer.clearLayers();
                highlightLayer.addData(featureLayer.getLayer(L.stamp(layer)).toGeoJSON());
            }
        });
    }

});
featureLayerD3 = L.geoJson(null, {
    filter: function(feature, layer) {
        return feature.geometry.coordinates[0] !== 0 && feature.geometry.coordinates[1] !== 0;
    },
    pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng, {
            radius: 3,
            weight: 2,
            fillColor: getColor(feature.properties.dist4),
            color: getColor(feature.properties.dist4),
            opacity: 1,
            fillOpacity: 1
        });
    },
    onEachFeature: function(feature, layer) {
        //console.log(layer);
        layer.on({
            mouseover: function (e) {

                $(".info-control").html(feature.properties[config.hoverProperty]);
                $('.info-control').html(["Pickup: "+feature.properties[config.hoverProperty]+"<br />","distance: "+ feature.properties[config.hoverPropertyTwo]]);
                $('.info-control').show();
            },
            mouseout: function (e) {
                $('.info-control').hide();
            },
            click: function(e) {
                identifyFeature(L.stamp(layer));
                highlightLayer.clearLayers();
                highlightLayer.addData(featureLayer.getLayer(L.stamp(layer)).toGeoJSON());
            }
        });
    }

});
L.Control.FileLayerLoad.LABEL = '<i class="material-icons">folder</i>';
layerLoader = L.Control.fileLayerLoad({
  fitBounds: true,
  layerOptions: {
    filter: function(feature, layer) {
        return feature.geometry.coordinates[0] !== 0 && feature.geometry.coordinates[1] !== 0;
    },
    pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng, {
            radius: 3,
            weight: 2,
            fillColor: getColor(feature.properties.dist4),
            color: getColor(feature.properties.dist4),
            opacity: 1,
            fillOpacity: 1
        });
    },
    onEachFeature: function(feature, layer) {
        //console.log(layer);
        layer.on({
            mouseover: function (e) {

                $(".info-control").html(feature.properties[config.hoverProperty]);
                $('.info-control').html(["Pickup: "+feature.properties[config.hoverProperty]+"<br />","distance: "+ feature.properties[config.hoverPropertyTwo]]);
                $('.info-control').show();
            },
            mouseout: function (e) {

                $('.info-control').hide();
            },
            click: function(e) {
                identifyFeature(L.stamp(layer));
                highlightLayer.clearLayers();
                highlightLayer.addData(featureLayer.getLayer(L.stamp(layer)).toGeoJSON());
            }
        });
    }

  }
});


var baseLayers = {
  "Street Map": mapboxOSM,
  "Dark Map": mapboxDark,
  "Aerial Imagery": mapboxSat,
  "bluebox": mapboxBluebox,
  "decimal": mapboxDecimal,
  "greybox": mapboxGreybox,
  'trafficbox': mapboxTraffic,
  "styled": mapboxStyled,
  "osm street": OSM,
  "osm hot": OSM_hot,
  "osm topo": OSM_topo,
  "openmaps": open_grey,
  "hyda": hyda_street,
  "stamen terrain": stamen_terrain,
  "esri street": esri_street,
  "esri delohme": esri_delohme,
  "esri satellite": esri_satellite,
  "carto dark": carto_dark,
  "hike bike": hike_bike
};


var overlayLayers = {
  "featureLayers":{
  "<span id='layerRoot'>Lr</span>": featureLayer,
  "<span id='layerAlt'>La</span>": featureLayerAlt,
  "<span id='layerLg'>Lg</span>": featureLayerAlt2
  },
  "d3layers":{
  "<span id='layerD3a'>LD3</span>": featureLayerD3
}
};


 map = L.map('map', {
    layers: [mapboxTraffic, featureLayer, highlightLayer],
    center: config.base,
    zoom: 12,
    maxZoom: 21,
    fullscreenControl: true,
    zoomControl: false,
    //zoomSnap: 0.125,
    zoomDelta: 0.5,
    wheelPxPerZoomLevel: 50
});

var marker;
var layerControl = L.control.groupedLayers(baseLayers, overlayLayers);

var zoom = L.control.zoom({zoomInText: '', zoomOutText: '',position: 'topleft'});
layerControl.addTo(map);
zoom.addTo(map);

layerLoader.addTo(map);
var sidebar = L.control.sidebar('sidebar', {autoPan: false, closeButton: false});
sidebar.addTo(map);

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
  collapsed: false

});
searchControl.addTo(map);
searchControl.on('search:locationfound', function(e){
  console.log(e);

  searchControl.collapse();
  if(marker){
    map.removeLayer(marker);
  }

  marker = new L.marker([e.latlng.lat, e.latlng.lng], {icon: wiicon}).addTo(map);
  searchControl.addTo(map);

});

var MiIcon = L.Icon.Default.extend({
  options: {
        iconUrl: 'marker.svg'
  }
});

var miicon = new MiIcon();

var RiIcon = L.Icon.Default.extend({
  options: {
        iconUrl: 'red-marker.png'
  }
});

var riicon = new RiIcon();

var QiIcon = L.Icon.Default.extend({
  options: {
      iconUrl: 'sun-marker.png'
  }
});

var qiicon = new QiIcon();

var WiIcon = L.Icon.Default.extend({
  options: {
        iconUrl: 'wine-marker.png'
  }
});

var wiicon = new WiIcon();

var TlIcon = L.Icon.Default.extend({
  options: {
        iconUrl: 'stylish-marker.png'
  }
});

var tlicon = new TlIcon();

L.Map.include({
  'clearLayers': function (){
    this.eachLayer(function (layer) {
      this.removeLayer(layer);
    }, this);
  }
});


var sidebarToggle = new L.easyButton({
  states: [{
    stateName: 'open-sidebar',
    icon: 'mdi mdi-menu',
    title: 'Show Sidebar',
    onClick: function(btn, map) {

      sidebar.show();
      btn.state('close-sidebar');

    }
  },{
    stateName: 'close-sidebar',
    icon: 'mdi mdi-silverware-variant',
    title: 'Hide Sidebar',
    onClick: function(btn, map) {

      sidebar.hide();
      btn.state('open-sidebar');
      searchControl.addTo(map);
    }
  }],
  id: 'menu'
});
var togglebar = L.easyBar([sidebarToggle], {id: 'toggle'}).addTo(map);
sidebar.on('hide', function() {
  sidebarToggle.state('open-sidebar');

});
sidebar.on('show', function(){
  sidebarToggle.state('close-sidebar');

});
map.addControl( searchControl );
setHeights();

 $(window).resize(function(){
        //setTextareaWidth();
        setHeights();
    });


map.on("enterFullscreen", function() {

    var onepart = Math.ceil($(window).height());
    var twopart = Math.ceil($(window).width());
    //$('#maptwo').hide();

    $("#map").css('height',onepart);
    $('#map').css('width', twopart);
    $('#poptime').show();
    $('#poptime').popover('show');
    L.Util.requestAnimFrame(map.invalidateSize,map,!1,map._container);
    //L.Util.requestAnimFrame(maptwo.invalidateSize,maptwo,!1,maptwo._container);
    map.invalidateSize();
   });
map.on('exitFullscreen', function(){
    //var textHeight = $('#geoInput').height();
    var onepart = Math.floor($(window).height());
    var twopart = Math.floor($(window).width());

    //$('#geoOutput').show();

    //$('#maptwo').css('width', twopart - 145);
    $('#map').css('width', twopart - 145);
    //$('#maptwo').css('height', onepart + 160);
    $('#map').css('height', onepart - textHeight);
    $('#poptime').hide();
    $('#poptime').popover('hide');
    L.Util.requestAnimFrame(map.invalidateSize,map,!1,map._container);
    //L.Util.requestAnimFrame(maptwo.invalidateSize,maptwo,!1,maptwo._container);
    //maptwo.invalidateSize();
    map.invalidateSize();

});


function setHeights() {

        var w = $(window).width();

        if (w > 1170) {
            var viewportHeight = $(window).height();
            var viewportWidth = $(window).width();
            var navbarHeight = $('.pmd-navbar').height();
            var sidebarWidth = $('.pmd-sidebar').width();
            var availableHeight = viewportHeight - navbarHeight;//- navbarHeight - 8 - 17 - 21 - 34;
            var availableWidth = viewportWidth - sidebarWidth;
            var equalParts = Math.floor(availableHeight);
            var equalwidth = Math.floor(availableWidth);
            $('#map').css('height',equalParts - 30);
            $('#map').css('width', equalwidth - 30);
            //$('#maptwo').css('width', equalwidth - 145);
            //$('#maptwo').css('height',equalParts + 160);
            //$('#geoOutput').css('height',equalParts);
            //$('#chloromap').css('height', equalParts);
            // add margin, in case navbar is higher
            if (navbarHeight > 50) {
                $('body').css('margin-top','80px');
            } else {
                $('body').css('margin-top','8px');
            }
        } else if (w > 440) {
          var viewportiHeight = $(window).height();
          var viewportiWidth = $(window).width();
          var newwidth = Math.floor(viewportWidth - 40);
          var newheight = Math.floor(viewportHeight - 30);
          $('#map').css('height', newheight);
          $('#map').css('width', newwidth);

        } else {
            $('.buttonsAlign').css('margin-bottom','15px');
        }
        map.invalidateSize();
        //maptwo.invalidateSize();
    }

eRay = {"moveend_idx": "", "zoomend_idx": "", "viewreset_idx": "", "pathend_idx": ""};
function indexEvents(eRay){
  var maplen = map._events.length;
  var eraylen = eRay.length;

  for(var i = 0; i < eraylen; ++i) {
    var tt = map._events[i];

    for(var e = 0; e < maplen; ++e) {
      var ll = tt[e];
      eRay[i] = ll;
    }
  }
  return eRay;
}

function identifyFeature(id) {
  var featureProperties = featureLayer.getLayer(id).feature.properties;
  var content = "<table class='table table-striped table-bordered table-condensed'>";
  var insideSidebarHead = "<li class='list-group-item'>";
  var insideSidebar = '';
  var outsideSidebar = "<table class='table'><thead class='text-primary'>";
  var outsideSidebarBody = "<tbody>";
  var outsideth = "";
  var outsidetd = "";
  $.each(featureProperties, function(key, value) {
    insideSidebar += insideSidebarHead;
    if (!value) {
      value = "";
    }
    if (typeof value == "string" && (value.indexOf("http") === 0 || value.indexOf("https") === 0)) {
      value = "<a href='" + value + "' target='_blank'>" + value + "</a>";
    }
    content += "<tr><th>" + key + "</th><td>" + value + "</td></tr>";
    insideSidebar += "<h4 style='color:#fcbc94;'>" + key + "</h4><p>" + value + "</p></li>";
    outsideth += "<th>"+key+"</th>";
    outsidetd += "<td>"+value+"</td>";
  });
  content += "<table>";
  allsidebar = outsideSidebar + outsideth + "</thead>" + outsideSidebarBody + outsidetd + "</tbody></table>";

  $('#sidebarlist').html(insideSidebar);
  sidebar.show();

  //$("#feature-info").html(content);
  //$("#featureModal").modal("show");
}


featuresOut = L.geoJson();
featuresIn = L.geoJson();



var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info-control'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = "";
};


info.addTo(map);
//info.addTo(maptwo);
$(".info-control").hide();



map.on("click", function(e) {
    highlightLayer.clearLayers();
});


var directionField = document.getElementById('date-label');
var slider = document.getElementById('date-slider');
var mileslider = document.getElementById('mile-slider');
var mileField = document.getElementById('mile-label');


$('#reload').click(function(){
    location.reload();
});

$('#poptime').hide();


noUiSlider.create(slider, {
  start: 100,
 // tooltips: [slider({decimals: 1 })],
  connect: [true,false],
  range: {
    min: 0,
    max: 1000
  }
});
noUiSlider.create(mileslider, {
  start: 6,
 // tooltips: [slider({decimals: 1 })],;
  connect: [true,false],
  step: 2,
  range: {
    min: 0,
    max: 10
  }
});

slider.classList.add('s1-slide');

slider.noUiSlider.on('update', function (values, handle) {
    directionField.innerHTML = values[handle];
    sliderVal = values[handle];
});
mileslider.noUiSlider.on('update', function (values, handle) {
    mileField.innerHTML = values[handle];
    mileVal = values[handle];
});

featuresdata1 = [];
var ltlng = [];
var featuresIn = L.layerGroup();
var featuresOut = L.layerGroup();
var result;
var intersectL = [];
var bufferL = [];
var layerIn = '<ul id="ul">';
var layerOut = '<div id="layerOut">';
var count = 0;
features1 = [];

$('#routedata').click(function(){
var pathGeo = 'assets/data/route.geojson';
opendata(pathGeo);
});
$('#tinfoleak').click(function(){
  var tinfoPath = 'assets/data/9-20to9-10.geojson';
  opendata(tinfoPath);
});
$('#septroute').click(function(){
  var septGeo = 'assets/data/9-27.geojson';
  opendata(septGeo);
})
$('#latedist').click(function(){
  var lateGeo = 'assets/data/latedist.geojson';
  opendata(lateGeo);
});
$('#junegeo').click(function(){
  var juneGeo = 'assets/data/6-25.geojson';
  opendata(juneGeo);
});
$('#latemay').click(function(){
  var mayGeo = 'assets/data/5-31.geojson';
  opendata(mayGeo);
});
$('#latemaytwo').click(function(){
  var mayGeo = 'assets/data/5-30.geojson';
  opendata(mayGeo);
});
$('#earlyaug').click(function(){
  var augGeo = 'assets/data/8-4.geojson';
  opendata(augGeo);
});
$('#earlyaugtwo').click(function(){
  var augGeo = 'assets/data/8-5.geojson';
  opendata(augGeo);
});
$('#midaug').click(function(){
  var augGeo = 'assets/data/8-17.geojson';
  opendata(augGeo);
});
$('#midaugtwo').click(function(){
  var augGeo = 'assets/data/8-18.geojson';
  opendata(augGeo);

});
$('#midaugthr').click(function(){
  var augGeo = 'assets/data/8-19.geojson';
  opendata(augGeo);
});
$('#midaugfour').click(function(){
  var augGeo = 'assets/data/8-20.geojson';
  opendata(augGeo);
});



function opendata(geoFile) {

count += 1;



   newfile = $.getJSON(geoFile, function(geoParse){
    console.log(geoParse);
    features1 = geoParse;
    //return geoParse;

   });
   showCancelMessage();

}

function showCancelMessage() {
    swal({
        title: "Loading Data",
        text: "Click to finalize data load",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#29ab87",
        confirmButtonText: "Yes, load data!",
        cancelButtonText: "No, cancel please!",
        closeOnConfirm: false,
        closeOnCancel: false
    }, function (isConfirm) {
        if (isConfirm) {
            swal("Loaded!", "Your Geo Data has been loaded.", "success");
            pushdatathrough();
        } else {
            swal("Cancelled", "Data has not been loaded", "error");
            features1 = [];
            if(count >= 1) {
              count -= 1;

            }
        }
    });
};
function pushdatathrough(){

    featuresdata1.push(features1);
    features = $.map(features1.features, function(feature) {
        return feature.properties;
    });

    if (count == 1) {
    features2 = L.geoJSON(features1);
    featureLayer.addData(features1);
    map.fitBounds(features2.getBounds());
    //maptwo.fitBounds(features2.getBounds());
    //pathing.addTo(map);
    layerIn += '<li id="listInone"><div id="layerColorIn" style="background-color: blue; color: blue;"><p id="listInText" style="color: black;">' + 'Layer ' + count + '</p></div></li>';
    } else if (count == 2) {
     features2 = L.geoJson(features1);
    featureLayerAlt.addData(features1);
    map.fitBounds(features2.getBounds());
    //maptwo.fitBounds(features2.getBounds());
    layerIn += '<li id="listIntwo"><div id="layerColorIntwo" style="background-color: red; color: red;"><p id="listInText" style="color: black;">' + 'Layer ' + count + '</p></div></li>';

    } else if (count == 3) {
    features2 = L.geoJson(features1);
    featureLayerAlt2.addData(features1);
    map.fitBounds(features2.getBounds());
    //maptwo.fitBounds(features2.getBounds());
    layerIn += '<li id="listInthree"><div id="layerColorInthree" style="background-color: orange; color: orange;"><p id="listInText" style="color: black;">' + 'Layer ' + count + '</p></div></li>';

    } else {alert('Too many Layers!');}
    layerIn += '</ul>';
    $('#layerIn').html(layerIn);
    $('#layerIn').css('visibility','visible');
    $('#map .leaflet-control-zoom').css('margin-left','5px');


}


// should aim for path only animation, no marker
$('#animateRoute').click(function(){
   var tall = "path";
   animationGenerator(tall);
});
// split route into many small points, click to advance route


// stepper, main
$('#d3stepper').click(function(){

  var tar = "stepper";
  animationGenerator(tar);
});

$('#perClickAnimate').click(function(){
  var tom = "click";
  animationGenerator(tom);
});
$('#truckbutton').click(function(){
  ty = 'trucker'
  animationGenerator(ty);
})
$('#finalie').click(function(){;
  tyee = "final";
  animationGenerator(tyee);
//wraptaxi();
}),

function evalMile(milesEval){
      return milesEval <= 61 ? 2 :
            milesEval  <= 81 ? 3 :
            milesEval  <= 101 ? 4 :
            milesEval  >= 102 ? 5 :
                          2;
}

function animationGenerator(type){
  /*
 var truckpic =  L.control.custom({
                    position: 'bottomright',
                    content : '<img src="images/2.jpg" height="90vh" width="100vw" class="img-thumbnail" id="demoImage">',
                    classes : '',
                    style   :
                    {
                        margin: '0px 20px 20px 0',
                        padding: '0px',
                    },
                });
  */
  tweenToggle = 0;
  feat = features1.features;
  stringcount = 0;
  lines = 1;
  lineholder = [];
  propsholder = [];
  proplen = {};
  proplen[0] = 0;
  timelen = {};
  timelen[0] = 0;
  pp = 0;
  turfline = {};
  turfline[0] = [];
  miDiv = 12;
  minslen = {};
  minslen[0] = 0;
  modlen = {};
  modlen[0] = 0;
  timeout = {};
  timeout[0] = [];
  timeholderIn = [];
  timeholderOut = [];
  timecount = 0;
  linestring = {};
  stringsout = [];
  propsout = {};
  propsout[0] = [];
  propsout[1] = [];
  propsout[2] = [];
  medholder = [];
  osrmline = '';
  len = features1.features.length;
  if(type == 'marker'){
    for(var i = 0; i < features1.features[0].geometry.coordinates.length; ++i){
      var f = features1.features[0].geometry.coordinates[i];
      var fo = features1.features[0].geometry.coordinates[i+1];
      lineholder.push([f,fo]);
    }
    var b = features1.features[0].properties;
    propsholder.push(b);
  } else {
  for(var i = 0; i < len; i++){
    var f = features1.features[i].geometry.coordinates;

    var b = features1.features[i].properties;
    var tda = features1.features[i].properties.pickuptime;
    var fda = features1.features[i].properties.medallion;
    if(features1.features[i+1] !== undefined){
    var to = features1.features[i+1].properties.pickuptime;
    } else {
      var to = features1.features[i].properties.pickuptime;
    }
    lineholder.push(f);
    propsholder.push(b);
    timeholderIn.push([tda, to]);
    medholder.push(fda);
    osrmline += "&loc="+f[1]+"%2C"+f[0];
  }
}
  //startOsrm = "map.project-osrm.org/?z=12&center=33.404531%2C-111.963515"+osrmline+"&hl=en&alt=0";
  //$('#geoOutput').val(startOsrm);
function make_timearray(array, features) {
  var timelength = array.length,
    timeray = [];
  for(var i = 0; i < timelength; ++i) {
    var dateA = moment(array[i][0]),
        strdate = dateA._i,
        dateB = moment(array[i][1]),
        stbdate = dateB._i,
        rawdur = dateB.diff(array[i][0]),
        diffsec = dateB.diff(array[i][0]) / 1000,
        differ = dateB.diff(array[i][0]) / 60000,
        hrs = dateA.hour(),
        minss = dateA.minute(),
        day = dateA.date(),
        month = dateA.month();
        if(features){
          features1.features[i].properties.dur = differ;
          features1.features[i].properties.mod = differ / 2;
          features1.features[i].properties.rad = parseInt(hrs)
          dar = features1.features[i].properties.medallion;
        } else {
          dar = i;
        }
        timeray.push({id: dar, pickup: strdate, dropoff: stbdate, raw_duration: rawdur, secduration: diffsec, duration: differ, mins: minss, hour: hrs, day: day, mo: month, modified: (differ / 2)});
  }
  return timeray;
}
function make_evaluated_line(array, evalby, proparray){
  var evallen = array.length,
      tlinestring = turf.lineString(array, proparray),
      chunkline = turf.lineChunk(tlinestring, evalby, {units: 'miles'});
      return chunkline;
}
function make_line(array, proparray){
  var tlinestring = turf.lineString(array, proparray);
  return tlinestring;
}
function getRangeSum(arr, from, to) {
  return arr.slice(from, to).reduce((p, c) => {
    return p + c;
  }, 0);
}
function check_whole(n){
  if(Number.isInteger(n)){
    return true
  } else {
    return false
  }
}
function make_split_array(array, splitby){
  var newlen = array.length;
  var splits = newlen / splitby;
  var splitray = {};
   splitray[0] = [];
  var splitcounter = 0;
  var splitsync = 0 + splits;
  if(check_whole(splits)){
    for(var i = 0; i < newlen; ++i){
      if(i < splitsync) {
        splitray[splitcounter].push(array[i]);
      } else {
        splitray[splitcounter].push(array[i]);
        splitcounter += 1;
        splitsync += splits;
        splitray[splitcounter] = [];
      }
    }
    return splitray;
  } else {
    alert('the modifier '+mileVal+' does not work, please select another value, and resubmit')
  }
}
  function clickstepper(){
    var simple = features1.features
    timeArray = make_timearray(timeholderIn, true);
    tryarray = make_split_array(simple, mileVal);
      if(type == "themall") {
      newmile = evalMile(mileVal)*580;
      } else {
      newmile = evalMile(mileVal);
      }
      icounter = 0 + newmile;

    for(var ish = 0; ish < propsholder.length; ish++){
      if(propsholder[ish].dist4 < 0.007) {
        icounter += 1;
      }
      if(ish <= icounter) {
        proplen[pp] += propsholder[ish].dist4;
        timelen[pp] += timeArray[ish].duration;
        minslen[pp] += timeArray[ish].mins;
        modlen[pp] += timeArray[ish].modified;
        timeout[pp].push(timeArray[ish]);

      if(type == "themall"){
        turfline[pp].push(lineholder[ish])
      } else if(type !== lineholder){
      if(lineholder[ish+1] !== undefined){
        turfline[pp].push(lineholder[ish], lineholder[ish+1]);
      } else {
          turfline[pp].push(lineholder[ish], lineholder[ish]);
        }
      }
        propsout[pp].push(propsholder[ish]);
      } else {
        proplen[pp] += propsholder[ish].dist4;
        timelen[pp] += timeArray[ish].duration;
        minslen[pp] += timeArray[ish].mins;
        modlen[pp] += timeArray[ish].modified;
        timeout[pp].push(timeArray[ish]);

      if(type == "themall"){
        turfline[pp].push(lineholder[ish]);
      }
      if(lineholder[ish+1] !== undefined){
        turfline[pp].push(lineholder[ish], lineholder[ish+1]);
      } else {
          turfline[pp].push(lineholder[ish], lineholder[ish]);
      }
        propsout[pp].push(propsholder[ish]);


      //if(lineholder[ish+1] !== undefined){
        icounter += newmile;
        pp += 1;
        proplen[pp] = 0;
        timelen[pp] = 0;
        minslen[pp] = 0;
        modlen[pp] = 0;
        timeout[pp] = [];
        turfline[pp] = [];
        propsout[pp] = [];
      //}
    }
  }
}
  function pathstepper(){
  for(var i = 0; i < lineholder.length; i++){
    if(proplen[pp] < mileVal * 3) {
      if(propsholder[i] !== undefined){
      proplen[pp] += propsholder[i].dist4;
      //turfline[pp].push(lineholder[i]);
      propsout[pp].push(propsholder[i]);
    }
      if(lineholder[i+1] !== undefined){
        turfline[pp].push(lineholder[i], lineholder[i+1]);
      } else {
        turfline[pp].push(lineholder[i], lineholder[i]);
        }
    } else {
      if(lineholder[i+1] !== undefined){
        turfline[pp].push(lineholder[i], lineholder[i+1]);
      } else {
        turfline[pp].push(lineholder[i], lineholder[i]);
        }
      if(propsholder[i] !== undefined){
      propsout[pp].push(propsholder[i]);
      proplen[pp] += propsholder[i].dist4;
    }
      pp += 1;
      proplen[pp] = 0;
      turfline[pp] = [];
      propsout[pp] = [];
    }
  }
}

function check_distance(array){
  var distlen = array.length;
  chunky = 1;
for(var i = 0; i < distlen; ++i){
  var a = turf.point([array[i].geometry.coordinates[1], array[i].geometry.coordinates[0]]);
  if(array[chunky] !== undefined ){
  var b = turf.point([array[chunky].geometry.coordinates[1], array[chunky].geometry.coordinates[0]]);
  } else {
    --chunky
    var b = turf.point([array[chunky].geometry.coordinates[1], array[chunky].geometry.coordinates[0]]);
  }
  var distance = turf.distance(a,b,{unit:'miles'});
  array[i].properties.turf_distance = distance;
  ++chunky;
}
return array;
}
function many_linestrings(array, props) {
  var manylen = array.length,
    countone = 0,
    counttwo = 1,
    turf_many = [];
    for(var i = 0; i < manylen; ++i){
      if(array[counttwo] !== undefined){
        turf_many.push(turf.lineString([array[countone].geometry.coordinates, array[counttwo].geometry.coordinates], props[i].properties))
      } else {
        turf_many.push(turf.lineString([array[countone].geometry.coordinates, array[countone].geometry.coordinates], props[i].properties))
      }
      ++countone;
      ++counttwo;
    }
    return turf_many;
}
function truckPath(){
  var distlookup = features1.features;
  timeArray = make_timearray(timeholderIn, true);
  distanceholder = check_distance(distlookup);
  turfline = many_linestrings(distlookup, distlookup);


}
  function timestepper(){
   var distcheck = features1.features;
  timeArray = make_timearray(timeholderIn, true);
    distanceholder = check_distance(distcheck);
    /*
    distanceholder = [];
    for(var i = 0; i < timeArray.length; ++i) {
      if(timeArray[i].hour > 20 || timeArray[i].hour < 4) {
        var a = turf.point([features1.features[i].geometry.coordinates[1], features1.features[i].geometry.coordinates[0]]);
        var b = turf.point([config.base[0], config.base[1]]);
        distance = turf.distance(a, b, {units: 'miles'});
        if(distance > 1){
          distanceholder.push({dist:distance, ts:timeArray[i].pickup, coord:a,});
        }
      }
    }
    */
   // var output = JSON.stringify(distanceholder, null, '\t');
   // var outputText = $('#geoOutput').val(output);

    for(var it = 0; it < propsholder.length; it++){
      if(proplen[pp] <= mileVal) {
        proplen[pp] += propsholder[it].dist4;
        timelen[pp] += timeArray[it].duration;
        minslen[pp] += timeArray[it].mins;
        modlen[pp] += timeArray[it].modified;
        timeout[pp].push(timeArray[it]);
      if(lineholder[it+1] !== undefined){
        turfline[pp].push(lineholder[it], lineholder[it+1]);
      } else {
        turfline[pp].push(lineholder[it], lineholder[it]);
        }
        propsout[pp].push(propsholder[it]);
      } else {
        proplen[pp] += propsholder[it].dist4;
        timelen[pp] += timeArray[it].duration;
        minslen[pp] += timeArray[it].mins;
        modlen[pp] += timeArray[it].modified;
        timeout[pp].push(timeArray[it]);
      if(lineholder[it+1] !== undefined){
        turfline[pp].push(lineholder[it], lineholder[it+1]);
      } else {
        turfline[pp].push(lineholder[it], lineholder[it]);
      }
        propsout[pp].push(propsholder[it]);
        pp += 1;
        proplen[pp] = 0;
        timelen[pp] = 0;
        minslen[pp] = 0;
        modlen[pp] = 0;
        timeout[pp] = [];
        turfline[pp] = [];
        propsout[pp] = [];
      }

    }

  }
  function finalstepper() {
    icounter = 0 + 1;
    milesuse = 1;
    timeArray = make_timearray(timeholderIn, true);
    convertedray = [];
    convertedray[0] = [];
    secray = [];
    secray[0] = 0;

    for(var ish = 0; ish < propsholder.length; ish++){
      if(timeArray[ish].raw_duration < 80000 || propsholder[ish].dist4 < 0.002) {
        icounter += 1;
      }
      if(ish <= icounter) {
        convertedray[pp].push(timeholderIn[ish])
        proplen[pp] += propsholder[ish].dist4;
        timelen[pp] += timeArray[ish].duration;
        secray[pp] += timeArray[ish].secduration;
        minslen[pp] += timeArray[ish].mins;
        modlen[pp] += timeArray[ish].modified;
        timeout[pp].push(timeArray[ish]);
        if(ish == pp * 2 ){
          if(type == 'final'){
          propsout[pp*2].hasfare = 'true';
        }else {
          propsout[pp*2].traveling = 'true';
        }
        }

      if(lineholder[ish+1] !== undefined){
        turfline[pp].push(lineholder[ish], lineholder[ish+1]);
      } else {
          turfline[pp].push(lineholder[ish], lineholder[ish]);
        }

        propsout[pp].push(propsholder[ish]);
      } else {
        proplen[pp] += propsholder[ish].dist4;
        timelen[pp] += timeArray[ish].duration;
        minslen[pp] += timeArray[ish].mins;
        secray[pp] += timeArray[ish].secduration;
        modlen[pp] += timeArray[ish].modified;
        timeout[pp].push(timeArray[ish]);
        convertedray[pp].push(timeholderIn[ish])

      if(lineholder[ish+1] !== undefined){
        turfline[pp].push(lineholder[ish], lineholder[ish+1]);
      } else {
          turfline[pp].push(lineholder[ish], lineholder[ish]);
      }
        propsout[pp].push(propsholder[ish]);


      //if(lineholder[ish+1] !== undefined){
        icounter += milesuse;
        pp += 1;
        proplen[pp] = 0;
        timelen[pp] = 0;
        minslen[pp] = 0;
        modlen[pp] = 0;
        secray[pp] = 0;
        timeout[pp] = [];
        convertedray[pp] = [];
        turfline[pp] = [];
        propsout[pp] = [];
        propsout[pp*2] = [];
      //}
    }
  }

}
keyholder = [];
  if(type == "themall") {
    clickstepper();
    for(var keyc in turfline)
      stringsout.push(turf.multiPoint(turfline[keyc], {id: keyc, distance: proplen[keyc], areaItems: propsout[keyc], time:timelen[keyc], mins:minslen[keyc], mod:modlen[keyc], timeFeatures:timeout[keyc]}));
  } else if(type == "final"){;
    finalstepper();
    for(var keyc in turfline){
      //keyholder[keyc] = [];
      keyholder[keyc*2] = [];
      keyholder[keyc*2] = true;

      stringsout.push(turf.lineString(turfline[keyc], {id: keyc, hasfare: keyholder[keyc], timeinout: convertedray[keyc], distance: proplen[keyc], areaItems: propsout[keyc], time:timelen[keyc], mins:minslen[keyc], mod:modlen[keyc], timeFeatures:timeout[keyc]}));
  }
   } else if(type == 'trucker'){
    truckPath();
   }
    else if(type == "stepper"){
    timestepper();
    for(var key in turfline){
      stringsout.push(turf.lineString(turfline[key], {id: key, distance: proplen[key], areaItems: propsout[key], time:timelen[key], mins:minslen[key], mod:modlen[key], timeFeatures:timeout[key]}));
  }
  } else if(type == "click"){;
    finalstepper();
    for(var keyc in turfline){
      //keyholder[keyc] = [];
      keyholder[keyc*2] = [];
      keyholder[keyc*2] = true;

      stringsout.push(turf.lineString(turfline[keyc], {id: keyc, traveling: keyholder[keyc], secdur: secray[keyc], timeinout: convertedray[keyc], distance: proplen[keyc], areaItems: propsout[keyc], time:timelen[keyc], mins:minslen[keyc], mod:modlen[keyc], timeFeatures:timeout[keyc]}));
  }
  }  else {
  pathstepper();
  for(var keya in turfline){
    stringsout.push(turf.lineString(turfline[keya], {id: keya, distance: proplen[keya]}));
  }
}
  //maptwo.toggleFullscreen()
  collect = turf.featureCollection(stringsout);
  if(type == 'late'){

  } else if(type == 'path') {

  } else {
  for(var key in collect.features) {
      featureLayerD3.addData(collect.features[key]);
  }
}
  //truckpic.addTo(map);
  if(type == "path") {
    animPolyPath();
  } else if(type == "final") {
    wraptaxi();
  } else if(type == "canvas") {
    canvasDraw();
  } else if(type == "trucker") {
    set_markers(turfline);
  } else if(type == "click") {
    wrapTruck();
  } else if (type == "stepper") {
    animStepper();
  }
}



function truckStart(){
  ttt = turfline.map(function(d, i){
     d.properties.traveling = true;
     d.properties.counter = i
     d.properties.secduration = timeArray[i].secduration
    return d;
  })
  collect = turf.featureCollection(ttt);

 wrapTruck(collect);
}


function wraptaxi() {

var timeFactor = 6; //number of minutes in real life to a second in the viz
$('.timeFactor').html(sliderVal); //Displays the timeFactor in the UI.
var tweenToggle = 0;


var topLeft,bottomRight;

var time = moment();


var running = {
    "fare":0,
    "surcharge":0,
    "mtatax":0,
    "tolls":0,
    "tip":0,
    "total":0,
    "passengers":0
} ;



var svg = d3.select(map.getPanes().overlayPane).append("svg"),
g = svg.append("g").attr("class", "leaflet-zoom-hide");


//area chart
var margin = {top: 30, right: 20, bottom: 20, left: 40},
areaChartWidth = $(window).width() - margin.left - margin.right -450,
areaChartHeight = 100 - margin.top - margin.bottom;

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
.y1(function(d) { return y(d.runningFare); });

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
.attr("class","markerLine");

var dummyData = [];



x.domain([0, 24]);
y.domain([0, 1200]);

var chartPath = areaChartSvg.append("path")
.datum(dummyData)
.attr("class", "area");
//.attr("d", area);

areaChartSvg.append("g")
.attr("class", "x axis")
.attr("transform", "translate(0," + areaChartHeight + ")")
.call(xAxis)
.append("text")
.attr("y", 9)
.attr("x", 39)
.attr("dy", ".71em")
.style("text-anchor", "end")
.text("Hour");

areaChartSvg.append("g")
.attr("class", "y axis")
.call(yAxis)
.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 6)
.attr("dy", ".71em")
.style("text-anchor", "end")
.text("Fares ($)");



//end area chart

//listeners

$('.slower').click(function(){
    if(timeFactor > 1){
        timeFactor -= 1;
    };

    $('.timeFactor').html(timeFactor);

});

$('.faster').click(function(){
    timeFactor += 1;
    $('.timeFactor').html(timeFactor);

});

$('.reload').click(function(){
    location.reload();
});

$('.about').click(function(){
    $('.aboutPopup').fadeIn();
});

$('.asterisks').click(function(){
    $('.asterisksPopup').fadeIn();
});

$('.attribution').click(function(){
    $('.attributionPopup').fadeIn();
});

$('.aboutPopup .panel-heading>.glyphicon').click(function(){
    $('.aboutPopup').fadeOut();
});

$('.asterisksPopup .panel-heading>.glyphicon').click(function(){
    $('.asterisksPopup').fadeOut();
});

$('.attributionPopup .panel-heading>.glyphicon').click(function(){
    $('.attributionPopup').fadeOut();
});

var transform = d3.geo.transform({
    point: projectPoint
}),
d3path = d3.geo.path().projection(transform);

var timer;

function updateTimer() {
    time.add('1', 'minutes');
    $('.readableTime').text(time.format('h:mm a'));
    $('.date').text(time.format('dddd, MMMM Do YYYY'));
    timer = setTimeout(function(){updateTimer()},(20500/sliderVal));
}

//get a random number between 0 and 11
//var number = Math.floor(Math.random() * 15)

//d3.json('https://raw.githubusercontent.com/chriswhong/nyctaxi/master/data/taxiday7.geojson', function (data) {
data = collect;
featuresdata = data.features.map(function(d){
  return d;
});
    console.log("Loaded data for medallion: " + data.features[0].properties.id);


     feature = g.selectAll("path")
    .data(featuresdata)
    .enter().append("path")
    .attr("class", function (d) {
      if(d.properties.hasfare == undefined) {
        d.properties.hasfare = false;
      }
        if (d.properties.hasfare == true) {
            return "trip" + (parseInt(d.properties.id)) + " " + d.properties.hasfare;
        } else {
            return "trip" + ((parseInt(d.properties.id))) + " " + d.properties.hasfare;
        }
    })
    .attr("style", "opacity:0");

    var pointsArray = [];
    var points = g.selectAll(".point")
    .data(pointsArray);



var marker = g.append("circle");
marker.attr("r", 5)
  .attr("id", "marker");
var outmark = g.append("circle");
outmark.attr('r', 15)
  .attr('id', 'outmark');


//.attr("transform", "translate(" + startPoint + ")");

//Get path start point for placing marker



//var string = JSON.stringify(j);


map.on("viewreset", reset);
map.on("zoomend", reset);
reset();

var i = 0;

function iterate() {

    var chartInterval = 0;

    var emptyData = [];

    var emptyPath = areaChartSvg.append("path")
    .datum(emptyData)
    .attr("class", "empty");



    var path = svg.select("path.trip" + i)
    .attr("style", "opacity:.7")
    .call(transition);



    function pathStartPoint(path) {
        var d = path.attr('d');

        dsplitted = d.split("L")[0].slice(1).split(",");
        var point = []
        point[0]=parseInt(dsplitted[0]);
        point[1]=parseInt(dsplitted[1]);

        return point;
    }


    var startPoint = pathStartPoint(path);
    marker.attr("transform", "translate(" + startPoint[0] + "," + startPoint[1] + ")");
    outmark.attr('transform', 'translate('+ startPoint[0] + ',' + startPoint[1] + ")");

path.each(function(d){

//add the translation of the map's g element
startPoint[0] = startPoint[0]; //+ topLeft[0];
startPoint[1] = startPoint[1]; //+ topLeft[1];
var newLatLon = coordToLatLon(startPoint);
pointsArray.push([newLatLon.lng,newLatLon.lat,d.properties.hasfare]);


points = g.selectAll(".point")
.data(pointsArray)
.enter()
.append('circle')
.attr("r",5)
.attr("class",function(d){
    if(d[2]) {
        return "startPoint point";
    } else {
        return "endPoint point";
    }
})
.attr("transform",function(d){
    return translatePoint(d);
});

if(d.properties.hasfare) { //transition marker to show full taxi
  marker
   .transition()
    .duration(1500)
    .attr("r", 25)
    .attr('style','opacity:0.2')
    .attr('fill', '#448aff')
   .transition()
    .duration(200)
    .attr("r", 5)
    .attr('style','opacity:1')
    .attr('fill', '#0d47a1');
   outmark
     .transition()
      .duration(1500)
      .attr('r', 2)
      .attr('style', 'opacity:0.2')
      .attr('fill', '#821d57')
     .transition()
      .duration(320)
      .attr("r",12)
      .attr('style','opacity:.7');






} else { //Transition marker to show empty taxi

    marker
    .transition()
    .duration(1500)
    .attr("r",35)
    .attr('style','opacity:.15')
    .attr('fill', '#012562')
    .transition()
    .duration(150)
    .attr("r",8)
    .attr('style','opacity:.9')
    .attr('fill', '#42a5f5')
    .transition()
    .duration(400)
    .attr("r",25)
    .attr('style','opacity:.01')
    .attr('fill', '#2962ff');
    outmark
      .transition()
      .duration(1500)
      .attr('r', 20)
      .attr('style', 'opacity:0.01')
      .attr('fill', '#f55f30')
      .transition()
      .duration(250)
      .attr('r', 12)
      .attr('style', 'opacity:0.85')
      .attr('fill', '#ad1457')
      .transition()
      .duration(450)
      .attr('r', 45)
      .attr('style', 'opacity:0.01')
      .attr('fill', '#e57373');

}
});




function transition(path) {

    g.selectAll

    path.transition()
    .duration(function(d){
        //calculate seconds
        //var start = Date.parse(d.properties.pickuptime),
        //finish = Date.parse(d.properties.dropofftime),
        //duration = finish - start;

        //duration = duration/60000; //convert to minutes
        duration = d.properties.time // 60000;
        durmim = duration * (100/sliderVal) * 220;
        time = moment(d.properties.timeFeatures[0].pickup.toString());



        $('.readableTime').text(time.format('h:mm a'));


        return (durmim);
})
    .attrTween("stroke-dasharray", tweenDash)
    .each("end", function (d) {
        if(d.properties.hasfare == undefined) {
          d.properties.hasfare = false;
        }
        if(d.properties.hasfare) {

            running.fare += parseFloat(d.properties.distance);
            running.surcharge += parseFloat(d.properties.id);
            running.mtatax += parseFloat(d.properties.mins);
            running.tip += parseFloat(d.properties.mod);
            running.tolls += parseFloat(d.properties.time);
            running.total += parseFloat(d.properties.time);
            running.passengers = parseFloat(d.properties.id);



            for(var p = 0;p<d.properties.id;p++){
                $('.passengerGlyphs').append('<span class="mdi mdi-car"></span>');
            }

            updateRunning();



        };
        i++;

        var nextPath = svg.select("path.trip" + i);
        if (nextPath[0][0]==null){
            clearTimeout(timer);
        } else {
            iterate();
        }


    });

}

function tweenDash(d) {

    var l = path.node().getTotalLength();
var i = d3.interpolateString("0," + l, l + "," + l); // interpolation of stroke-dasharray style attr
return function (t) {
    var marker = d3.select("#marker");
    var outmark = d3.select('#outmark');
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




    if(isNaN(d.properties.time)){
        d.properties.time = 0;
    }

    var incrementalFare = d.properties.time*t;


    dummyData.push({
        "time": decimalHour,
        "runningFare": running.fare + parseFloat(incrementalFare)
    });


chartPath.attr("d", area); //redraw area chart
if(d.properties.hasfare == false) { //draw purple area for nonfare time
    emptyData.push({
        "time": decimalHour,
        "runningFare": running.fare + parseFloat(incrementalFare)
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

updateRunning();

$('#begin').click(function(){
    $('.overlay').fadeOut(250);
    $('.box').fadeIn(250);
    setTimeout(function(){
        updateTimer();
        iterate();
    },350);

});


function updateRunning() {
    $('.runningFare').text('mi: '+running.fare.toFixed(2));
    $('.runningSurcharge').text('Vehi: ID '+running.surcharge.toFixed(2));
    $('.runningTax').text('Mod '+running.mtatax.toFixed(2));
    $('.runningTip').text('Sec '+running.tip.toFixed(2));
    $('.runningTolls').text('I.Time '+running.tolls.toFixed(2));
    $('.runningTotal').text('Time '+running.total.toFixed(2));
    $('.runningPassengers').text(running.passengers);
}

// Reposition the SVG to cover the features.
function reset() {
    var bounds = d3path.bounds(data);
    topLeft = bounds[0],
    bottomRight = bounds[1];

    svg.attr("width", bottomRight[0] - topLeft[0] + 100)
    .attr("height", bottomRight[1] - topLeft[1] + 100)
    .style("left", topLeft[0]-50 + "px")
    .style("top", topLeft[1]-50 + "px");

    g.attr("transform", "translate(" + (-topLeft[0]+50) + "," + (-topLeft[1]+50)+ ")");

    feature.attr("d", d3path);

    //TODO: Figure out why this doesn't work as points.attr...
    g.selectAll(".point")
    .attr("transform",function(d){
        return translatePoint(d);
    });


}





}
// Use Leaflet to implement a D3 geometric transformation.

function wrapTruck(){
var slowVal;
var timeFactor = 6; //number of minutes in real life to a second in the viz
$('.timeFactor').html(slowVal); //Displays the timeFactor in the UI.
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
areaChartWidth = $(window).width() - margin.left - margin.right -500,
areaChartHeight = 120 - margin.top - margin.bottom;

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
.y1(function(d) { return y(d.distance); });

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



//end area chart

//listeners
slowSlider = document.getElementById('slower');
slowField = document.getElementsByClassName('timeFactor');
/*
$('.slower').click(function(){
    if(timeFactor > 1){
        timeFactor -= 1;
    };

    $('.timeFactor').html(timeFactor);

});
$('.faster').click(function(){
    timeFactor += 1;
    $('.timeFactor').html(timeFactor);

});
*/
noUiSlider.create(slowSlider, {
  start: 125,
 // tooltips: [slider({decimals: 1 })],;
  connect: [true,false],
  range: {
    min: 0,
    max: 1000
  }
});
slowSlider.noUiSlider.on('update', function (values, handle) {
    slowField.innerHTML = values[handle];
    slowVal = values[handle];
    //updateTimer();
});


$('.reload').click(function(){
    location.reload();
});

$('.about').click(function(){
    $('.aboutPopup').fadeIn();
});


var transform = d3.geo.transform({
    point: projectPoint
}),
d3path = d3.geo.path().projection(transform);

var timer,
  timeCount;

function updateTimer() {

    //if(timeCount > 1){
    //console.log(timeCount);
    //timey = timeCount / 1000;
    //time.add(timey, 'seconds');
    //} else {
    //  time.add('1', 'minutes');
    //}
    time.add('3', 'seconds')

    $('.readableTime').text(time.format('h:mm a'));
    $('.date').text(time.format('dddd, MMMM Do YYYY'));
    timer = setTimeout(function(){updateTimer()},(durScale(1000000/slowVal)));
}

//get a random number between 0 and 11
//var number = Math.floor(Math.random() * 15)

//d3.json('https://raw.githubusercontent.com/chriswhong/nyctaxi/master/data/taxiday7.geojson', function (data) {
data = collect;
featuresdata = data.features.map(function(d, i){

  d.properties.counter = i;
  return d;
});
    console.log("Loaded data for medallion: " + data.features[0].properties.id);


  feature = g.selectAll("path")
    .data(featuresdata)
    .enter().append("path")
    .attr("class", function (d) {
      if(d.properties.traveling == undefined) {
        d.properties.traveling = false;
      }
        if (d.properties.traveling == true) {
            return "trip" + (parseInt(d.properties.counter)) + " " + d.properties.traveling;
        } else {
            return "trip" + ((parseInt(d.properties.counter))) + " " + d.properties.traveling;
        }
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

//.attr("transform", "translate(" + startPoint + ")");

//Get path start point for placing marker



//var string = JSON.stringify(j);


map.on("viewreset", reset);
map.on("zoomend", reset);
reset();

var i = 0;

function iterate() {

    var chartInterval = 0;

    var emptyData = [];

    var emptyPath = areaChartSvg.append("path")
    .datum(emptyData)
    .attr("class", "emptyChart");



    var path = svg.select("path.trip" + i)
    .attr("opacity", "0.7")
    //.attr('d', d3path)
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


path.each(function(d){

//add the translation of the map's g element
startPoint[0] = startPoint[0]; //+ topLeft[0];
startPoint[1] = startPoint[1]; //+ topLeft[1];
var newLatLon = coordToLatLon(startPoint);
pointsArray.push([newLatLon.lng,newLatLon.lat,d.properties.traveling]);


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

if(d.properties.traveling) { //transition marker to show full taxi
  outmarkT
      .transition()
      .duration(1500)
      .attr('r', 14)
      .attr('style', 'opacity:0.75')
      .attr('fill', '#f55f30');

  markerT
    .transition()
    .duration(375)
    .attr("r",1)
    .attr('style','opacity:1')
    .transition(375)
    .attr('r', 20)
    .attr('opacity', '0.4')
    .attr('fill', '#76ff03')
    .transition(750)
    .attr('r', 8)
    .attr('fill', '#18ffff')
    .attr('opacity', '1');






} else { //Transition marker to show empty taxi
  outmarkT
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
    .duration(1500)
    .attr("r",35)
    .attr('fill', '#7b1fa2')
    .attr('style','opacity:.15');

}
});


function transition(path) {

    g.selectAll

    path.transition()
    .attr('stoke-opacity', '0.7')
    .attr('stroke', '#7e57c2')
    .duration(function(d){
        //calculate seconds
        //var start = Date.parse(d.properties.pickuptime),
        //finish = Date.parse(d.properties.dropofftime),
        //duration = finish - start;

        //duration = duration/60000; //convert to minutes
        duration = d.properties.secdur ; // 60000;
        durmim = duration * (durScale(100/slowVal)) * 700;

        time = moment(d.properties.timeinout[0][0].toString());
        timeCount = durmim;


        $('.readableTime').text(time.format('h:mm a'));


        return (durmim);
})
    .attrTween("stroke-dasharray", tweenDash)
    .each("end", function (d) {
        if(d.properties.traveling == undefined) {
          d.properties.traveling == false;
        }
        if(d.properties.traveling) {

            running.distance += parseFloat(d.properties.distance);
            running.time += parseFloat(d.properties.time);
            running.hour += parseFloat(d.properties.mins/60);
            running.Time_at_radius += parseFloat(d.properties.mod);
            running.POI += parseFloat(d.properties.id);
            running.WorkorHome += parseFloat(d.properties.time);



            for(var p = 0;p<d.properties.id;p++){
                $('.passengerGlyphs').append('<span class="mdi mdi-car"></span>');
            }

            updateRunning();



        };
        i++;

        var nextPath = svg.select("path.trip" + i);
        if (nextPath[0][0]==null){
            clearTimeout(timer);
        } else {
            iterate();
        }


    });

}

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




    if(isNaN(d.properties.mins)){
        d.properties.mins = 0;
    }

    var incrementalFare = d.properties.mins*t;


    dummyData.push({
        "time": decimalHour,
        "distance": running.distance + parseFloat(incrementalFare)
    });


chartPath.attr("d", area); //redraw area chart
if(d.properties.traveling == false) { //draw purple area for nonfare time
    emptyData.push({
        "time": decimalHour,
        "runningFare": running.hour + parseFloat(incrementalFare)
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

updateRunning();

$('#begin').click(function(){
    $('.overlay').fadeOut(250);
    $('.box').fadeIn(250);
    setTimeout(function(){
        updateTimer();
        iterate();
    },350);

});


function updateRunning() {
    $('.runningFare').text('mi'+running.distance.toFixed(2));
    $('.runningSurcharge').text('$'+running.time.toFixed(2));
    $('.runningTax').text('$'+running.hour.toFixed(2));
    $('.runningTip').text('$'+running.Time_at_radius.toFixed(2));
    $('.runningTolls').text('$'+running.POI.toFixed(2));
    $('.runningTotal').text('$'+running.WorkorHome.toFixed(2));

}

// Reposition the SVG to cover the features.
function reset() {
    var bounds = d3path.bounds(data);
    topLeft = bounds[0],
    bottomRight = bounds[1];

    svg.attr("width", bottomRight[0] - topLeft[0] + 100)
    .attr("height", bottomRight[1] - topLeft[1] + 100)
    .style("left", topLeft[0]-50 + "px")
    .style("top", topLeft[1]-50 + "px");

    g.attr("transform", "translate(" + (-topLeft[0]+50) + "," + (-topLeft[1]+50)+ ")");

    feature.attr("d", d3path);

    //TODO: Figure out why this doesn't work as points.attr...
    g.selectAll(".point")
    .attr("transform",function(d){
        return translatePoint(d);
    });


}






}

function set_markers(turfline){
    var marker = new L.marker(
            new L.LatLng(turfline[0].geometry.coordinates[0][1], turfline[0].geometry.coordinates[0][0], {id:'start-marker', icon: tlicon})
        )
marker.addTo(map);


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



//var svg = d3.select(map.getPanes().overlayPane).append("svg"),
//g = svg.append("g").attr("class", "leaflet-zoom-hide");


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

nodes = [];
var timeFactor = 6; //number of minutes in real life to a second in the viz
$('.timeFactor').html(newslideVal); //Displays the timeFactor in the UI.

range_counter = 0;
var nodes = d3.range(collect.length).map(function(i) {
    range_counter += collect[i].properties.raw_duration;

    return {
       start: collect[i].geometry.coordinates[0],
        end: collect[i].geometry.coordinates[1],
        start_travel: true,
        end_travel: false,
        id: collect[i].properties.medallion,
        counter: i,
        timestamp: collect[i].pickuptime,
        current_duration: collect[i].properties.mod,
        next_duration: collect[i].properties.raw_dur,
        next_distance: collect[i].properties.turf_distance,
        coordinates: collect[i].geometry.coordinates,
        total_duration: range_counter,
        duration_average: (range_counter / collect.length),
        timer: time

    };
});
function move_time(i){
    var node = {
        duration_up: durScale(newslideVal) * nodes[nodes.length - 1].duration_average,
        duration_down: durScale(newslideVal) /  nodes[nodes.length - 1].duration_average,
        alt_up: durScale(newslideVal) * 200,
        alt_down:  durScale(newslideVal) / 200
    }
    nodes.push(node)

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
        update_time();
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
    //reset();

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


function animPolyPath(){

 addMarkers();
}

function addMarkers() {
  var markers = new L.MarkerClusterGroup();

   for (var i = 0; i < collect.features.length; i++) {
    var f = collect.features[i];

    if (f.geometry) {
      var marker = new L.marker(
            new L.LatLng(f.geometry.coordinates[0][1], f.geometry.coordinates[0][0]), { id: f.properties.id, icon: miicon }
    );

      marker.on('click', function(event){
        showRunPath(event);
      });
      markers.addLayer(marker);
    }
  }
  map.addLayer(markers);
}

function durCount(n){
  return n < 4 ? 393 * sliderVal:
         n < 9 ? 485 * sliderVal:
          550 * sliderVal;
}
function showRunPath(event) {

    var GeoPath;

  for (var i = 0; i < collect.features.length; i++) {
    var f = collect.features[i];

    if (f.properties.id === event.target.options.id) {
      GeoPath = f;
      break;
    }
  }


  if (GeoPath) {
    if (!(GeoPath.geometry.coordinates[0] instanceof Array) ) {
      minifier = new GeojsonMinifier({ precision: 6 });
      GeoPath.geometry.coordinates = minifier.decodeGeometry(GeoPath.geometry.coordinates);
  }
    //maptwo.fitBounds(new L.GeoJSON(geoPath).getBounds());
    var duration = durCount(GeoPath.properties.distance); //< 13 ? 11300 : < 17 ? 22600 : 32900;
    drawPath(GeoPath, duration);
    }

}

function updateDahsboard(data, duration) {
  //data should be at collect.features.properties

i = 0;
  var distanceLabel = document.querySelector('#distance > span');
    meters = 8000;
     timeout = Math.floor((3000 / meters) * 10);
  function printText() {
    distanceLabel.innerText = i;
    i += 202;

    if (i < meters) {
      setTimeout(printText, timeout);
    } else {
      distanceLabel.innerText = meters;
    }
  }

  printText();
}

function drawPath(GeoPath, duration) {
  tweenToggle = 0;
  var pane = d3.select(map.getPanes().overlayPane);
  pane.selectAll("svg.running-path").remove();
  var svg = pane.append("svg").attr("class", "running-path"),
      g = svg.append("g").attr("class", "leaflet-zoom-hide");

  var transform = d3.geo.transform({point: projectPoint});
  var path = d3.geo.path().projection(transform);
  var coll =  { type: "FeatureCollection", features: [GeoPath] };
  //var output = JSON.stringify(geoPath, null, '\t');
  //var outputText = $('#geoOutput').val(output);

  var line = g.selectAll(".line")
                .data([GeoPath])
                .enter()
                .append("path")
                .attr("class", "line");



  function reset() {
    var bounds = path.bounds(coll),

        topLeft = bounds[0],
        bottomRight = bounds[1];

    topLeft[0] -= 1;
    topLeft[1] -= 1;
    bottomRight[0] += 1;
    bottomRight[1] += 1;

    svg .attr("width", bottomRight[0] - topLeft[0] + 2)
        .attr("height", bottomRight[1] - topLeft[1] + 2)
        .style("left", topLeft[0] + "px")
        .style("top", topLeft[1] + "px");

    g .attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");

    line.attr("d", path).call(transition);
  }

  function transition(path) {
    console.log(path);
    path.transition()
        .duration(duration)
        .attrTween("stroke-dasharray", tweenDash);
  }

  function tweenDash() {
    var l = this.getTotalLength(),
        i = d3.interpolateString("0," + l, l + "," + l);
    var x = this;

    return function(t) {
      var p = x.getPointAtLength(t * l);
      if(tweenToggle == 0){
        tweenToggle = 1;
        var newCenter = map.layerPointToLatLng(new L.Point(p.x,p.y));
        map.panTo(newCenter, 16);
      } else {
        tweenToggle = 0;
      }
      return i(t); };
  }

  map.on("viewreset", reset);
  //maptwo.on("zoomend", reset);
  reset(line, path);
  reset();
}

function animStepper(){
$('#stepper-main').show();
 addStepMarkers();
}

function addStepMarkers() {
  var markers = new L.MarkerClusterGroup();

   for (var i = 0; i < collect.features.length; i++) {
    var f = collect.features[i];

    if (f.geometry) {
      var marker = new L.marker(
            new L.LatLng(f.geometry.coordinates[0][1], f.geometry.coordinates[0][0]), { id: f.properties.id, icon: tlicon }
    );


      marker.on('click', function(event){
        showStepRunPath(event);
      });
      markers.addLayer(marker);
    }

  }

  map.addLayer(markers);
}

function showStepRunPath(event) {

    stepPath = [];

  for (var i = 0; i < collect.features.length; i++) {
    var f = collect.features[i];

    if (f.properties.id === event.target.options.id) {
      stepPath = f;
      break;
    }
  }

    //maptwo.fitBounds(new L.GeoJSON(stepPath).getBounds());
    if(stepPath.properties.mod > 900) {
    dur = (stepPath.properties.mod / 4) * sliderVal * 290; //260durd3Count(stepPath.properties.distance) //< 13 ? 11300 : < 17 ? 22600 : 32900;
  } else if(stepPath.properties.mod > 400) {
    dur = (stepPath.properties.mod / 3) * sliderVal * 290;
  } else if(stepPath.properties.mod > 200) {
    dur = (stepPath.properties.mod / 2) * sliderVal * 290;
  } else {
    dur = stepPath.properties.mod * sliderVal * 290;
  }
    animateStep(stepPath, dur);
    updateDashboard(stepPath.properties, dur);
  }

  function updateDashboard(props, dur){
  $('#poptime').show();
  $('#poptime').popover('show');
  var dis = Math.round(props.distance);
  var tilen = props.timeFeatures.length;
  var starttime = props.timeFeatures[0].pickup;
  var endtime = props.timeFeatures[tilen - 1].pickup;
  var acttime = props.time / 60000;
  var _second = 1000;
  var _minute = _second * 60;
  var _hour = _minute * 60;
  var _day = _hour *24;
  var timer;
  var addate = Date();
  var paddate = Date.parse(addate);
  var upDate = paddate + dur;

  function showRemaining() {
    var now = new Date();
    var getDate = new Date(upDate);
    var distance = getDate - now;
    if (distance < 1 ) {
       clearInterval( timer ); // stop the timer from continuing ..
    }
    //var days = Math.floor(distance / _day);
    var hours = Math.floor( distance  / _hour );
    var minutes = Math.floor( (distance % _hour) / _minute );
    var seconds = Math.floor( (distance % _minute) / _second );
    var milliseconds = distance % _second;
    var parentElement = $('h3.popover-header');
        parentElement.html(hours + 'h ' + //days  + 'd ' +
                           minutes + 'm ' +
                           seconds + 's ' +
                           milliseconds + 'ms');
  }
  $('div.popover-body').html('Total Mi: ' + dis + '<br>' +
                             'start: ' + starttime + '<br>' +
                             'arrival: ' + endtime + '<br>' +
                             'act duration: ' + acttime);
  timer = setInterval(showRemaining, 15);

  }


    function animateStep(stepPath, dur){

      console.log(stepPath);
      var d3overlay = d3.select(map.getPanes().overlayPane);
      d3overlay.selectAll("svg.running-marker").remove();
      var svg = d3overlay.append("svg").attr("class", "running-marker");
      g = svg.append("g").attr("class", "leaflet-zoom-hide");
      var transform = d3.geo.transform({point: projectPoint});
      var path = d3.geo.path().projection(transform);
      var markerCol = { type: "FeatureCollection", features: [stepPath]};
      //var output = JSON.stringify(stepPath, null, '\t');
      //var outputText = $('#geoOutput').val(output);

    var linePath = g.selectAll('.line')
              .data([stepPath])
              .enter()
              .append("path")
              .attr("class", "stepConnect");


      var ptFeatures = g.selectAll('circle')
          .data(stepPath)
          .enter()
          .append('circle')
          .attr("r", 4)
          .attr("class", "waypoints");


      var marker = g.append("circle")
          .attr("r", 7)
          .attr("id", "marker")
          .attr("class", "stepMarker");

      var outering = g.append("circle")
        .attr('r', 15)
        .attr('id', 'outering')
        .attr("class", "stepRing")
        .style("fill", '#039be5')
        .style('opacity', 0.45);


      function newreset() {
            var bounds = path.bounds(markerCol),

              topLeft = bounds[0],
              bottomRight = bounds[1];

          topLeft[0] -= 20;
          topLeft[1] -= 20;
          bottomRight[0] += 20;
          bottomRight[1] += 20;

          svg .attr("width", bottomRight[0] - topLeft[0])
              .attr("height", bottomRight[1] - topLeft[1])
              .style("left", topLeft[0] + "px")
              .style("top", topLeft[1] + "px");



          g .attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");
          linePath.attr("d", path).call(sttransition);
          //linePath.attr("d", path).call(transition)
          //line.attr("d", path).call(transition);
        }

        function sttransition(path) {
          path.transition()
              .duration(dur)
              .attrTween("stroke-dasharray", sttweenDash);
        }

        function sttweenDash() {
          var x = this;

          return function(t) {

            var l = x.getTotalLength();
            var i = d3.interpolateString("0," + l, l + "," + l);
            //var markerPulse = d3.select('.pulseMarker')
            var marker = d3.select('#marker');
            var ring = d3.select('#outering');
            var p = x.getPointAtLength(t * l);

            //markerPulse.attr('transform', "translate(" + p.x + "," + p.y + ")");
            marker.attr('transform', "translate(" + p.x + "," + p.y + ")");
            ring.attr('transform', "translate(" + p.x + "," + p.y + ")");
            if(tweenToggle == 0){
              tweenToggle = 1;
              var newCenter = map.layerPointToLatLng(new L.Point(p.x,p.y));
              map.panTo(newCenter, 10);
            } else {
              tweenToggle = 0;
            }
            return i(t);
          };
        }

          map.on("viewreset", newreset);
          newreset(linePath, path);
          newreset();

      }


  $('#cleardata').click(function(){
    featureLayer.clearLayers();
    featureLayerAlt.clearLayers();
    featureLayerAlt2.clearLayers();
    featuresIn.clearLayers();
    featureLayerD3.clearLayers();
    geoFile = '';
    layerIn = '';
    featuresdata = [];
  });
  /*
    // Button to clear map and input text area:
    $('#btnInputClear').click(function(){
        count = 0;
        featuresIn.clearLayers();
        featureLayer.clearLayers();
        featuresdata = [];
        layerIn = '';
        $('#geoInput').val('');
        $('#layerIn').html('');
    });
*/
    // Generate output geojson:
    $('#btnOutput').click(function(){
        var output = JSON.stringify(result, null, '\t');
        var outputText = $('#geoOutput').val(output);
    });
    $('#poilink').click(function() {

      var AirIcon = L.Icon.Default.extend({
        options: {
              iconUrl: 'airport.png'
        }
      });
      var EatIcon = L.Icon.Default.extend({
        options: {
              iconUrl: 'dining.png'
        }
      });
      var BarIcon = L.Icon.Default.extend({
        options: {
              iconUrl: 'bar.png'
        }
      });
      var ShopIcon = L.Icon.Default.extend({
        options: {
              iconUrl: 'shopping.png'
        }
      });
      var CasIcon = L.Icon.Default.extend({
        options: {
              iconUrl: 'casino.png'
        }
      });
      var SportIcon = L.Icon.Default.extend({
        options: {
              iconUrl: 'sport.png'
        }
      });
      var UnivIcon = L.Icon.Default.extend({
        options: {
              iconUrl: 'univ.png'
        }
      });
      var GenIcon = L.Icon.Default.extend({
        options: {
              iconUrl: 'blue-marker.png'
        }
      });
      var airicon = new AirIcon(),
          eaticon = new EatIcon(),
          baricon = new BarIcon(),
          shopicon = new ShopIcon(),
          univicon = new UnivIcon(),
          sporticon = new SportIcon(),
          casicon = new CasIcon(),
          genicon = new GenIcon();
      var poimarkers = [];
      var plen = poi.features.length;
      for(var i = 0; i < plen; i++) {
        var p = poi.features[i];
        if(p.properties.bus == 'nightlife'){
          poimarkers.push(new L.marker(new L.latLng(p.geometry.coordinates[1], p.geometry.coordinates[0]), {icon:baricon, id: i}).addTo(maptwo));
      } else if(p.properties.bus == 'shopping'){
          poimarkers.push(new L.marker(new L.latLng(p.geometry.coordinates[1], p.geometry.coordinates[0]), {icon:shopicon, id: i}).addTo(maptwo));
      } else if(p.properties.bus == 'sports'){
          poimarkers.push(new L.marker(new L.latLng(p.geometry.coordinates[1], p.geometry.coordinates[0]), {icon:sporticon, id: i}).addTo(maptwo));
        } else if(p.properties.bus == 'dining'){
          poimarkers.push(new L.marker(new L.latLng(p.geometry.coordinates[1], p.geometry.coordinates[0]), {icon:eaticon, id: i}).addTo(maptwo));
        } else if(p.properties.bus == 'airport'){
          poimarkers.push(new L.marker(new L.latLng(p.geometry.coordinates[1], p.geometry.coordinates[0]), {icon:airicon, id: i}).addTo(maptwo));
        } else if(p.properties.bus == 'casino'){
          poimarkers.push(new L.marker(new L.latLng(p.geometry.coordinates[1], p.geometry.coordinates[0]), {icon:casicon, id: i}).addTo(maptwo));
        } else if(p.properties.bus == 'university'){
          poimarkers.push(new L.marker(new L.latLng(p.geometry.coordinates[1], p.geometry.coordinates[0]), {icon:univicon, id: i}).addTo(maptwo));
        } else {
          poimarkers.push(new L.marker(new L.latLng(p.geometry.coordinates[1], p.geometry.coordinates[0]), {icon:genicon, id: i}).addTo(maptwo));
        }
      }
      featureLayer.addData(poimarkers);

    });



map.on("click", function(e) {
  highlightLayer.clearLayers();
});


function projectPoint(x, y) {
    var point = map.latLngToLayerPoint(new L.LatLng(y, x));
    this.stream.point(point.x, point.y);
}

function translatePoint(d) {
    var point = map.latLngToLayerPoint(new L.LatLng(d[1],d[0]));

    return "translate(" + point.x + "," + point.y + ")";
}

function coordToLatLon(coord) {
var point = map.layerPointToLatLng(new L.Point(coord[0],coord[1]));
return point;
}


function applyLatLngToLayer(d, i) {
  console.log(d);
  console.log(map.latLngToLayerPoint(new L.LatLng(d.geometry.coordinates[i][1], d.geometry.coordinates[i][0])));
  return map.latLngToLayerPoint(new L.LatLng(d.geometry.coordinates[i][1], d.geometry.coordinates[i][0]));
}
function ApplyLatLngToLayer(a, b) {
                x = a
                y = b
                return map.latLngToLayerPoint(new L.LatLng(x[1], y[0]))
            }

$('#canvasclick').click(function(){
  var type = 'canvas'
  animationGenerator(type);
})

function canvasDraw(){

 // request frame polyfill;
    window.requestAnimationFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              function( callback ){
                window.setTimeout(callback, 1000 / 60);
              };
    })();

    //map._initPathRoot();
   data = features1;

        var colors = [
                 "rgba(102,102,102,1)",
                 "rgba(70,130,180,1)",
                 "rgba(254,196,79,1)",
                 "rgba(117,107,177,1)",
                 "rgba(44,162,95,1)",
                 "rgba(217,95,14,1)",
                 "rgba(240,59,32,1)",
                 "rgba(0,0,0,1)",
                 "rgba(0,0,0,1)"
              ];
        // SVG layer for routes.
        var svg = L.d3SvgOverlay(function(sel, projection){
          var routes_g = sel.selectAll('.routes');
          if(routes_g.empty()){
            routes_g = sel.append('g')
              .attr('class','routes')
            var route_paths = routes_g.selectAll('path')
              .data(data.features);
            route_paths.enter().append('path')
              .attr('class', 'route')
              .attr('d', d3.geo.path()
                  .projection(function(l){
                    var p = projection.latLngToLayerPoint({ lon: l[0], lat:  l[1] });
                    return [p.x,p.y];
                  })
                )
              .attr('stroke', function(d){
                  return colors[d.properties.medallion];
                });
          }
        });
        svg.addTo(map);

        var times = Object.keys(data.features),
            active_trips = 0,
            active_trips_div = d3.select('#active-trips'),
            current_time_h = $('#hour'),
            current_time_m = $('#minute'),
            current_time_s = $('#second'),
            current_time_p = $('#period');
        window.current_index = 37;
        window.start_time = data.pickuptime;

        var interpolate = function(p1, p2, f){
                var nx = p1[0] + ( p2[0] - p1[0] ) * f,
                    ny = p1[1] + ( p2[1] - p1[1] ) * f;
                return [nx, ny];
              },
            m_to_h = function (c) {
                var h = Math.floor(c / 60) % 24,
                    m = c % 60,
                    s = Math.floor(c * 60) % 60,
                    p = h < 12 ? 'AM' : 'PM',
                    h = h % 12 == 0 ? 12 : h % 12;
                return { h: h, m: m, s: s, p: p };
              };
        // Most browsers will animate the canvas at 60 fps or an update every 16.67 ms.
        // We'll slow things down a little more by adding 10 frames between minutes.
        window.running = true;
        window.timeout = 10;
        window.frame = 0;
        window.dot_size = 2.5;
        // Canvas Draying
        window.draw = function(){
          var context = params.canvas.getContext('2d'),
              frame_count = window.frame_count ? window.frame_count : (window.params.zoom - 6) * 2;
          context.clearRect(0, 0, params.canvas.width, params.canvas.height);
          var trips_t1 = data.features[ times[current_index] ],
              trips_t2 = data.features[ times[current_index + 1] ],
              f = frame / frame_count,
              trip_keys = Object.keys(trips_t1);
          active_trips = trip_keys.length;
          trip_keys.forEach(function(t){
            // Lat and long are switched in this Leaflet. Good times.
            if(trips_t2[t]){
              var d = interpolate( trips_t1[t], trips_t2[t], f),
                  dot = canvasOverlay._map.latLngToContainerPoint(d);
              context.fillStyle = colors[ t.split('.')[1] ];
              context.beginPath();
              context.arc(dot.x, dot.y, window.params.zoom - 9 + 1, 0, Math.PI * 2);
              context.fill();
              context.lineWidth = 0.5;
              context.strokeStyle = '#FFFFFF';
              context.stroke();
              context.closePath();
            }

          });
          frame = (frame + 1) % frame_count;
          if(frame == 0){
            current_index += 1;
            active_trips_div.text( active_trips + ' active trips' );

            var t = m_to_h( data.start_time + current_index );
            current_time_h.val(t.h);
            current_time_m.val(t.m);
            current_time_s.val(t.s);
            current_time_p.val(t.p);
          }
          if(running && current_index < (times.length - 1)){
            setTimeout(function(){
              requestAnimationFrame(draw);
            }, timeout);
          }
        };
        var drawingOnCanvas = function(canvasOverlay, params) {
          window.canvasOverlay = canvasOverlay;
          window.params = params;
          draw();
        };
        L.canvasOverlay()
          .drawing(drawingOnCanvas)
          .addTo(map);

      // UI Controls
      $(document).on('input change', '#speed', function(e){
        var slider = $('#speed-slider'),
            max = +slider.prop('max'),
            val = +slider.val();
        window.timeout = max - val;
      });
      $(document).on('click', '#run', function(){
        var icon = window.running ? 'play' : 'stop';
        window.running = !window.running;
        $('#run').html('<i class="fa fa-' + icon + '"></i>')
        if(window.running){
          draw();
        }
      });
      $(document).on('change', '.current-time', function(e){
        var restart = false;
        if(window.running){
          restart = true
          window.running = false;
        }
        var h = +$('#hour').val(),
            m = +$('#minute').val(),
            p = $('#period').val();
        if(p == 'AM' && h == 12){
          h = 0;
        } else if(p == 'PM'){
          h = (h + 12) % 24
        }
        window.current_index = (h * 60 + m - window.start_time) % 1440;
        draw();
        if(restart){
          window.running = true;
        }
      });
}






$('#processLink').click(function(){

  var dataKey = "trucks";
  var locdata = 'assets/data/truckData.json';
  processTables(locdata, dataKey);
})

function processTables(processParse, dataKey){
    var phead = '<thead><tr>',
      pfoot = '<tfoot><tr>',
      pbody = '<tbody>',
      ptable = '<div class="table-responsive"><table class="table striped js-exportable dataTable" id="proTable">',
      pfinal = '',
      processData = [];
     $.getJSON(processParse, function(parseTable){
      for(var t = 0; t < parseTable.tableHead.length; ++t) {

          pfoot += '<th>'+parseTable.tableHead[t]+'</th>';
          phead += '<th>'+parseTable.tableHead[t]+'</th>';
      }
        for(var i = 0; i < parseTable[dataKey].length; ++i){
          ff = parseTable[dataKey];
          pbody += '<tr id="dataTruckid'+i+'">'+ff[i]+'</tr>';
        }




    phead += '</tr></thead>';
    pfoot += '</tr></tfoot>';
    pbody += '</tbody>'
    pfinal = ptable+phead+pfoot+pbody+"</table></div>";
    $('#tableBody').html(pfinal);
    var datesHold = [];
    var rowDate = document.getElementsByClassName('final');
          for(var i = 0; i < rowDate.length; ++i){
              datesHold.push(Date.parse(rowDate[i].innerText));
            }
            var sorted = datesHold.slice().sort(function(a, b) {
              return a - b;
            })
            var earliest = sorted[0];
            var latest = sorted[sorted.length - 1];
            differenceDay = datediff(earliest, latest);




    $('#proTable').DataTable({
      dom: 'Bfrtip',
      responsive: true,
      buttons: [
        'copy', 'csv', 'excel', 'pdf', 'print'
      ]
    });
})

};

function parseDate(str) {
    var mdy = str.split('/');
    return new Date(mdy[2], mdy[0]-1, mdy[1]);
}

function datediff(first, second) {
    // Take the difference between the dates and divide by milliseconds per day.
    // Round to nearest whole number to deal with DST.
    return Math.round((second-first)/(1000*60*60*24));
}


//alert(datediff(parseDate(first.value), parseDate(second.value)));

$('#geoTables').click(function(){

});
});

