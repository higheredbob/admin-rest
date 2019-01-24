(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.tidy = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var haversine = require('haversine');

module.exports.tidy = tidy;

// Public function

function tidy(geojson, options) {

    options = options || {};

    // Set the minimum distance in metres and time interval in seconds between successive coordinates
    var filter = {
        minimumDistance: options.minimumDistance || 10,
        minimumTime: options.minimumTime || 5,
        maximumPoints: options.maximumPoints || 1000
    };

    // Create the tidy output feature collection
    var tidyOutput = {
        "type": "FeatureCollection",
        "features": []
    };
    var emptyFeature = {
        "type": "Feature",
        "properties": {
            "coordTimes": []
        },
        "geometry": {
            "type": "LineString",
            "coordinates": []
        }
    };

    // Helper to pass an object by value instead of reference
    function clone(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

    //Loop through input features

    for (var featureIndex = 0; featureIndex < geojson.features.length; featureIndex++) {

        // Skip non LineString features in the collections
        if (geojson.features[featureIndex].geometry.type != 'LineString') {
            continue;
        }

        var lineString = geojson.features[featureIndex].geometry.coordinates,
            timeStamp = geojson.features[featureIndex].properties.coordTimes;


        tidyOutput.features.push(clone(emptyFeature));

        // Loop through the coordinate array of the noisy linestring and build a tidy linestring

        for (var i = 0; i < lineString.length; i++) {

            // Add first and last points
            if (i === 0 || i == lineString.length - 1) {
                tidyOutput.features[tidyOutput.features.length - 1].geometry.coordinates.push(lineString[i]);
                if (timeStamp) {
                    tidyOutput.features[tidyOutput.features.length - 1].properties.coordTimes.push(timeStamp[i]);
                }
                continue;
            }

            // Calculate distance between successive points in metres
            var point1 = {
                latitude: lineString[i][1],
                longitude: lineString[i][0]
            };
            var point2 = {
                latitude: lineString[i + 1][1],
                longitude: lineString[i + 1][0]
            };

            var Dx = haversine(point1, point2, {
                unit: 'km'
            }) * 1000;

            // Skip point if its too close to each other
            if (Dx < filter.minimumDistance) {
                continue;
            }

            // Calculate sampling time diference between successive points in seconds
            if (timeStamp) {

                var time1 = new Date(timeStamp[i]);
                var time2 = new Date(timeStamp[i + 1]);

                var Tx = (time2 - time1) / 1000;

                // Skip point if sampled to close to each other
                if (Tx < filter.minimumTime) {
                    continue;
                }

            }

            // Copy the point and timestamp to the tidyOutput
            tidyOutput.features[tidyOutput.features.length - 1].geometry.coordinates.push(lineString[i]);
            if (timeStamp) {
                tidyOutput.features[tidyOutput.features.length - 1].properties.coordTimes.push(timeStamp[i]);
            }

            // If feature exceeds maximum points, start a new feature beginning at the previuos end point
            if (tidyOutput.features[tidyOutput.features.length - 1].geometry.coordinates.length % filter.maximumPoints === 0) {
                tidyOutput.features.push(clone(emptyFeature));
                tidyOutput.features[tidyOutput.features.length - 1].geometry.coordinates.push(lineString[i]);
                if (timeStamp) {
                    tidyOutput.features[tidyOutput.features.length - 1].properties.coordTimes.push(timeStamp[i]);
                }
            }
        }
    }

    // DEBUG
    //    console.log(JSON.stringify(tidyOutput));

    // Your tidy geojson is served
    return tidyOutput;

}
},{"haversine":2}],2:[function(require,module,exports){
var haversine = (function () {
  var RADII = {
    km:    6371,
    mile:  3960,
    meter: 6371000,
    nmi:   3440
  }

  // convert to radians
  var toRad = function (num) {
    return num * Math.PI / 180
  }

  // convert coordinates to standard format based on the passed format option
  var convertCoordinates = function (format, coordinates) {
    switch (format) {
    case '[lat,lon]':
      return { latitude: coordinates[0], longitude: coordinates[1] }
    case '[lon,lat]':
      return { latitude: coordinates[1], longitude: coordinates[0] }
    case '{lon,lat}':
      return { latitude: coordinates.lat, longitude: coordinates.lon }
    case '{lat,lng}':
      return { latitude: coordinates.lat, longitude: coordinates.lng }
    case 'geojson':
      return { latitude: coordinates.geometry.coordinates[1], longitude: coordinates.geometry.coordinates[0] }
    default:
      return coordinates
    }
  }

  return function haversine (startCoordinates, endCoordinates, options) {
    options   = options || {}

    var R = options.unit in RADII
      ? RADII[options.unit]
      : RADII.km

    var start = convertCoordinates(options.format, startCoordinates)
    var end = convertCoordinates(options.format, endCoordinates)

    var dLat = toRad(end.latitude - start.latitude)
    var dLon = toRad(end.longitude - start.longitude)
    var lat1 = toRad(start.latitude)
    var lat2 = toRad(end.latitude)

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2)
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))

    if (options.threshold) {
      return options.threshold > (R * c)
    }

    return R * c
  }

})()

if (typeof module !== 'undefined' && module.exports) {
  module.exports = haversine
}

},{}]},{},[1])(1)
});
