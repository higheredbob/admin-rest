var corlen = 0,
    fromlen = 0;
    tolen = 99,
    newArray = [],
    //newArray[0] = [],
    newTimeArr = [];
    //newTimeArr[0] = [];
    for(var i = 0; i < 5000; ++i){

        newArray.push(turf.point(xpos[i], {coordTimes: tpos[i]}))
        newTimeArr.push(tpos[i])
        fromlen++

        /*
        if(fromlen < 15000){
            newArray[corlen].push([xpos[i][0].toFixed(5),xpos[i][1].toFixed(5)])
            newTimeArr[corlen].push(tpos[i])
            fromlen++
        } else {
            corlen += 1;
            fromlen = 0;
            newArray[corlen] = [];
            newTimeArr[corlen] = [];
            newArray[corlen].push([xpos[i][0].toFixed(5),xpos[i][1].toFixed(5)])
            newTimeArr[corlen].push(tpos[i])
            fromlen++;
        }
        */
    }
    function get_line(array, timer){
      /*
        var nwray = {"type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "coordTimes": []
            },
            "geometry": {
                "type": "LineString",
                "coordinates": []
            }
        }
    ]},
    */
    var turfL = [],
            nwlen = array.length;
    for(var i = 0; i < nwlen; ++i){
        newTurf = turf.lineString(array[i], {coordTimes: timer[i]});
        turfL.push(turf.cleanCoords(newTurf).geometry.coordinates);
    }
   //     nwray.features[0].geometry.coordinates.push(turfL);
   //     nwray.features[0].properties.coordTimes.push(timer[i])
   // }
   var nwray = {"type": "FeatureCollection",
    "features": turfL};
    return nwray
}
geojson = turf.clustersDbscan(turf.featureCollection(newArray), 1) //get_line(newArray, newTimeArr);

//tidied = tidy.tidy(geojson)
/*{
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "coordTimes": []
            },
            "geometry": {
                "type": "LineString",
                "coordinates": []
            }
        }
    ]
}
*/
