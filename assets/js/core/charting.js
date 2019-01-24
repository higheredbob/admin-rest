$(document).ready(function(){
$('#d3Steam').click(function(){

    if($('#d3Steam').hasClass('slides')){

    } else {
        $('#d3Steam').addClass('slides')
        initslider();
        newpie();
    }

});
function newpie(){
var w = 750;
var h = 500;
var r = Math.min(w, h) - 380;
var ir = Math.min(w, h) - 430;
var textOffset = 28;
var tweenDuration = 1250;
var mouseindur = 375;
var mouseoutdur = 175;

//OBJECTS TO BE POPULATED WITH DATA LATER
var lines, valueLabels, nameLabels, selection, selectionout;
var pieData = [];
var oldPieData = [];
var filteredPieData = [];

//D3 helper function to populate pie slice parameters from array data
var donut = d3.pie().value(function(d){
  return d.itemValue;
}).sort(null);

//D3 helper function to create colors from an ordinal scale
var color = d3.scaleOrdinal() //.category20c();
            .range(['#f90a05','#ff9100','#885dff','#d500f9','#76ff03','#ffdd5b'])

//D3 helper function to draw arcs, populates parameter "d" in path object
var arc = d3.arc()
  .startAngle(function(d){ return d.startAngle; })
  .endAngle(function(d){ return d.endAngle; })
  .innerRadius(ir)
  .outerRadius(r);

var arcover = d3.arc()
  .startAngle(function(d){ return d.startAngle; })
  .endAngle(function(d){ return d.endAngle; })
  .innerRadius(ir+13)
  .outerRadius(r+29)
///////////////////////////////////////////////////////////
// GENERATE FAKE DATA /////////////////////////////////////
///////////////////////////////////////////////////////////

var data;

var dataStructure = [
   {
      "data":[
            {
                "itemLabel": "Texting",
                "itemValue": 608
            },
            {
                "itemLabel": "FB",
                "itemValue": 166
            },
            {
                "itemLabel": "Phone",
                "itemValue": 106
            },
            {
                "itemLabel": "Nights Away",
                "itemValue": 288
            },

        ],
        "label": "Wifes hour totals"
    },
    {
        "data":[
            {
                "itemLabel": "At House",
                "itemValue": 642
            },
            {
                "itemLabel": "Helping Household Family",
                "itemValue": 232
            },
            {
                "itemLabel": "Helping Outside of household",
                "itemValue": 55
            },
            {
                "itemLabel": "Social Networking",
                "itemValue": 48
            },
            {
                "itemLabel": "Phone & Texting",
                "itemValue": 36
            },
        ],
        "label": "Avg womans hour totals"
    },
    {
        "data": [
            {
                "itemLabel": "Tv",
                "itemValue": 480
            },
            {
                "itemLabel": "All Socializing",
                "itemValue": 156
            },
            {
                "itemLabel": "Reading",
                "itemValue": 40
            },
            {
                "itemLabel": "Computer or Games",
                "itemValue": 52
            },
        ],
        "label": "avg married couple"
    },
    {
        "data": [
            {
                "itemLabel": "Late Night",
                "itemValue": 17305
            },
            {
                "itemLabel": "Voice/Phone",
                "itemValue": 6410
            },
            {
                "itemLabel": "Texting",
                "itemValue": 36720
            },

        ],
        "label":"Wife total minutes"
    },
    {
        "data":[
            //{
            //    "itemLabel": "Late Days",
            //    "itemValue": 12
            //},
            {
                "itemLabel": "Absent",
                "itemValue": 151
            },
            {
                "itemLabel": "Available",
                "itemValue": 66
            },
            //{
            //    "itemLabel": "Miles from home",
            //    "itemValue": 11.2
            //},
        ],
        "label": "Distance & Day info"
   },
];

///////////////////////////////////////////////////////////
// CREATE VIS & GROUPS ////////////////////////////////////
///////////////////////////////////////////////////////////

var vis = d3.select("#d3piechart").append("svg:svg")
  .attr("width", w)
  .attr("height", h);

//GROUP FOR ARCS/PATHS
var arc_group = vis.append("svg:g")
  .attr("class", "arc")
  .attr("transform", "translate(" + (w/2) + "," + (h/2) + ")");

//GROUP FOR LABELS
var label_group = vis.append("svg:g")
  .attr("class", "label_group")
  .attr("transform", "translate(" + (w/2) + "," + (h/2) + ")");

//GROUP FOR CENTER TEXT
var center_group = vis.append("svg:g")
  .attr("class", "center_group")
  .attr("transform", "translate(" + (w/2) + "," + (h/2) + ")");

//PLACEHOLDER GRAY CIRCLE
// var paths = arc_group.append("svg:circle")
//     .attr("fill", "#EFEFEF")
//     .attr("r", r);

///////////////////////////////////////////////////////////
// CENTER TEXT ////////////////////////////////////////////
///////////////////////////////////////////////////////////

//WHITE CIRCLE BEHIND LABELS
var whiteCircle = center_group.append("svg:circle")
  .attr("fill", "white")
  .attr("r", ir);

///////////////////////////////////////////////////////////
// STREAKER CONNECTION ////////////////////////////////////
///////////////////////////////////////////////////////////

// to run each time data is generated
function update(number) {

  data = dataStructure[number].data;

  oldPieData = filteredPieData;
  pieData = donut(data);

  var sliceProportion = 0; //size of this slice
  filteredPieData = pieData.filter(filterData);
  function filterData(element, index, array) {
    element.name = data[index].itemLabel;
    element.value = data[index].itemValue;
    sliceProportion += element.value;
    return (element.value > 0);
  }

    //DRAW ARC PATHS
    paths = arc_group.selectAll("path").data(filteredPieData);
    paths.enter().append("svg:path")
      .attr("stroke", "white")
      .attr("stroke-width", 0.5)
      .attr("fill", function(d, i) { return color(i); })
      .transition()
        .duration(tweenDuration)
        .attrTween("d", pieTween);
    paths
      .transition()
        .duration(tweenDuration)
        .attrTween("d", pieTween);
    paths.exit()
      .transition()
        .duration(tweenDuration)
        .attrTween("d", removePieTween)
      .remove();

    //DRAW TICK MARK LINES FOR LABELS
    lines = label_group.selectAll("line").data(filteredPieData);
    lines.enter().append("svg:line")
      .attr("x1", 0)
      .attr("x2", 0)
      .attr("y1", -r-3)
      .attr("y2", -r-15)
      .attr("stroke", "gray")
      .attr("transform", function(d) {
        return "rotate(" + (d.startAngle+d.endAngle)/2 * (180/Math.PI) + ")";
      });
    lines.transition()
      .duration(tweenDuration)
      .attr("transform", function(d) {
        return "rotate(" + (d.startAngle+d.endAngle)/2 * (180/Math.PI) + ")";
      });
    lines.exit().remove();

    //DRAW LABELS WITH PERCENTAGE VALUES
    valueLabels = label_group.selectAll("text.value").data(filteredPieData)
      .attr("dy", function(d){
        if ((d.startAngle+d.endAngle)/2 > Math.PI/2 && (d.startAngle+d.endAngle)/2 < Math.PI*1.5 ) {
          return 5;
        } else {
          return -7;
        }
      })
      .attr("text-anchor", function(d){
        if ( (d.startAngle+d.endAngle)/2 < Math.PI ){
          return "beginning";
        } else {
          return "end";
        }
      })
      .text(function(d){
        var percentage = (d.value/sliceProportion)*100;
        return percentage.toFixed(1) + "%";
      });

    valueLabels.enter().append("svg:text")
      .attr("class", "value")
      .attr("transform", function(d) {
        return "translate(" + Math.cos(((d.startAngle+d.endAngle - Math.PI)/2)) * (r+textOffset) + "," + Math.sin((d.startAngle+d.endAngle - Math.PI)/2) * (r+textOffset) + ")";
      })
      .attr("dy", function(d){
        if ((d.startAngle+d.endAngle)/2 > Math.PI/2 && (d.startAngle+d.endAngle)/2 < Math.PI*1.5 ) {
          return 5;
        } else {
          return -7;
        }
      })
      .attr("text-anchor", function(d){
        if ( (d.startAngle+d.endAngle)/2 < Math.PI ){
          return "beginning";
        } else {
          return "end";
        }
      }).text(function(d){
        var percentage = (d.value/sliceProportion)*100;
        return percentage.toFixed(1) + "%";
      });

    valueLabels.transition().duration(tweenDuration).attrTween("transform", textTween);

    valueLabels.exit().remove();


    //DRAW LABELS WITH ENTITY NAMES
    nameLabels = label_group.selectAll("text.units").data(filteredPieData)
      .attr("dy", function(d){
        if ((d.startAngle+d.endAngle)/2 > Math.PI/2 && (d.startAngle+d.endAngle)/2 < Math.PI*1.5 ) {
          return 17;
        } else {
          return 5;
        }
      })
      .attr("text-anchor", function(d){
        if ((d.startAngle+d.endAngle)/2 < Math.PI ) {
          return "beginning";
        } else {
          return "end";
        }
      }).text(function(d){
        return d.name;
      });

    nameLabels.enter().append("svg:text")
      .attr("class", "units")
      .attr("transform", function(d) {
        return "translate(" + Math.cos(((d.startAngle+d.endAngle - Math.PI)/2)) * (r+textOffset) + "," + Math.sin((d.startAngle+d.endAngle - Math.PI)/2) * (r+textOffset) + ")";
      })
      .attr("dy", function(d){
        if ((d.startAngle+d.endAngle)/2 > Math.PI/2 && (d.startAngle+d.endAngle)/2 < Math.PI*1.5 ) {
          return 17;
        } else {
          return 5;
        }
      })
      .attr("text-anchor", function(d){
        if ((d.startAngle+d.endAngle)/2 < Math.PI ) {
          return "beginning";
        } else {
          return "end";
        }
      }).text(function(d){
        return d.name;
      });

    nameLabels.transition().duration(tweenDuration).attrTween("transform", textTween);

    nameLabels.exit().remove();

}

///////////////////////////////////////////////////////////
// FUNCTIONS //////////////////////////////////////////////
///////////////////////////////////////////////////////////

// Interpolate the arcs in data space.
function pieTween(d, i) {
  var s0;
  var e0;
  if(oldPieData[i]){
    s0 = oldPieData[i].startAngle;
    e0 = oldPieData[i].endAngle;
  } else if (!(oldPieData[i]) && oldPieData[i-1]) {
    s0 = oldPieData[i-1].endAngle;
    e0 = oldPieData[i-1].endAngle;
  } else if(!(oldPieData[i-1]) && oldPieData.length > 0){
    s0 = oldPieData[oldPieData.length-1].endAngle;
    e0 = oldPieData[oldPieData.length-1].endAngle;
  } else {
    s0 = 0;
    e0 = 0;
  }
  var i = d3.interpolate({startAngle: s0, endAngle: e0}, {startAngle: d.startAngle, endAngle: d.endAngle});
  return function(t) {
    var b = i(t);
    return arc(b);
  };
}

function removePieTween(d, i) {
  s0 = 2 * Math.PI;
  e0 = 2 * Math.PI;
  var i = d3.interpolate({startAngle: d.startAngle, endAngle: d.endAngle}, {startAngle: s0, endAngle: e0});
  return function(t) {
    var b = i(t);
    return arc(b);
  };
}

function textTween(d, i) {
  var a;
  if(oldPieData[i]){
    a = (oldPieData[i].startAngle + oldPieData[i].endAngle - Math.PI)/2;
  } else if (!(oldPieData[i]) && oldPieData[i-1]) {
    a = (oldPieData[i-1].startAngle + oldPieData[i-1].endAngle - Math.PI)/2;
  } else if(!(oldPieData[i-1]) && oldPieData.length > 0) {
    a = (oldPieData[oldPieData.length-1].startAngle + oldPieData[oldPieData.length-1].endAngle - Math.PI)/2;
  } else {
    a = 0;
  }
  var b = (d.startAngle + d.endAngle - Math.PI)/2;

  var fn = d3.interpolateNumber(a, b);
  return function(t) {
    var val = fn(t);
    return "translate(" + Math.cos(val) * (r+textOffset) + "," + Math.sin(val) * (r+textOffset) + ")";
  };
}
function legend(array, element){
    var arraylen = array.length;

    element.find("h4").remove();
    element.find("p").remove();
    for(var ac = 0; ac < arraylen; ++ac){
        var title = array[ac].itemLabel;
        var legval = array[ac].itemValue;
        if(title == "Available"){
        element.append("<h4>"+title+"</h4>");
        element.append("<p>"+(legval+151)+"</p>");
        } else {
        element.append("<h4>"+title+"</h4>");
        element.append("<p>"+legval+"</p>");
    }
    }
}

var pieslider = document.getElementById('pie-slider');
var pieField = document.getElementById('pie-label');

pieslider.noUiSlider.on('update', function (values, handle) {
    console.log(values[handle])
    console.log(handle)
    update(values[handle]);
    legend(dataStructure[values[handle]].data, $('#d3legend'));
    pieField.innerHTML = dataStructure[values[handle]].label;
    piesliderVal = values[handle];
});


/*
$( "#slider" ).slider({
    value: 0,
    min: 0,
    max: 3,
    step: 1,
    slide: function( event, ui ) {
        update(ui.value);
        console.log(ui.value);
      }
})
*/
/*
pieslider.noUiSlider.each(function() {

  //
  // Add labels to slider whose values
  // are specified by min, max and whose
  // step is set to 1
  //

  // Get the options for this slider
  var opt = $(this).data().noUiSlider.options;

  // Get the number of possible values
  var vals = opt.max - opt.min;

  // Space out values
  for (var i = 0; i <= vals; i++) {

    var el = $('<label>'+pieStructure[i].label+'</label>').css('left',(i/vals*100)+'%');

    $( "#pie-slider" ).append(el);

  }

});
*/
};
});
function initslider(){
    var pieslider = document.getElementById('pie-slider');

noUiSlider.create(pieslider, {
  start: 0,
 // tooltips: [slider({decimals: 1 })],
  connect: [true,false],
  step: 1,
  range: {
    min: 0,
    max: 4
  },
  format: wNumb({
    decimals: 0
  })
});
}
/*
udate(0);
}
dataone = {
    datasets: [{
        label: "Vs. Avg Woman on social activities",
        backgroundColor:
        data: [.628, .173, .11, .037, .0501]
    }],
    labels: [
        '602 hours texting',
        '166 hours talking',
        '106 hours on facebook',
        '36 hours for all phone, text, email, mail',
        '48 hours for all social networking, inc. in person'

    ],
    options: {rotation: -0.7 * Math.PI, animation:{animateScale: true}}
}
var PieOne = new Chart(ctx, {
    type: 'pie',
    data: dataone,
    options:

})
    $('#d3Steam').click(function(){
    newpie();
})
function newpie() {
    const width = 500;
    const height = 500;
    const radius = Math.min(width, height) / 2;
    const svg = d3.select('#d3piechart')
        .append("svg")
            .attr('width', width)
            .attr('height', height)
        .append("g")
            .attr('transform', `translate(${width / 2}, ${height / 2})`);
    const color = d3.scaleOrdinal(['#885dff', '#7b1fa2', '.52']);
    const pie = d3.pie()
        .value(1)
        .sort(null);

    const arc = d3.arc()
        .innerRadius(0);
    piedata = {
        'group':['Wife','Average US Woman 30-44', 'Average Together Married Couple 30-44'],
        'average': 48,
        'values': [{
            'name': ['Rita', 'avgWoman', 'avgmarriedCouple'],
            value:[
             {totalMinLateNight:17305, hoursLateNight:288, daysLateNight:12, phoneMins:6410, phoneAvg:106, textTotal:36720, textHours:602, fbTotal: 166, daysAbsent:151, daysAvail:217, avgMileFromHouse: 11.2},
             {onHouse: 642, helpingHouseFamily: 232, helpingOthers: 55.2, socialNetworking: 48, phoneTexting: 36},
             {onTV: 480, socializingTotal: 156, reading: 40, onComputerorGames: 52}
            ],
            'percentvsself:'['.24', '.09', '.14', '.51'],
            'radius': [2,3,5,7,11,14],
            'strokeWidth': [.5,.75,1,2,3,4],
            'stroke': ['#fff'],
            'opacity': [0.7,0.5,0.3,0.15],
            'duration': [136,165,185],
            'lev': [5.67]
            }],
//1162 .24 .09 .14
    }
    function prepData(d) {
        return {
            name: d.demographic,
            average: d.average,
            values: [
                {
                name: d.group,
                value: d.statavg,
                radius: d.radius,
                opacity: d.opacity,
                duration: d.duration,
                stroke: d.stroke,
                lev: d.lev
                }

            ]
        }
    }
    function arcTween(a) {
        const i = d3.interpolate(this._current, a);
        this._current = i(1);
        return t => arc(i(t));
    }

    const radiusScale = d3.scaleSqrt()
        .domain([0, piedata.values[0].value])
        .range([0, Math.min(width, height) / 2]);
        function upd(data) {
            updateHTML(data);
            arc.outerRadius(d => radiusScale(d.values.radius));
            const path =  svg.selectAll('path')
                .data(pie(data.values));

                path.transition().duration(function(d) {return d.duration}).attrTween('d', arcTween);
                path.enter().append('path')
                    .attr("fill", (d,i) => color(i))
                    .attr('d', arc)
                    .attr('stroke', function(d) {return d.values.stroke})
                    .attr('stroke-width', function(d) {return d.values.strokeWidth})
                    .each(function(d) { this._current = d;});
                    console.log(d)
                    svg.select('averageLine').transition().duration(200)
                        .attr('r', radiusScale(piedata.values.radius));
        }
        let time = 0;
        let interval;
        function step() {
            upd(piedata[time]);
            time = (time == 49) ? 0 : time + 1;
        }
        $('#playbutton').on("click", function() {
            const button = $(this);
            if(button.text() === "Play"){
                button.text("Pause");
                interval = setInterval(step, function(d) {return d.duration});
            } else {
                button.text("Play");
                clearInterval(interval);
            }
        });

        upd(piedata);
        piedata.values.forEach((d, i) => {
        //piedata.values.forEach((d, i) => {
            svg.append('circle')
            .attr('fill', "none")
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('r', radiusScale(d.values.radius))
            .attr('stroke', color(i))
            .attr('stroke-dasharray', '4,4');
        });
        svg.append('circle')
            .attr('class', "averageLine")
            .attr("fill", "none")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("stroke", "grey")
            .attr("stroke-width", "2px");

        };
      function updateHTML(data) {
      */  // Update title
        /*
        $("#year").text(data.name);
        // Update slider label
        $("#year-label").text(data.name);
        // Update table values
        $("#fig1").html(data.values[0].value.toLocaleString());
        $("#fig2").html(data.values[1].value.toLocaleString());
        $("#fig3").html(data.values[2].value.toLocaleString());
        $("#fig4").html(data.values[3].value.toLocaleString());
        $("#fig5").html(data.values[4].value.toLocaleString());
        $("#avFig").html(data.average.toLocaleString());
        */
   //   }

/*
var counting = 0;
var divby = 0;
var dollars = 0;
var graphing = [];
var newgraph = [];
//graphing[0] = [];
//graphing.county = ["Apache County"];

var counties = unique(graphdata.feature.data);
for(var i = 0; i < graphdata.feature.data.length; i++) {
    var names = counties[counting];
    var f = graphdata.feature.data[i];
    if(f.county == names) {
        dollars += parseInt(f.MedianIncome);
        divby += 1;
    } else {
        graphing.push(dollars/divby);
        counting += 1;
        divby = 0;
        dollars = 0;
    }
}
var dolla = 0;
var divva = 0;
for(var i = 0; i < graphdata.feature.data.length; i++) {
    var name = counties[14];
    var f = graphdata.feature.data[i];
    if(f.county == name) {
        dolla += parseInt(f.MedianIncome);
        divva += 1;
    }
}
graphing.push(dolla/divva);

function unique(arr) {
    var u = {}, a = [];
    for(var i = 0, l = arr.length; i < l; ++i){
        if(!u.hasOwnProperty(arr[i].county)) {
            a.push(arr[i].county);
            u[arr[i].county] = 1;
        }
    }
    return a;
}
*/
$('#C3Chart').click(function(){
    var c3div = document.getElementById('c3Chart');

    var c3chart = c3.generate({
        bindto: '#c3chart',
        data: {
            columns: [
                 ['a', Math.round(graphing[0])],
                 ['b', Math.round(graphing[1])],
                 ['c', Math.round(graphing[2])],
                 ['d', Math.round(graphing[3])],
                 ['e', Math.round(graphing[4])],
                 ['f', Math.round(graphing[5])],
                 ['g', Math.round(graphing[6])],
                 ['h', Math.round(graphing[7])]

            ],
            type: 'pie',
            onmouseover: function (d, i) {
                 d3.select(i).attr('transform', 'scale('+d.value/45000+')');
                console.log("onmouseover", d, i);},
            onmouseout: function (d, i) {
                 d3.select(i).attr('transform', 'scale(1)');
                console.log("onmouseout", d, i);}
    },


        tooltip: {
            position: function (data, width, height, element) {
                return {top: 0, right: 0}
            }
        },
        onredered: function(){
            var self = this;
            console.log(self);
            var d3Pie = d3.select('.c3-chart-arcs');
          var pieSize = d3Pie.node().getBBox();
          var  pieTransform = d3.transform(d3Pie.attr("transform")); // credit : http://stackoverflow.com/questions/20340263/d3-retrieve-and-add-to-current-selections-attribute-value

          // MODIFY PIE POSITION
          var posX = 0+pieSize.width/1.5;
          var posY = pieTransform.translate[1];
          d3Pie.attr('transform', 'translate('+posX+','+posY+')')
        },
        size: {
            width: 600,
            height: 600
        },

        label: {
            format: function (value, ratio, id) {
                return d3.format('$')(value);
            }
        }

    });


});


$('#gaugeChart').click(function(){
var d1 =  Math.round(graphing[0]);
var d2 = Math.round(graphing[1]);
var d4 = Math.round(graphing[2]);
var d5 = Math.round(graphing[3]);
var d6 = Math.round(graphing[4]);
var d7 = Math.round(graphing[5]);
var d8 = Math.round(graphing[6]);
var d14 = Math.round(graphing[14]);
var d13 = Math.round(graphing[13]);

var d12 = Math.round(graphing[12]);
var d11 = Math.round(graphing[11]);
var d10 = Math.round(graphing[10]);
var d9 = Math.round(graphing[9]);
var d15 = Math.round(graphing[8]);
var d16 = Math.round(graphing[7]);
var colval = [5000,10000,20000,30000,40000,50000,60000];
var colpatt = ['#9873FF', '#f50057', '#69f0ae', '#d500f9', '#c6ff00', '#ff6e40', '#64ffda'];
var c3gauge = c3.generate({
    bindto: '#c3gaugechart',
    padding: {
        top: 40,
        bottom: 40,
        left: 20,
        right: 20
    },
    color: {
            pattern: ['#64ffda', '#ff5722', '#ffff8d', '#ad1457', '#2962ff', '#f06292', '#ccff90', '#9c27b0', '#e57373', '#00bfa5', '#ffc400', '#00e676', '#7986cb', '#f57c00', '#2962ff', '#5e35b1'],

        },
    data: {
        columns: [
            ['data', 25000],

        ],
        type: 'gauge',
        onmouseover: function (d, i) {
                 d3.select(i).attr('transform', 'scale(1.03)');
                console.log("onmouseover", d, i);},
        onmouseout: function (d, i) {
                 d3.select(i).attr('transform', 'scale(1)');
                 console.log("onmouseout", d, i);}

    },
    gauge: {
      fullCircle: true, // This makes it go all the way around
      max: 66000, // This is your max unit -- 12h
      min: 0, // Min. is 0
      startingAngle: 90, // This sets the opening to the other side
      width: 95, // This is how thick the outer arc is
      label: {
        format: function(value, ratio) {
          return value + 'MInc';
        }
      }
    },

    onrendered: function() {
        var self = this;
        console.log(self);
        var radius = this.radius;
        var iradius = this.innerRadius;
       // timeout is needed for initial render.
       //drawGauge(this, opts, gaugeOpts);
       setTimeout(function(){ // timeout is needed for initial render.
        d3.selectAll('circle.c3-arc-background').remove();
        d3.selectAll('circle.mycircle').remove();
        d3.selectAll('text.mytext').remove();


        for(var i in colval) {
            var v = colval[i];
            var col = colpatt[parseInt(i) + 1];
            var angle = Math.PI * v / 90;
            var center = d3.select('.c3-chart-arc').node().getBBox();
            var h = center.height;
            var w = center.width;
            var wm = 54000000;
            var pix = (w * h);
            var mpix = (wm / pix);
            var x0 = (iradius * Math.cos(angle));
            var y0 = (iradius * Math.sin(angle));
            var x1 = (radius * Math.cos(angle));
            var y1 = (radius * Math.sin(angle));


            d3.select('.c3-chart-arcs')
                .insert('circle')
                .classed('c3-arc-background', true)
                .attr({
                    x1: -x0,
                    y1: -y0,
                    x2: -x1,
                    y2: -y1
                })
                //.attr('class', 'c3-arc-background')
                .attr('r', (325 * (radius / mpix)))
                .style('fill', '#0091ea');
        }

      }, 0);
      }

});

setTimeout(function() {
        c3gauge.load({
            columns: [
                ['data15', d16 ]
            ]
        })
    }, 700);
setTimeout(function() {
        c3gauge.load({
            columns: [
                ['data14',  d7]
            ]
        })
    }, 1000);
setTimeout(function() {
        c3gauge.load({
            columns: [
                ['data13',  d10 ]
            ]
        })
    }, 1400);
setTimeout(function() {
        c3gauge.load({
            columns: [
                ['data12', d4 ]
            ]
        })
    }, 1800);
setTimeout(function() {
        c3gauge.load({
            columns: [
                ['data11', d11 ]
            ]
        })
    }, 2400);
setTimeout(function() {
        c3gauge.load({
            columns: [
               ['data10', d6 ]
            ]
        })
    }, 2900);
setTimeout(function() {
        c3gauge.load({
            columns: [
               ['data9', d13 ]
            ]
        })
    }, 3400);
setTimeout(function() {
        c3gauge.load({
            columns: [
               ['data8',  d2 ]
            ]
        })
    }, 3900);
setTimeout(function() {
        c3gauge.load({
            columns: [
               ['data7', d14 ]
            ]
        })
    }, 4400);
setTimeout(function() {
        c3gauge.load({
            columns: [
               ['data6', d8 ]
            ]
        })
    }, 4900);
setTimeout(function() {

        c3gauge.load({
            columns: [
               ['data5',  d15 ]
            ]
        })
    }, 5400);
setTimeout(function() {

        c3gauge.load({
            columns: [
               ['data4',  d5]
            ]
        })
    }, 5900);
setTimeout(function() {

        c3gauge.load({
            columns: [
               ['data3',  d9 ]
            ]
        })
    }, 6200);
setTimeout(function() {

        c3gauge.load({
            columns: [
               ['data2', d12 ]
            ]
        })
    }, 6600);
setTimeout(function() {

        c3gauge.load({
            columns: [
               ['data1', d1 ]
            ]
        })
    }, 6800);
});


$('#chartjsModal').click(function(){


var ctx = document.getElementById('jsChart').getContext('2d');
var jschart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: counties,
        datasets: [{
            label: "Median Wage per County",
            data: graphing,
            backgroundColor: [
                'rgba(255, 143, 0, 0.8)',
                'rgba(33, 150, 243, 0.8)',
                'rgba(38, 198, 218, 0.8)',
                'rgba(255, 61, 0, 0.8)',
                'rgba(126, 87, 194, 0.8)',
                'rgba(129, 199, 132, 0.8)',
                'rgba(121, 134, 203, 0.8)',
                'rgba(129, 212, 250, 0.8)',
                'rgba(236, 64, 122, 0.8)',
                'rgba(171, 71, 188, 0.8)',
                'rgba(77, 182, 172, 0.8)',
                'rgba(255, 138, 128, 0.8)',
                'rgba(255, 245, 157, 0.8)',
                'rgba(198, 255, 0, 0.8)',
                'rgba(100, 255, 218, 0.8)'
            ],
            borderColor: [
                'rgba(230, 81, 0, 0.8)',
                'rgba(13, 71, 161, 0.8)',
                'rgba(0, 96, 100, 0.8)',
                'rgba(147, 42, 9, 0.8)',
                'rgba(69, 39, 160, 0.8)',
                'rgba(46, 125, 50, 0.8)',
                'rgba(48, 63, 159, 0.8)',
                'rgba(1, 87, 155, 0.8)',
                'rgba(136, 14, 79, 0.8)',
                'rgba(106, 27, 154, 0.8)',
                'rgba(0, 105, 92, 0.8)',
                'rgba(211, 47, 47, 0.8)',
                'rgba(249, 168, 37, 0.8)',
                'rgba(158, 157, 36, 0.8)',
                'rgba(0, 77, 64, 0.8)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scale: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});



function initd3steam() {
d3.json("../data/latedist.json", function(error, data) {
    console.log(data);
    var labelVar = 'date';
    var namesVar = data.features.filter( function(d){
        return d3.timeParse(d.pickuptime)
    })
    cd = []
    for(var i = 0; i < namesVar.length; ++i) {
    if(namesVar[i] !== undefined){
    cd.push(namesVar[i+2])
    }}
    color.domain(cd)
    var Se = [], seri = {};
    varNames.forEach(function (name) {
        seri[name] = {name:name, values:[]};
        Se.push(seri[name]);

    });
    dholder = {};
    pager = 0;
    countingD = {};
    countingD[0] = 0;
    dholder[0] = [];
    for(var i = 0; i < data.length; ++i){
        if(Se[pager].name == data[i].pickuptime ) {
            d = data[i].geometry.coordinates;
            dd = data[i].properties
            fd = Date.parse(dd.pickuptime).split(" ");
            nd = fd[1].split(":")
            countingD += dd.dist4;
            dholder[pager].push({hour: nd[0]})
        } else {
            d = data[i].geometry.coordinates;
            dd = data[i].properties
            fd = Date.parse(dd.pickuptime).split(" ");
            nd = fd[1].split(":")
            countingD += dd.dist4;
            dholder[pager].push({hour: nd[0], total:countingD});
            countingD = 0;
            pager += 1;
            dholder[pager] = [];

        }
    }
    data.forEach(function (d) {
        varNames.map(function (name) {
            seri[name].values.push({label: d[labelVar], value: d+name})})
        })

x.domain(data.mpa(function (d) {return d.pickuptime}))
stack(Se);
y.domain([0, d3.max(Se, function(c) {
    return d3.max(c.values, function (d) { return d.y0 + d.y})
})])

var stack = d3.layout.stack()
    .offset("wiggle")
    .values(function (d) { return d.values; })
    .x(function (d) { return x(d.label) + x.rangeBand() / 2; })
    .y(function (d) { return d.value; });



var selection = svg.selectAll(".series")
  .data(seriesArr)
  .enter().append("g")
    .attr("class", "series");

selection.append("path")
  .attr("class", "streamPath")
  .attr("d", function (d) { return area(d.values); })
  .style("fill", function (d) { return color(d.name); })
  .style("stroke", "grey");

  var area = d3.svg.area()
    .interpolate("cardinal")
    .x(function (d) { return x(d.label) + x.rangeBand() / 2; })
    .y0(function (d) { return y(d.y0); })
    .y1(function (d) { return y(d.y0 + d.y); });

});
     var color = d3.scale.ordinal()
          .range(["#001c9c","#101b4d","#475003","#9c8305","#d3c47c"]);
      var svg = d3.select("body").append("svg")
          .attr("width",  width  + margin.left + margin.right)
          .attr("height", height + margin.top  + margin.bottom)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
}

 stack(seriesArr);
        y.domain([0, d3.max(seriesArr, function (c) {
            return d3.max(c.values, function (d) { return d.y0 + d.y; });
          })]);
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
          .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Number of Rounds");
        var selection = svg.selectAll(".series")
          .data(seriesArr)
          .enter().append("g")
            .attr("class", "series");
        selection.append("path")
          .attr("class", "streamPath")
          .attr("d", function (d) { return area(d.values); })
          .style("fill", function (d) { return color(d.name); })
          .style("stroke", "grey");
        var points = svg.selectAll(".seriesPoints")
          .data(seriesArr)
          .enter().append("g")
            .attr("class", "seriesPoints");
        points.selectAll(".point")
          .data(function (d) { return d.values; })
          .enter().append("circle")
           .attr("class", "point")
           .attr("cx", function (d) { return x(d.label) + x.rangeBand() / 2; })
           .attr("cy", function (d) { return y(d.y0 + d.y); })
           .attr("r", "10px")
           .style("fill",function (d) { return color(d.name); })
           //.on("mouseover", function (d) { showPopover.call(this, d); })
           //.on("mouseout",  function (d) { removePopovers(); })

/*
Are you ready lads?
Aye aye captain!
I CANT HEAR YOU!!!
AYE AYE CAPTIAN!!!


oooohhhhhhh... who has a vagina as big as your wrist?
SloppySeconds Rita
who smells like old dead tuna fish?
SloppySeconds Rita
If marital nonsense be something you wish!
SloppySeconds Rita
She'll suck anything off, drop your pants an serve her the dish!
SloppySeconds Rita
READY!?!?
*/
});
