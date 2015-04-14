/**
 * Created by edgonzalez on 4/14/15.
 */
var map = new L.Map('map', { center: [21.943046, -24.082031], zoom: 2 });
map.addLayer(L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png'));

map._initPathRoot();
map.on("viewreset", drawCircles);
var d3Layer = d3.select("#map").select("svg").append("g");
var map_url = "data/UCDPPrioArmedConflictDataset_geocoded.csv";
var map_latestData;
var map_filteredData;
selectedYear = '2013';




function getData() {
    d3.csv(map_url, function(data) {
        map_latestData = data;
        map_dataWrangler();
    });
}



function map_dataWrangler(){

    console.log();




    map_filteredData = map_latestData.filter(function (val, index, array) {
        return val.lat != "" ;
    });
    console.log(map_filteredData);
    drawCircles();


}






function drawCircles() {






    var circles = d3Layer.selectAll("circle").data(map_filteredData);

    circles.enter().append("circle");

    circles
        .attr("cx", function(row) { return getXY(row).x; })
        .attr("cy", function(row) { return getXY(row).y; })
        .attr("stroke", "#2c3e50" )
        .attr("r", function(d){return 5 })
        .attr("class", function(d){
            var inten = (d.CumulativeIntensity == 1 ? "intensity_1" :"intensity_2");
            var reg = "reg_"+ d.Region;
            var class2 = "circle " +  inten + ' ' + reg;
            return class2;
        });
    circles.exit().remove();


    circles.append("title")
        .text(function (d, i) {
            return d.Location + ': conflict ID = ' + d.ConflictId + ', Duration = ' + d.StartDate2 + ' - ' + d.EpEndDate;
        });




}

function getXY(d) {

    return map.latLngToLayerPoint([d.lat, d.lon]);
}

