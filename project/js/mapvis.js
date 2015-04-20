MapVis = function(_parentElement, _data, _topologyData, _eventHandler){
    this.parentElement = _parentElement;
    this.data = _data;
    this.topologyData = _topologyData;
    this.eventHandler = _eventHandler;
    this.displayData = [];

    // TODO: define all "constants" here
    this.margin = {top: 0, right: 0, bottom: 0, left: 0};
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
        .translate([-60+this.width / 2, 20+this.height / 2])
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
        .append("circle")
        .attr("cx", function(d) {
            return projection([d.lon, d.lat])[0];
        })
        .attr("cy", function(d) {
            return projection([d.lon, d.lat])[1];
        })
        .attr("r", function(d) {
            if (d.IntensityLevel==1) {return 3;}
            else return 7;
        })
        .on("mouseover", function(d) {   //Add tooltip on mouseover for each circle

            //Get this circle's x/y values, then augment for the tooltip
            var xPosition = d3.select(this).attr("cx");
            var yPosition = d3.select(this).attr("cy");
            var SideA, SideB, Adversaries;
                    
            if (d.SideA2nd === "NULL") {SideA = d.SideA;}
            else {SideA = d.SideA + " and " + d.SideA2nd;}

            if (d.SideB2nd === "NULL") {SideB = d.SideB;}
            else {SideB = d.SideB + " and " + d.SideB2nd;}

            Adversaries =  SideA + "<br/>vs.<br/>" + SideB;

            //Update the tooltip position and value
            d3.select("#tooltip")
                //Show the tooltip above where the mouse triggers the event
                .style("left", (d3.event.pageX) + "px")     
                .style("top", (d3.event.pageY - 90) + "px")
                .select("#conflict-label")  
                .html("<strong>" + d.Location + ", " + d.Year + "</strong>" + "<br/>" + 
                     Adversaries);   

            //Show the tooltip
            d3.select("#tooltip").classed("hidden", false);

         })
        .on("mouseout", function() {
               
            //Hide the tooltip
            d3.select("#tooltip").classed("hidden", true);
                
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

    // legend
    this.svg.append("circle")
          .attr("cx", this.width-100)
          .attr("cy", 20)
          .attr("r", 7);
    this.svg.append("text")
          .attr("x", this.width-91)
          .attr("y", 17)
          .text("War (>1000 deaths/yr)")
          .attr("style","font-size:9px;")
          .style("stroke","#ffffff");
    this.svg.append("circle")
          .attr("cx", this.width-100)
          .attr("cy", 24)
          .attr("r", 3);
    this.svg.append("text")
          .attr("x", this.width-91)
          .attr("y", 26)
          .text("Minor armed conflict")
          .attr("style","font-size:9px;")
          .style("stroke","#ffffff");
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
