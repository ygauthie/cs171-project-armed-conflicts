/**
 * Created by edgonzalez on 4/10/15.
 */

var latestData;
var locationKeys = [];
var yearKeys = [];
var mappedAggData = {}
var url = 'data/UCDPPrioArmedConflictDataset_geocoded.csv';
var url2 = 'data/date_range.csv';

// ********* SVG Container



var svg_head = d3.select("#xAxisTop").append("svg")
    .attr("id", "d3ChartHead");

var svg = d3.select("#punchcard")
    .append("svg");


function buildChart() {


    var newHeight = locationKeys.length * 30
    var newWidth = yearKeys.length * 29
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
        .rangeRoundBands([150, newWidth], .05);

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
        .append("circle");

    circles.attr("class", "circle")
        .attr("cx", function (d) { return x(d.year) +12; })
        .attr("cy", function (d) { return y(d.location) + 15; })
        .transition()
        .duration(800)
        .attr("class", function(d){
            var inten = (d.intensity == 1 ? "intensity_1" :"intensity_2");
            var reg = "reg_"+ d.region;
            var class2 = "circle " +  inten + ' ' + reg;
            return class2;
        })
        .attr("r", function (d) { return d.intensity * 5; });


    circles.exit().remove();

    circles.append("title")
        .text(function (d, i) {
            return d.location + ': ' + d.year + ' : ' +  d.intensity; ;
        });



}

function updateVis() {
    var that = this;

    // TODO: implement update graphs (D3: update, enter, exit)
    // updates scales



    this.x.domain(this.displayData.map(function(d) { return d.title; }));

    /*
     this.x.domain(["0","1", "2", "3", "4","5","6","7","8","9","10","11","12","13","14","15"])
     .rangePoints([0, this.width]);
     */
    /*
     var test = this.metaData
     this.x.domain(test, function (d) {

     return d[0].priority;
     }).rangePoints([0, this.width]);
     */

    var max = d3.max(this.displayData, function (d) {
        return d.sumCount;
    });


    this.y.domain([max, 5]);


    // updates axis
    this.svg.select(".x.axis")
        .call(this.xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", "-.55em")
        .attr("transform", "rotate(-45)" );


    this.svg.select(".y.axis")
        .call(this.yAxis)


    /****************************/

    var bar = this.svg.selectAll(".bar")
        .data(this.displayData);

    // Append new bar groups, if required
    var bar_enter = bar.enter().append("g");

    // Append a rect and a text only for the Enter set (new g)
    bar_enter.append("rect");
    bar_enter.append("text");

    // Add click interactivity
    bar_enter.on("click", function(d) {
        // $(that.eventHandler).trigger("selectionChanged", d.type);

    })

    // Add attributes (position) to all bars
    bar
        .attr("class", "bar")



    // Remove the extra bars
    bar.exit()
        .remove();

    // Update all inner rects and texts (both update and enter sets)

    bar.selectAll("rect")
        .attr("x", function(d) { return that.x(d.title); })
        .attr("width", this.x.rangeBand())
        .style("fill", function(d,i) {
            return d.color;
        })
        .attr("id", function(d){ return d.priority})
        .transition()
        .attr("title", function(d) { return that.y(that.displayData[d.priority].sumCount) + "  " +  d.tip; })
        .attr("height", function(d) { return  that.y(that.displayData[d.priority].sumCount); })
        .attr("y", function(d) {  return that.height - that.y(that.displayData[d.priority].sumCount); } )
    ;









}





function dataWrangler(filter1, filter2, prmpt){

    locationKeys =[];
    yearKeys =[];


    mappedAggData = latestData.map(function (d) {
        return {
            "location": d.location_key,
            "year": d.Year,
            "intensity": d.IntensityLevel,
            "region": d.Region
        };
    });

    if (prmpt == '1'){
        mappedAggData = mappedAggData.filter(function (val, i, array) {
            if( val.year >= filter1 && val.year <= filter2 ) {
                return val;
            }
        });

    }




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



    for (var i = 0, len = byYr.length; i < len; i++) {
        yearKeys.push(byYr[i].key)
    }

    //




    buildChart();
}


d3.csv(url, function(data) {
    latestData = data;
    dataWrangler();
});








