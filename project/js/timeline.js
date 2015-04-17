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

TimelineVis = function(_parentElement, _data, dateData, _eventHandler){
    this.parentElement = _parentElement;
    this.data = _data;
    this.metaData = dateData;
    this.eventHandler = _eventHandler;
    this.laneData = [];
    this.itemData = [];
    this.dateKeys = [];
    this.laneLength = 0;
    this.timeBegin = 19460101;
    this.timeEnd = 20161231;

    // TODO: define all "constants" here


    console.log('TimelineVis')
    console.log(dateData);

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

    console.log('initVis');

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

TimelineVis.prototype.wrangleData= function(){

    console.log('wrangleData');

    latestData = this.data;

    var byLoc = d3.nest()
        .key(function(d) { return d.Location; })
        .entries(latestData);

    for (var i = 0, len = byLoc.length; i < len; i++) {
        this.laneData.push(byLoc[i].key);

        for (var j = 0, len2 = byLoc[i].values.length; j < len2; j++) {
            var item = {}
            item.lane = i;
            item.id =  byLoc[i].values[j].Location + ':' + byLoc[i].values[j].ConflictId;
            item.start = parseInt(this.dateFormat(byLoc[i].values[j].StartDate2));
            item.end =  parseInt(this.dateFormat(byLoc[i].values[j].EpEndDate));

            this.itemData.push(item);

        }
    }
    this.laneLength = this.laneData.length;



    for (var i = 0, len = this.metaData.length; i < len; i++) {
         this.dateKeys.push(this.metaData[i].date);
        }

    console.log('dateKeys');
    console.log(this.dateKeys);

}



/*************************************************************************/
/*************************************************************************/
/* Update Vis. */
/*************************************************************************/
/*************************************************************************/
TimelineVis.prototype.updateVis = function(){

    var that = this; // read about the this

    console.log('updateVis');


    var m = [20, 15, 15, 120], //top right bottom left
        w = 960 - m[1] - m[3],
        h = 500 - m[0] - m[2],
        miniHeight = this.laneLength * 12 + 50,
        mainHeight = h - miniHeight - 50;
    console.log(this.laneLength);


    //scales
    x = d3.scale.linear()
        .domain([this.timeBegin, this.timeEnd])
        .range([0, w]);
    x1 = d3.scale.linear()
        .range([0, w]);
    y1 = d3.scale.linear()
        .domain([0, this.laneLength])
        .range([0, mainHeight]);
    y2 = d3.scale.linear()
        .domain([0, this.laneLength])
        .range([0,  miniHeight]);

    chart = d3.select("#right-2")
        .append("svg")
        .attr("width", w + m[1] + m[3])
        .attr("height", miniHeight + m[0] + m[2])
        .attr("class", "chart");

    chart.append("defs").append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("width", w)
        .attr("height", 10);
    /*
     main = chart.append("g")
     .attr("transform", "translate(" + m[3] + "," + m[0] + ")")
     .attr("width", w)
     .attr("height", mainHeight)
     .attr("class", "main");
     */
    mini = chart.append("g")
        .attr("transform", "translate(" + 120 + "," + 0 + ")")
        .attr("width", w)
        .attr("height", miniHeight)
        .attr("class", "mini");

    //main lanes and texts
    /*
     main.append("g").selectAll(".laneLines")
     .data(items)
     .enter().append("line")
     .attr("x1", m[1])
     .attr("y1", function (d) {
     return y1(d.lane);
     })
     .attr("x2", w)
     .attr("y2", function (d) {
     return y1(d.lane);
     })
     .attr("stroke", "lightgray")

     main.append("g").selectAll(".laneText")
     .data(lanes)
     .enter().append("text")
     .text(function (d) {
     return d;
     })
     .attr("x", -m[1])
     .attr("y", function (d, i) {
     return y1(i + .5);
     })
     .attr("dy", ".5ex")
     .attr("text-anchor", "end")
     .attr("class", "laneText");
     */
    //mini lanes and texts
    mini.append("g").selectAll(".laneLines")
        .data(this.itemData)
        .enter().append("line")
        .attr("x1", m[1])
        .attr("y1", function (d) {
            return y2(d.lane);
        })
        .attr("x2", w)
        .attr("y2", function (d) {
            return y2(d.lane);
        })
        .attr("stroke", "lightgray");

    mini.append("g").selectAll(".laneText")
        .data(this.laneData)
        .enter().append("text")
        .text(function (d) {
            return d;
        })
        .attr("x", -m[1])
        .attr("y", function (d, i) {
            return y2(i + .5);
        })
        .attr("dy", ".5ex")
        .attr("text-anchor", "end")
        .attr("class", "laneText");
    /*
     itemRects = main.append("g")
     .attr("clip-path", "url(#clip)");
     */
    //mini item rects
    mini.append("g").selectAll("miniItems")
        .data(this.itemData)
        .enter().append("rect")
        .attr("class", function (d) {
            return "miniItem" + d.lane;
        })
        .attr("x", function (d) {
            return x(d.start);
        })
        .attr("y", function (d) {
            return y2(d.lane + .5) - 5;
        })
        .attr("width", function (d) {

            var barWidth = x(d.end) - x(d.start);

            if (barWidth < 0){
             barWidth = Math.abs(barWidth)
            }
            return barWidth;



        })
        .attr("height", 10);

    //mini labels
    mini.append("g").selectAll(".miniLabels")
        .data(this.itemData)
        .enter().append("text")
        .text(function (d) {
            return d.id;
        })
        .attr("x", function (d) {
            return x(d.start);
        })
        .attr("y", function (d) {
            return y2(d.lane + .5);
        })
        .attr("dy", ".5ex")
        .attr("class","miniLabels");


    //brush
    this.brush = d3.svg.brush()
        .x(x)
        .on("brush", function(){
            // Trigger selectionChanged event. You'd need to account for filtering by time AND type

            var vals = that.brush.extent()

            var start = parseInt(vals[0]);
            var end = parseInt(vals[1]);
           // var visItems = this.itemData.filter(function(d) {return d.start < maxExtent && d.end > minExtent;});
            $(that.eventHandler).trigger("selectionChanged", [start, end]);
            //$(that.eventHandler).trigger("selectionChanged", vals);
        });

    mini.append("g")
        .attr("class", "x brush")
        .call(that.brush)
        .selectAll("rect")
        .attr("y", 1)
        .attr("height", miniHeight - 1);



}

/**
 * Gets called by event handler and should create new aggregated data
 * aggregation is done by the function "aggregate(filter)". Filter has to
 * be defined here.
 * @param selection
 */
TimelineVis.prototype.onSelectionChange= function (selectionStart, selectionEnd){

    // TODO: call wrangle function

    // do nothing -- no update when brushing

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
    console.log('display');
    console.log(minExtent)
    console.log(maxExtent)
    console.log(visItems)


    mini.select(".brush")
        .call(brush.extent([minExtent, maxExtent]));

    x1.domain([minExtent, maxExtent]);
}

TimelineVis.prototype.dateFormat = function(origDate){
    var isoDate = '';
// Manual conversion of date format m/d/yyyy to iso format: yyyy-mm-dd

    if (origDate != 'NULL') {
        var res = origDate.split("/");
        var yyyy = res[2];
        var dd = res[1].length == 1 ? '0' + res[1] : res[1];
        var mm = res[0].length == 1 ? '0' + res[0] : res[0];
        var isoDate = yyyy + mm + dd;
    } else{
        var isoDate = '2015-05-06';
    }

    return isoDate;
}