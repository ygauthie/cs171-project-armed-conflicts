
CountVis = function(_parentElement, _data, _eventHandler){
    this.parentElement = _parentElement;
    this.data = _data;
    this.eventHandler = _eventHandler;
    this.displayData = [];
    this.countData = [];

    // TODO: define all "constants" here
    this.margin = {top: 20, right: 10, bottom: 20, left: 40};
    this.width = 358 - this.margin.left - this.margin.right;
    this.height = 190 - this.margin.top - this.margin.bottom;


    this.initVis();
}


/**
 * Method that sets up the SVG and the variables
 */
CountVis.prototype.initVis = function(){

    var that = this; // read about the this

    this.svg = this.parentElement.append("svg")
        .attr("width", this.width + this.margin.left + this.margin.right)
        .attr("height", this.height + this.margin.top + this.margin.bottom);            

    this.countData  = this.wrangleData();

    this.x = d3.scale.linear()
            .domain([1946,2014])
            .range([0, this.width]);

    this.y = d3.scale.linear()
            .domain([0, 50])
            .range([this.height, 0]);
    
    this.xAxis = d3.svg.axis().scale(this.x)
                   .orient("bottom")
                   .tickFormat(d3.format(".0f"));
    this.yAxis = d3.svg.axis().scale(this.y)
                    .ticks(4)
                    .orient("left");

    this.area = d3.svg.area()
        .interpolate("monotone")
        .x(function(d,i) { return that.x(i+1946); })
        .y0(this.height)
        .y1(function(d) { return that.y(d); });



    this.context = this.svg.append("g")
        .attr("class", "context")
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    this.brush = d3.svg.brush()
        .x(this.x)
        .on("brush", brushed);

    this.context.append("path")
      .datum(this.countData)
      .attr("class", "area")
      .attr("d", this.area);

    this.context.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + this.height + ")")
      .call(this.xAxis);

    this.context.append("g")
      .attr("class", "y axis")
      .call(this.yAxis);

    this.context.append("g")
        .attr("class", "brush").call(this.brush)
            .selectAll("rect").attr({
            height: this.height
        });

     this.context.append("g")
        .attr("class", "y axis")
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -35)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Number of conflicts");
        
    initBrush();
    // Set default brush value
    function initBrush() {
        that.brush.extent([1960, 1975]);
        that.brush(d3.select(".brush").transition());
        that.brush.event(d3.select(".brush").transition().delay(10));
    }
    // call the update method
    //this.updateVis();

    function brushed() {

        //console.log(brush.extent());

        $(that.eventHandler).trigger("selectionChanged",that.brush.extent());
        d3.select("#brushInfo")
           .text(d3.round(that.brush.extent()[0])+" to "+d3.round(that.brush.extent()[1]));
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

    // Dear JS hipster,
    // you might be able to pass some options as parameter _option
    // But it's not needed to solve the task.
    // var options = _options || {};
       // Add click interactivity

    var that = this;

    this.y.domain([0, d3.max(that.countData.map(function(d) { return d; }))]);

    //this.svg.select(".x.axis")
    //    .call(this.xAxis);

    this.svg.select(".y.axis")
        .transition().duration(1000).ease("cubic-in-out")
        .call(this.yAxis);


    var context = this.svg.selectAll(".area")
                        .data([this.countData]);

    context.enter()
      .append("path")
      .attr("class", "area");
      
    context
      .transition().duration(1000).ease("cubic-in-out")
      .attr("d", this.area);

    context.exit()
      .remove();

}

/**
 * Gets called by event handler and should create new aggregated data
 * aggregation is done by the function "aggregate(filter)". Filter has to
 * be defined here.
 * @param selection
 */
CountVis.prototype.onFilterChange= function (_data){

    this.data = _data;
    this.countData  = this.wrangleData();
    this.updateVis();
}











