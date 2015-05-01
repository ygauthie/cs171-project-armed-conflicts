/**
 * Created by edgonzalez on 4/26/15.
 */

function simpleBar(div_container, smpl_data, curfilter, cnt ){

//Sample BarChart placeholder

    var w

    if (smpl_data.length < 1) {
        smpl_data = [];
        for (var i = 0; i < cnt; i++) {
            var newNumber = Math.random() * 30;
            smpl_data.push(newNumber);
        }
        w = cnt * 20


    }  else {

        var cnt = smpl_data.length * 20;

        if (cnt > 100){
            w = 100
        } else {
            w = cnt
        }


    }

//var max =  d3.max(smpl_data[value])

    var h=35;
    var barPadding = 1;

    var maxVal = d3.max(smpl_data, function(d) { return d.values; })
    var minVal = d3.min(smpl_data, function(d) { return d.values; })


    var scale = d3.scale.linear()
        .domain([minVal, maxVal])
        .range([1, 35]);




    bar_svg = d3.select(div_container).append('svg')
        .attr('width', '110')
        .attr('height', h + 15);

    bar_svg.selectAll("rect")
        .data(smpl_data)
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
            return i * (w / smpl_data.length);
        })
        .attr("y", function(d) {
            return h - scale(d.values);
        })
        .attr("width", w / smpl_data.length - barPadding)
        .attr("height", function(d) {
            return scale(d.values);
        })
        .attr("fill", function(d) {
            return "#d3d4d5";
        })
        .attr('key', function(d) {
            return d.key
        })
        .attr('chart', curfilter );


    bar_svg.selectAll("text")
        .data(smpl_data)
        .enter()
        .append("text")
        .text(function(d, i) {
            return d.key;
        })
        .attr("x", function(d, i) {
            return i * (w / smpl_data.length) + 9;
        })
        .attr("y", function(d) {
            return h + 15;
        })
        .attr("text-anchor", "middle")
        .attr('key', function(d) {
            return d.key
        })
        .attr('class', 'xLabels');


    bar_svg.selectAll(".rectFiltr")
        .data(smpl_data)
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
            return i * (w / smpl_data.length);
        })
        .attr("y", 0)
        .attr("width", w / smpl_data.length - barPadding)
        .attr("height", h + 15)
        .attr('key', function(d) {
            return d.key
        })
        .style("stroke", "pink")
        .style("stroke-opacity",0.0)
        .style("fill", "dodgerblue")
        .style("fill-opacity", 0.0)
        .attr('filter', curfilter )
        .attr('class', 'filter');


}
