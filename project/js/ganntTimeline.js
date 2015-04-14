/**
 * Created by edgonzalez on 4/10/15.
 */

var latestData;
var locationKeys = [];
var yearKeys = [];
var mappedAggData = {}
var url = 'data/UCDPPrioArmedConflictDataset_Reduced2.csv';
var url2 = 'data/date_range.csv';

// ********* SVG Container



var svg_head = d3.select("#xAxisTop").append("svg")
    .attr("id", "d3ChartHead");

var svg = d3.select("#punchcard")
    .append("svg");


function buildChart() {


    var newHeight = locationKeys.length * 30
    var newWidth = yearKeys.length * 10
    console.log('dates');
    console.log(yearKeys.length);
    console.log(yearKeys);
    var w = newWidth,
        h = newHeight + 50,
        bottom_pad = 50,
        left_pad = 150
console.log(w);

 svg_head.attr("width", w)
        .attr("height", 50);


   svg.attr("width", w)
        .attr("height", h);
//svg. attr("viewBox", "0 0 60 55");

    svg_head.selectAll("*").remove();
    svg.selectAll("*").remove();


    var x = d3.scale.ordinal()
        .domain(yearKeys.map(function (d) {
            return d;
        }))
        .rangeRoundBands([0, 10000], .1, 0);

    /****** Y Axis *************/
    var y = d3.scale.ordinal()
        .domain(locationKeys.map(function (d) {
            return d;
        }))
        .rangeRoundBands([0, newHeight], .1, 0);

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");


  /****** Top X Axis *************/
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("top");

    svg_head.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0,50)");

    svg_head.select(".x")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-5px")
        .attr("dy", "-1px")
        .attr("transform", "rotate(45)" );

    /****** Bottom X Axis *************/
    var xAxis2 = d3.svg.axis()
        .scale(x)
        .orient("botttom");

    svg.append("g")
        .attr("class", "x2 axis")
        .attr("transform", "translate(0,"+ newHeight +")");

    svg.select(".x2")
        .call(xAxis2)
      .selectAll("text")
       .style("text-anchor", "end")
        .attr("dx", "-.8em")
      .attr("dy", "-.55em")
       .attr("transform", "rotate(-45)" );


    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + (left_pad) + ", 0)")
        .call(yAxis);

   var circles = svg.selectAll("circle")
        .data(mappedAggData);

    circles.enter()
        .append("line");

    circles.attr("class", "line")
        .attr("x1", function (d) { var dtString = d.start; return x(dtString.substring(0, 7)); })
        .attr("y1", function (d) { return y(d.location) + 15; })
        .attr("x2", function (d) {
            if (d.end === null) {var dtString = "2013-12-01"} else {var dtString = d.end;} return x(dtString.substring(0, 7)); })
        .attr("y2", function (d) { return y(d.location) + 15; })
        .attr("stroke-width", 5)
        .attr("stroke", "black")
        .transition()
        .duration(800)
        .attr("class", function(d){
            var inten = (d.intensity == 1 ? "intensity_1" :"intensity_2");
            var reg = "reg";
            var class2 = "circle " +  inten + ' ' + reg;
            return class2;
        })
        .attr("r", function (d) { return d.intensity * 5; });


    circles.exit().remove();

    circles.append("title")
        .text(function (d, i) {
            return d.location + ': ' + d.start + ' - ' +  d.end; ;
        });



}





function dataWrangler(filter1, filter2, prmpt){

    locationKeys =[];
    yearKeys =[];


    mappedAggData = latestData.map(function (d) {
        return {
            "location": d.Location,
            "start": d.StartDate2,
            "end": d.EpEndDate,
            "intensity": d.CumulativeIntensity
        };
    });





 //   mappedAggData = mappedAggData.sort(function (a, b) {
  //      return d3.ascending(a.region, b.region);
 //   })




// ******** Get the Location Keys *************
    var byLoc = d3.nest()
        .key(function(d) { return d.location; })
        .entries(mappedAggData);


    for (var i = 0, len = byLoc.length; i < len; i++) {
      locationKeys.push(byLoc[i].key)
    }

// ******** Get the Year Keys *************
    var byYr = d3.nest()
        .key(function(d) { return d.year; })
        .entries(mappedAggData);
/*
    for (var i = 0, len = byYr.length; i < len; i++) {
        yearKeys.push(byYr[i].key)
    }
*/

    for (var i = 0, len = dateData.length; i < len; i++) {
        var dtString = dateData[i].date
        yearKeys.push(dtString.substring(0, 7))
    }


    //


console.log(dateData)

    buildChart();
}

/*
d3.csv(url, function(data) {
    latestData = data;
    dataWrangler();
});
*/

d3.csv(url, function(data) {
    latestData = data;
    d3.csv(url2, function(data) {
        dateData = data;
        dataWrangler();
    });
});





