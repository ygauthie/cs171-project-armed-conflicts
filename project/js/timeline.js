/*
 * Created by Hendrik Strobelt (hendrik.strobelt.com) on 1/28/15.
 */


/**
 * Created by edgonzalez on 4/16/15.
 */




/*
 *
 * ======================================================
 * We follow the vis template of init - wrangle - update
 * ======================================================
 *
 * */

/**
 * TimelineVis object for CS171 final Project
 * @param _parentElement -- the HTML or SVG element (D3 node) to which to attach the vis
 * @param _data -- the data array
 * @param _metaData -- the meta-data / data description object
 * @param _eventHandler -- the Eventhandling Object to emit data to (see Task 4)
 * @constructor
 */

TimelineVis = function(_parentElement, _data, _eventHandler){
    this.parentElement = _parentElement;
    this.data = _data;
    this.metaData = [];
    this.eventHandler = _eventHandler;
    this.laneData = [];
    this.itemData = [];
    this.dateKeys = [];
    this.laneLength = 0;
    this.timeBegin = '19460101';
    this.timeEnd = '20161231';
    this.parseDate = d3.time.format("%Y%m%d").parse;

    // TODO: define all "constants" here




    this.initVis();
}


/*************************************************************************/
/*************************************************************************/
/* Initialize the Visualization. */
/*************************************************************************/
/*************************************************************************/
TimelineVis.prototype.initVis = function(){

    var that = this; // read about the this
    /*****************************************************/



    /*****************************************************/

    // filter, aggregate, modify data
    this.wrangleData();

    // call the update method
    this.updateVis();
}


/*************************************************************************/
/*************************************************************************/
/* Wrangle the data. */
/*************************************************************************/
/*************************************************************************/

TimelineVis.prototype.wrangleData= function(filtered_Data, filter) {

    if (filter == 1) {

        latestData = filtered_Data;

    }else{

    latestData = this.data;

    }


    // this is for testing only values with a string of 'NULL' are generally ongoing conflicts
    latestData = latestData.filter(function (val, i, array) {
        if( val.EpEndDate != 'NULL' ) {
            return val;
        }
    });


    var byLoc = d3.nest()
        .key(function(d) { return d.Location; })
        .entries(latestData);

    for (var i = 0, len = byLoc.length; i < len; i++) {
        this.laneData.push(byLoc[i].key);


        for (var j = 0, len2 = byLoc[i].values.length; j < len2; j++) {
            var item = {}
            item.lane = i;
            item.id =  byLoc[i].values[j].Location + ':' + byLoc[i].values[j].ConflictId + '(' + byLoc[i].values[j].StartDate2 + ' - ' + byLoc[i].values[j].EpEndDate +')';

            item.start = this.dateFormat(byLoc[i].values[j].StartDate2);

            item.end =  this.dateFormat(byLoc[i].values[j].EpEndDate);

            this.itemData.push(item);

        }
    }
    this.laneLength = this.laneData.length;



    for (var i = 0, len = this.metaData.length; i < len; i++) {
        this.dateKeys.push(this.metaData[i].date);
    }







    //console.log('dateKeys');
    //console.log(this.dateKeys);

}



/*************************************************************************/
/*************************************************************************/
/* Update Vis. */
/*************************************************************************/
/*************************************************************************/
TimelineVis.prototype.updateVis = function(){


console.log('Timeline')

    var that = this; // read about the this



    // var parseDate = d3.time.format("%Y%m%d").parse;
    var m = [20, 15, 15, 150], //top right bottom left
        w = 1130 - m[1] - m[3],
        h = 500 - m[0] - m[2],
        miniHeight = this.laneLength * 12 + 50,
        mainHeight = h - miniHeight - 50;

    //scales
    this.x = d3.time.scale()
        .range([0, w]);
    this.x.domain([ this.parseDate(this.timeBegin),  this.parseDate(this.timeEnd)]);

    var start = this.parseDate(this.timeBegin);
    console.log(start);
    console.log(this.x(start));



    this.x1 = d3.scale.linear()
        .range([0, w]);
    this.y1 = d3.scale.linear()
        .domain([0, this.laneLength])
        .range([0, mainHeight]);
    this.y2 = d3.scale.linear()
        .domain([0, this.laneLength])
        .range([0,  miniHeight]);

    this.chart = d3.select("#timeLn")
        .append("svg")
        .attr("width", w + m[1] + m[3])
        .attr("height", miniHeight + m[0] + m[2])
        .attr("class", "chart");

    this.chart.append("defs").append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("width", w)
        .attr("height", 10);

    this.mini =  this.chart.append("g")
        .attr("transform", "translate(" + 150 + "," + 0 + ")")
        .attr("width", w)
        .attr("height", miniHeight)
        .attr("class", "mini");


    /****** Top X Axis *************/
    this.svg_head = d3.select("#xAxisTop").append("svg")
        .attr("id", "d3ChartHead");
    this.svg_head.attr("width",1150)
        .attr("height", 35);

    this.xAxis = d3.svg.axis()
        .scale( this.x)
        .orient("top");


    this.svg_head.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate("+ m[3] +",35)");

    this.svg_head.select(".x")
        .call( this.xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-5px")
        .attr("dy", "-1px")
        .attr("transform", "rotate(45)" );

    /****** Bottom X Axis *************/
    this.xAxis2 = d3.svg.axis()
        .scale( this.x)
        .orient("botttom");

    this.chart.append("g")
        .attr("class", "x2 axis")
        .attr("transform", "translate("+ m[3] +","+  miniHeight +")");

    this.chart.select(".x2")
        .call( this.xAxis2)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", "-.55em")
        .attr("transform", "rotate(-45)" );



    /***********************************************/


    //mini lanes and texts
    this.mini.append("g").selectAll(".laneLines")
        .data(this.itemData)
        .enter().append("line")
        .attr("x1", m[1])
        .attr("y1", function (d) {
            return  that.y2(d.lane);
        })
        .attr("x2", w)
        .attr("y2", function (d) {
            return  that.y2(d.lane);
        })
       .attr("class", "laneLines");

    this.mini.append("g").selectAll(".laneText")
        .data(this.laneData)
        .enter().append("text")
        .text(function (d) {
            return d;
        })

        .attr("x", -m[1])
        .attr("y", function (d, i) {
            return  that.y2(i + .5);
        })
        .attr("dy", ".5ex")
        .attr("text-anchor", "end")
        .attr("class", function (d, i) {
            var lane = "miniItem" + d.lane
            return "laneText" + " " + "miniItem" + i;
        });

    //mini item rects
    this.mini.append("g").selectAll("miniItems")
        .data(this.itemData)
        .enter().append("rect")
        .attr("class", function (d) {
            var lane = "miniItem" + d.lane
            return "laneRect" + " " + "miniItem" + d.lane;
        })
        .attr("x", function (d) {
            var parseDate = d3.time.format("%Y%m%d").parse;
            return  that.x(d.start);
        })
        .attr("y", function (d) {
            return that.y2(d.lane + .5) - 5;
        })
        .attr("width", function (d) {

            var barWidth =  that.x(d.end) -  that.x(d.start);

            if (barWidth < 0){
                barWidth = Math.abs(barWidth)
            }
            //return barWidth;
            return barWidth;
        })
        .attr("height", 10)
        .append("title")
        .text(function (d, i) {
            return d.id;
        });

    //mini labels
    this.mini.append("g").selectAll(".miniLabels")
        .data(this.itemData)
        .enter().append("text")
        .text(function (d) {
            return d.id;
        })
        .attr("x", function (d) {

            return  that.x(d.start);
        })
        .attr("y", function (d) {
            return  that.y2(d.lane + .5);
        })
        .attr("dy", ".5ex")
        .attr("class","miniLabels")
        .style("display","none");


    //brush
    this.brush = d3.svg.brush()
        .x(this.x)
        .on("brush", function(){
            // Trigger selectionChanged event. You'd need to account for filtering by time AND type

            var vals = that.brush.extent()

            var start = vals[0];
            var end = vals[1];

            // var visItems = this.itemData.filter(function(d) {return d.start < maxExtent && d.end > minExtent;});
            $(that.eventHandler).trigger("selectionChanged", [start, end]);
            //$(that.eventHandler).trigger("selectionChanged", vals);
        });

    this.mini.append("g")
        .attr("class", "x brush")
        .call(this.brush)
        .selectAll("rect")
        .attr("y", 1)
        .attr("height", miniHeight - 1);



}




TimelineVis.prototype.filtersChanged= function (dataSet){
    var dataset = dataSet;

}




/**
 * Gets called by event handler and should create new aggregated data
 * aggregation is done by the function "aggregate(filter)". Filter has to
 * be defined here.
 * @param selection
 */
TimelineVis.prototype.onSelectionChange= function (selectionStart, selectionEnd, dataSet){

    console.log('***************************** HELLO **************************************')

    var start = Math.floor(selectionStart)
     var end =  Math.floor(selectionEnd)

    console.log('Floor This')
    console.log(Math.floor(selectionStart) + ' - ' + Math.floor(selectionEnd));

var mmdd = '0101'

   // this.timeBegin =  start.toString() + mmdd;
   // this.timeEnd =  start.toString() + mmdd;
   // console.log(this.timeBegin);

  // var myScaled =  this.x(this.timeBegin)

  //  console.log(myScaled);




}


/*************************************************************************/
/*************************************************************************/
// ==================================
// From here on only HELPER functions
// ==================================
/*************************************************************************/
/*************************************************************************/

TimelineVis.prototype.display = function() {
    var rects, labels,
        minExtent = brush.extent()[0],
        maxExtent = brush.extent()[1],
        visItems = this.itemData.filter(function(d) {return d.start < maxExtent && d.end > minExtent;});


    mini.select(".brush")
        .call(brush.extent([minExtent, maxExtent]));

    x1.domain([minExtent, maxExtent]);
}

TimelineVis.prototype.dateFormat = function(origDate){
    var isoDate = '';
    var parseDate = d3.time.format("%Y%m%d").parse;
// Manual conversion of date format m/d/yyyy to iso format: yyyy-mm-dd

    if (origDate != 'NULL') {
        var res = origDate.split("/");
        var yyyy = res[2];
        var dd = res[1].length == 1 ? '0' + res[1] : res[1];
        var mm = res[0].length == 1 ? '0' + res[0] : res[0];
        var isoDate = yyyy + mm + dd;
    } else{
        var isoDate = '20150506';
    }



    return parseDate(isoDate);
}

TimelineVis_UpdateVis = function(dataset){


}