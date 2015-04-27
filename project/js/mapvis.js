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

    this.wrangleData();
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

    this.projection = d3.geo.winkel3()
          .scale(172)
          .translate([-60+this.width / 2, 20+this.height / 2])
          .precision(.1);

    this.path = d3.geo.path()
          .projection(this.projection);

    this.g = this.svg.append("g");

    // add legend
    this.svg.append("circle")
          .attr("cx", this.width-110)
          .attr("cy", 16)
          .attr("r", 7);
    this.svg.append("text")
          .attr("x", this.width-101)
          .attr("y", 19)
          .text("War (>1000 deaths/yr)")
          .attr("style","font-size:10px;")
          .style("stroke","#ffffff");
    this.svg.append("circle")
          .attr("cx", this.width-110)
          .attr("cy", 30)
          .attr("r", 3);
    this.svg.append("text")
          .attr("x", this.width-101)
          .attr("y", 33)
          .text("Conflict")
          .attr("style","font-size:10px;")
          .style("stroke","#ffffff"); 

    
    this.updateVis();
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

    var that = this; // read about the this

    var landColor = d3.rgb("#666666");

    var land = this.g.selectAll("path")
        .data(topojson.object(that.topologyData, that.topologyData.objects.countries)
          .geometries);

    var land_enter = land.enter()
        .append("path")
        .attr("d", that.path)
        .attr("fill", landColor);
    
    land.exit().remove();

    var circles = this.g.selectAll("circle")
        .data(that.displayData)

    var circles_enter = circles.enter()
        .append("circle")
        .attr("cx", function(d) {
            return that.projection([d.lon, d.lat])[0];
        })
        .attr("cy", function(d) {
            return that.projection([d.lon, d.lat])[1];
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


    circles.transition().duration(500)
        .attr("r", function(d) {
            if (d.IntensityLevel==1) {return 3;}
            else return 7;
    })

    circles.exit().remove();

    // zoom and pan
    var zoom = d3.behavior.zoom()
        .on("zoom",function() {
            that.g.attr("transform","translate("+ 
                d3.event.translate.join(",")+")scale("+d3.event.scale+")");
            that.g.selectAll("circle")
                .attr("d", that.path.projection(that.projection));
            that.g.selectAll("path")  
                .attr("d", that.path.projection(that.projection)); 
      });

    this.svg.call(zoom)

    

}

/**
 * Gets called by event handler and should create new aggregated data
 * aggregation is done by the function "aggregate(filter)". Filter has to
 * be defined here.
 * @param selection
 */
MapVis.prototype.onSelectionChange= function (selectionStart, selectionEnd){

    var count = 0;
    this.displayData = this.data.filter( function (d) {
      if (d.Year >= selectionStart && d.Year <= selectionEnd) {
        //console.log(d);
        count++;
        return d;
    }});
    console.log("count:"+count);
    this.updateVis();


}

MapVis.prototype.onContinentChange= function (continentNumber){

    var that = this;

      this.projection = d3.geo.winkel3()
          .scale(75)
          .translate([-8+this.width / 2, 20+this.height / 2])
          .precision(.1);
      
      this.updateVis();

}



