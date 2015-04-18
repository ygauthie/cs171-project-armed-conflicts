MapVis = function(_parentElement, _data, _topologyData, _eventHandler){
    this.parentElement = _parentElement;
    this.data = _data;
    this.topologyData = _topologyData;
    this.eventHandler = _eventHandler;
    this.displayData = [];

    // TODO: define all "constants" here
    this.margin = {top: 10, right: 10, bottom: 30, left: 90};
    this.width = 748 - this.margin.left - this.margin.right;
    this.height = 400 - this.margin.top - this.margin.bottom;


    this.initVis();
}


/**
 * Method that sets up the SVG and the variables
 */
MapVis.prototype.initVis = function(){

    var that = this; // read about the this


    this.svg = this.parentElement.append("svg")
        .attr("width", this.width + this.margin.left + this.margin.right)
        .attr("height", this.height + this.margin.top + this.margin.bottom);

    var landColor = d3.rgb("#666666");

    var projection = d3.geo.winkel3()
        .scale(172)
        .translate([this.width / 2, 30+this.height / 2])
        .precision(.1);

    var path = d3.geo.path()
        .projection(projection);

    var g = this.svg.append("g");


    g.selectAll("path")
        .data(topojson.object(this.topologyData, this.topologyData.objects.countries)
          .geometries)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("fill", landColor);

    g.selectAll("circle")
        .data(this.data)
        .enter()
        .append("a")
          .attr("xlink:href", function(d) {
            return "https://www.google.com/search?q="+d.city;}
          )
        .append("circle")
        .attr("cx", function(d) {
            return projection([d.lon, d.lat])[0];
        })
        .attr("cy", function(d) {
            return projection([d.lon, d.lat])[1];
        })
        .attr("r", function(d) {
            if (d.IntensityLevel==1) {return 2;}
            else return 7;
        });


    // zoom and pan
    var zoom = d3.behavior.zoom()
        .on("zoom",function() {
            g.attr("transform","translate("+ 
                d3.event.translate.join(",")+")scale("+d3.event.scale+")");
            g.selectAll("circle")
                .attr("d", path.projection(projection));
            g.selectAll("path")  
                .attr("d", path.projection(projection)); 
      });

    this.svg.call(zoom)
}
 


/**
 * Method to wrangle the data. In this case it takes an options object
  */
MapVis.prototype.wrangleData= function(){

    // displayData should hold the data which is visualized
    // pretty simple in this case -- no modifications needed
    this.displayData = this.data;

}



/**
 * the drawing function - should use the D3 selection, enter, exit
 * @param _options -- only needed if different kinds of updates are needed
 */
MapVis.prototype.updateVis = function(){

    // TODO: implement update graphs (D3: update, enter, exit)
    

}

/**
 * Gets called by event handler and should create new aggregated data
 * aggregation is done by the function "aggregate(filter)". Filter has to
 * be defined here.
 * @param selection
 */
MapVis.prototype.onSelectionChange= function (selectionStart, selectionEnd){

    // TODO: call wrangle function
    console.log("allo");
    // do nothing -- no update when brushing


}
