/**
 * Created by edgonzalez on 4/23/15.
 */

function addbarChart( container, data){

    var dataset = [ 5, 10, 13, 19, 21];
    var type = [ 5, 10, 13];


    container = d3.select('#left-1')

    var bar1 = container.append('div')
        .attr('class','bar1');
  w = 200;
  h = 40;
  barPadding = 1


    svg = bar1.append("svg")
        .attr("width", w)
        .attr("height", h);

    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
            console.log(w);
            console.log(dataset.length);
            return i * (w / dataset.length);
        })
        .attr("y", function(d) {
            return h - (d * 4);
        })
        .attr("width", w / dataset.length - barPadding)
        .attr("height", function(d) {
            return d * 4;
        })
        .attr("fill", function(d) {
            return "rgb(0, 0, " + (d * 10) + ")";
        });

    svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .text(function(d) {
            return d;
        })
        .attr("text-anchor", "middle")
        .attr("x", function(d, i) {
            return i * (w / dataset.length) + (w / dataset.length - barPadding) / 2;
        })
        .attr("y", function(d) {
            return h - (d * 4) + 14;
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "white");

}