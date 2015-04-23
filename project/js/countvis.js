/**
 * Created by Hendrik Strobelt (hendrik.strobelt.com) on 1/28/15.
 */


/*
 *
 * ======================================================
 * We follow the vis template of init - wrangle - update
 * ======================================================
 *
 * */

/**
 * CountVis object for HW3 of CS171
 * @param _parentElement -- the HTML or SVG element (D3 node) to which to attach the vis
 * @param _data -- the data array
 * @param _metaData -- the meta-data / data description object
 * @param _eventHandler -- the Eventhandling Object to emit data to (see Task 4)
 * @constructor
 */
CountVis = function(_parentElement, _data, _eventHandler){
    this.parentElement = _parentElement;
    this.data = _data;
    this.eventHandler = _eventHandler;
    this.displayData = [];

    // TODO: define all "constants" here
    this.margin = {top: 10, right: 10, bottom: 30, left: 40};
    this.width = 358 - this.margin.left - this.margin.right;
    this.height = 200 - this.margin.top - this.margin.bottom;


    this.initVis();
}


/**
 * Method that sets up the SVG and the variables
 */
CountVis.prototype.initVis = function(){

    var that = this; // read about the this

    //TODO: implement here all things that don't change
    //TODO: implement here all things that need an initial status
    // Examples are:
    // - construct SVG layout
    // - create axis
    // -  implement brushing !!
    // --- ONLY FOR BONUS ---  implement zooming

    // TODO: modify this to append an svg element, not modify the current placeholder SVG element
    this.svg = this.parentElement.append("svg")
        .attr("width", this.width + this.margin.left + this.margin.right)
        .attr("height", this.height + this.margin.top + this.margin.bottom);

    var countData  = this.wrangleData();

    var x = d3.scale.linear()
            .domain([1946,2014])
            .range([0, this.width]);

    var y = d3.scale.linear()
            .domain([0, 50])
            .range([this.height, 0]);
    
    var xAxis = d3.svg.axis().scale(x)
                   .orient("bottom")
                   .tickFormat(d3.format(".0f"));
    var yAxis = d3.svg.axis().scale(y)
                    .ticks(4)
                    .orient("left");

    var area = d3.svg.area()
        .interpolate("monotone")
        .x(function(d,i) { return x(i+1946); })
        .y0(this.height)
        .y1(function(d) { return y(d); });



    var context = this.svg.append("g")
        .attr("class", "context")
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    var brush = d3.svg.brush()
        .x(x)
        .on("brush", brushed);

    context.append("path")
      .datum(countData)
      .attr("class", "area")
      .attr("d", area);

    context.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + this.height + ")")
      .call(xAxis);

    context.append("g")
      .attr("class", "y axis")
      .call(yAxis);

    context.append("g")
        .attr("class", "brush").call(brush)
            .selectAll("rect").attr({
            height: this.height
        });

     context.append("g")
        .attr("class", "y axis")
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -35)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Number of conflicts");
        
    // Set default brush value
    brush.extent([1960, 1980]);
    this.svg.select(".brush").call(brush);

    // call the update method
    //this.updateVis();

    function brushed() {
       
      
        console.log(brush.extent());
    //    $(that.eventHandler).trigger("selectionChanged",brush.extent());
    //    var dateFormatter = d3.time.format("%d-%b-%Y");
    //    d3.select("#brushInfo").text(dateFormatter(brush.extent()[0])+" to "+dateFormatter(brush.extent()[1]));
    }
}
 


/**
 * Method to wrangle the data. In this case it takes an options object
  */
CountVis.prototype.wrangleData= function(_filter){

    var that = this;

    // Set filter to a function that accepts all items
    // ONLY if the parameter _filter is NOT null use this parameter
    var filter = function(){return true;}
    if (_filter != null){
        filter = _filter;
    }

    // create an array of values for years 1946 t0 2013
    var years = d3.range(1946,2014);
    var count = d3.range(1946,2014).map(function () {
        return 0;
    });
    that.data.sort(function(a, b) {return d3.ascending(a.ConflictId, b.ConflictId)});
    that.data.forEach(function (d) {
        if (_filter != null){
            if (d.Year >= filter[0] &&  d.Year <= filter[1]) {
                //incomplete code
            }
        }
        else {
            count[(d.Year-1946)]+=1;
        }
    })

    return count;

}


/**
 * the drawing function - should use the D3 selection, enter, exit
 * @param _options -- only needed if different kinds of updates are needed
 */
CountVis.prototype.updateVis = function(){

    // TODO: implement update graphs (D3: update, enter, exit)


}

/**
 * Gets called by event handler and should create new aggregated data
 * aggregation is done by the function "aggregate(filter)". Filter has to
 * be defined here.
 * @param selection
 */
CountVis.prototype.onSelectionChange= function (selectionStart, selectionEnd){

    // TODO: call wrangle function
    console.log("allo");
    // do nothing -- no update when brushing


}


/*
 *
 * ==================================
 * From here on only HELPER functions
 * ==================================
 *
 * */












