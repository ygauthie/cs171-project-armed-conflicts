/**
 * Created by edgonzalez on 4/23/15.
 */






filterCharts = function(data, _eventHandler, update){

    this.eventHandler = _eventHandler;

    this.addStats(data, update);

}






// This Whole Function basically wrangles data for 5 charts, each chart has different groupings, i.e. type, region, source, intensity, country

filterCharts.prototype.addStats= function(data, update){

    //Apply Any Time Filters before processing:

    placeHolder = []
    countByCountry =[]
    countByRegion =[]
    countBytype =[]
    countByIntensity =[]
    countByType =[]
    countBySource =[]





    var trimmed_org  = data.map(function (d) {
       return {
           "id": d["ConflictId"],
           "country": d["Location"],
           "startDate": d["StartDate2"],
           "region": d["Region"],
           "intensity": d["IntensityLevel"],
           "type": d["TypeOfConflict"],
           "source": d["Incompatibility"],
           "year": d["Year"]
       };
   });


  /*
    trimmed =  trimmed_org.filter( function (d) {
         if (d.year >= timeMin && d.Year <= timeMax) {
             return d;
        }});

  */
/*
    trimmed = trimmed_org.filter(function (val, i, array) {
        if( val.country == 'Philippines' ) {
            return val;
        }
    });
*/

   trimmed = trimmed_org
/************************************************/
/************** By Country Count ****************/
/************************************************/
    placeHolder = []
    /* Group by Unique Episode Keys (Country, Id, StartDate2)  ********************/
     var nest = d3.nest()
        .key(function(d) { return d.country; })
        .key(function(d) { return d.id; })
        .key(function(d) { return d.startDate; })
        .entries(trimmed);

    /* Flaten new group ********************/
    for (var i = 0, len = nest.length; i < len; i++) {
        var row = {};

        var key1 = nest[i].key;

        for (var j = 0, len2 = nest[i].values.length; j < len2; j++) {

            var key2 = nest[i].values[j].key;
            for (var k = 0, len3 = nest[i].values[j].values.length; k < len3; k++) {

                var key3 = nest[i].values[j].values[k].key
                row.country = key1;
                row.conflictId = key2;
                row.startDate = key3;
                row.count = 1;
                placeHolder.push(row);
                row = {};
            }
        }
    }

/* Sum by Country ************************************/
    var countByCountry = d3.nest()
        .key(function(d) { return d.country;})
        .rollup(function(d) {
            return d3.sum(d, function(g) {return g.count; });
        }).entries(placeHolder);



/*******************************************************/

/************************************************/
/************** By Region Count ****************/
/************************************************/
    placeHolder =[];
    /* Group by Unique Episode Keys (Country, Id, StartDate2)  ********************/
    var nest = d3.nest()
        .key(function(d) { return d.region; })
        .key(function(d) { return d.country; })
        .key(function(d) { return d.id; })
        .key(function(d) { return d.startDate; })
        .entries(trimmed);

    /* Flaten new group ********************/
    for (var i = 0, len = nest.length; i < len; i++) {
        var row = {};

        var key1 = nest[i].key;

        for (var j = 0, len2 = nest[i].values.length; j < len2; j++) {

            var key2 = nest[i].values[j].key;

            for (var k = 0, len3 = nest[i].values[j].values.length; k < len3; k++) {

                var key3 = nest[i].values[j].values[k].key

                for (var l = 0, len4 = nest[i].values[j].values[k].values.length; l < len4; l++) {

                    var key4 = nest[i].values[j].values[k].values[l].key

                    row.region = key1;
                    row.country=key2;
                    row.conflictId = key3;
                    row.startDate = key4;
                    row.count = 1;
                    placeHolder.push(row);
                    row = {};
                }
            }
        }
    }



    /* Sum by Country ************************************/
    var countByRegion = d3.nest()
        .key(function(d) { return d.region;})
        .rollup(function(d) {
            return d3.sum(d, function(g) {return g.count; });
        }).entries(placeHolder);



    var max = d3.max(countByRegion)



    /************************************************/
    /************** By Type Count ****************/
    /************************************************/




    placeHolder =[];
    /* Group by Unique Episode Keys (Country, Id, StartDate2)  ********************/
    var nest = d3.nest()
        .key(function(d) { return d.type; })
        .key(function(d) { return d.country; })
        .key(function(d) { return d.id; })
        .key(function(d) { return d.startDate; })
        .entries(trimmed);



    /* Flaten new group ********************/
    for (var i = 0, len = nest.length; i < len; i++) {
        var row = {};

        var key1 = nest[i].key;

        for (var j = 0, len2 = nest[i].values.length; j < len2; j++) {

            var key2 = nest[i].values[j].key;

            for (var k = 0, len3 = nest[i].values[j].values.length; k < len3; k++) {

                var key3 = nest[i].values[j].values[k].key

                for (var l = 0, len4 = nest[i].values[j].values[k].values.length; l < len4; l++) {

                    var key4 = nest[i].values[j].values[k].values[l].key

                    row.type = key1;
                    row.country=key2;
                    row.conflictId = key3;
                    row.startDate = key4;
                    row.count = 1;
                    placeHolder.push(row);
                    row = {};
                }
            }
        }
    }




    /* Sum by Country ************************************/
    var countByType = d3.nest()
        .key(function(d) { return d.type;})
        .rollup(function(d) {
            return d3.sum(d, function(g) {return g.count; });
        }).entries(placeHolder);



    /************************************************/
    /************** By Source Count ****************/
    /************************************************/
    placeHolder =[];
    /* Group by Unique Episode Keys (Country, Id, StartDate2)  ********************/
    var nest = d3.nest()
        .key(function(d) { return d.source; })
        .key(function(d) { return d.id; })
        .key(function(d) { return d.startDate; })
        .entries(trimmed);

    /* Flaten new group ********************/
    for (var i = 0, len = nest.length; i < len; i++) {
        var row = {};

        var key1 = nest[i].key;

        for (var j = 0, len2 = nest[i].values.length; j < len2; j++) {

            var key2 = nest[i].values[j].key;
            for (var k = 0, len3 = nest[i].values[j].values.length; k < len3; k++) {

                var key3 = nest[i].values[j].values[k].key
                row.source = key1;
                row.conflictId = key2;
                row.startDate = key3;
                row.count = 1;
                placeHolder.push(row);
                row = {};
            }
        }
    }

    /* Sum by Country ************************************/
    var countBySource = d3.nest()
        .key(function(d) { return d.source;})
        .rollup(function(d) {
            return d3.sum(d, function(g) {return g.count; });
        }).entries(placeHolder);



    /************************************************/
    /************** By Intensity Count ****************/
    /************************************************/
    placeHolder =[];
    /* Group by Unique Episode Keys (Country, Id, StartDate2)  ********************/
    var nest = d3.nest()
        .key(function(d) { return d.intensity; })
        .key(function(d) { return d.id; })
        .key(function(d) { return d.startDate; })
        .entries(trimmed);

    /* Flaten new group ********************/
    for (var i = 0, len = nest.length; i < len; i++) {
        var row = {};

        var key1 = nest[i].key;

        for (var j = 0, len2 = nest[i].values.length; j < len2; j++) {

            var key2 = nest[i].values[j].key;
            for (var k = 0, len3 = nest[i].values[j].values.length; k < len3; k++) {

                var key3 = nest[i].values[j].values[k].key
                row.intensity = key1;
                row.conflictId = key2;
                row.startDate = key3;
                row.count = 1;
                placeHolder.push(row);
                row = {};
            }
        }
    }





    /************************************************/
    /************** By Country ****************/
    /************************************************/
    var countByIntensity = d3.nest()
        .key(function(d) { return d.intensity;})
        .rollup(function(d) {
            return d3.sum(d, function(g) {return g.count; });
        }).entries(placeHolder);




    var test1 = d3.max(countByRegion, function(d) { return d.values; })


    /************************************************/
    /**    Call Function to sets up barCharts      **/
    /************************************************/
   /*
      Parameters  1 = DivContainer for chart
      Parameters  2 = data source for chart
      Parameters  3 = name of the filter
      Parameters  4 = minimum number of columns to account for nulls
    */


    if (update == 1) {

        this.statUpdate(countByRegion, 'region', 5);
        this.statUpdate(countByType, 'type', 4);
        this.statUpdate(countBySource, 'source', 3);
        this.statUpdate(countByIntensity, 'intensity', 2);
        this.selectCountryUpdate(countByCountry);

    } else {
        this.simpleBar('#stats1_left', countByRegion, 'region', 5);
        this.simpleBar('#stats1_right', countByType, 'type', 4);
        this.simpleBar('#stats2_left', countBySource, 'source', 3);
        this.simpleBar('#stats2_right', countByIntensity, 'intensity', 2);
// Call Function to add filter events *Placed here, because it needs to be called only after charts are initilized
        this.addEventStuff();
    }
}



filterCharts.prototype.simpleBar = function (div_container, smpl_data, curfilter, cnt ){


    that = this;

    var key = smpl_data.map(function (d) {
        return d.key;
    })



    var chart,
        width = 80,
        bar_height = 15,
        height = bar_height * key.length;


    var x, y;

    var maxVal = d3.max(smpl_data, function(d) { return d.values; })
    var minVal = d3.min(smpl_data, function(d) { return d.values; })

    x = d3.scale.linear()
        .domain([minVal, maxVal])
        .range([2, width]);

    y = d3.scale.ordinal()
        .domain(smpl_data.map(function (d) {
            return d.key;
        }))
        .rangeRoundBands([0, height], .1, 0);


    var left_width = 95;


    chart = d3.select($(div_container)[0])
        .append('svg')
        .attr('class', 'chart')
        .attr('width', left_width + width)
        .attr('height', height);

    chart.selectAll("rect")
        .data(smpl_data)
        .enter().append("rect")
        .attr("x", left_width)
        .attr("y", function (d, i) {
            return y(d.key);
        })
        .attr("width",function(d) {
            return x(d.values);
        })
        .attr("height", y.rangeBand())
        .attr("fill", function(d) {
            return "#d3d4d5";
        }).attr("stroke", function(d) {
            return "#272b30";
        })
        .attr('key', function(d) {
            return d.key
        })
        .attr('chart', curfilter ).attr('class', function(d) {
            return curfilter +'_labels_' +d.key
        });



    chart.selectAll("text.name")
        .data(smpl_data)
        .enter().append("text")
        .attr("x", 85)
        .attr("y", function (d, i) {
            return y(d.key) + 9;
        })
        .attr("text-anchor", "end")
        .attr('class', 'name')
        .text(function(d,i){
            var label = that.label_lookup(key[i], curfilter )
            return label;
        })
        .attr('key', function(d) {
            return d.key
        })
        .attr('class', function(d) {
            return 'xLabels   ' + curfilter +'_labels_' +d.key
        });

    chart.selectAll(".rectFiltr")
        .data(smpl_data)
        .enter().append("rect")
        .attr("x", 5)
        .attr("y", function (d, i) {
            return y(d.key);

        })
        .attr("width",165)
        .attr("height", y.rangeBand())
        .attr("fill", function(d) {
            return "#d3d4d5";
        })
        .attr('key', function(d) {
            return d.key
        })
        .style("fill", "dodgerblue")
        .style("fill-opacity", 0.0)
        .attr('filter', curfilter )
        .attr('class', 'filter');
    ;
}




filterCharts.prototype.statUpdate= function(dataSet, filter, colCnt){





    if (dataSet.length > 1){
        var maxVal = d3.max(dataSet, function(d) { return d.values; })
        var minVal = d3.min(dataSet, function(d) { return d.values; })
    } else{

        var maxVal = d3.max(dataSet, function(d) { return d.values; })
        var minVal = 0
    }


    var scale = d3.scale.linear()
        .domain([minVal, maxVal])
        .range([2, 75]);

    $( "rect[chart='"+filter+"']").attr("width", 0)

    for (var i = 0, len = dataSet.length; i < len; i++) {

        var width = scale(dataSet[i].values);

       //        console.log(height);
        $( "rect[chart='"+filter+"'][key='"+dataSet[i].key+"']").attr("width", width).attr("x", 90);

    }

//    console.log("************* statUpdate End *********************");

}



filterCharts.prototype.selectCountryUpdate= function(dataSet){
    $('.cntryChk').prop('checked', false);


    for (var i = 0, len = dataSet.length; i < len; i++) {

     $( ".cntryChk[value='"+dataSet[i].key+"']").prop('checked', true);

    }

}





filterCharts.prototype.addEventStuff= function(){

    that = this;

    $('.filter').click(function () {

            var key = $(this).attr('key');
            var fltr = $(this).attr('filter');


        if ($(this).css('fill-opacity') <= 0) {
            $("rect[filter='" + fltr + "']").css('fill-opacity', 0);
            $("rect[filter='" + fltr + "']").css('stroke-opacity', 0);
            $(this).css('fill-opacity', 0.365);
            $(this).css('stroke-opacity', 1);
            //key = $(this).attr('key')
        } else {
            console.log('clear')

            key = '';
            $("rect[filter='" + fltr + "']").css('fill-opacity', 0);
            $("rect[filter='" + fltr + "']").css('stroke-opacity', 0);
            byCntry='';

        }

   //         console.log('event Test   ' + key);
            $(that.eventHandler).trigger("filterUpdate", fltr+'/'+ key, key);


            //gblFilterSet(fltr, key);
              });

    //Country Select Click events
    $('#cntrySelect').click(function () {

        $("#cntryDiv").css("border-bottom","none");

        $("#countryList").slideToggle( function(){

            if ( $(this).css('display') == 'none' ){
                $("#cntryDiv").css("border-bottom","solid 1px #d3d4d5");

                $(that.eventHandler).trigger("filterUpdate", 'country/1', '1');

            }else{ $("#cntryDiv").css("border-bottom","none");}
        });

    })






     $(".filter").mouseenter(function(){
     var filter = $(this).attr('filter');
     var key = $(this).attr('key');

         $("circle["+filter +"='" + key + "']").css('fill','#8d1eff');
         $("."+ filter +"_labels_" + key ).css('fill','#8d1eff');

     });

     $(".filter").mouseleave(function(){
         var filter = $(this).attr('filter');
         var key = $(this).attr('key');
         $("circle["+filter +"='" + key + "']").css('fill','white');
         $("."+ filter +"_labels_" + key ).css('fill','#d3d4d5');


     });

}


filterCharts.prototype.label_lookup= function(key, currFilter){

var x_label;



    if (currFilter == 'region') {

        switch (key) {
            case '1':
                x_label = "Europe";
                break;
            case '2':
                x_label = "MidEast";
                break;
            case '3':
                x_label = "Asia";
                break;
            case '4':
                x_label = "Africa";
                break;
            case '5':
                x_label = "Americas";
                break;
        }
    }

    if (currFilter == 'type') {

        switch (key) {
            case '1':
                x_label = "Extrasystemic";
                break;
            case '2':
                x_label = "Interstate";
                break;
            case '3':
                x_label = "Internal";
                break;
            case '4':
                x_label = "Internationlzd";
                break;
        }
    }

    if (currFilter == 'source') {

        switch (key) {
            case '1':
                x_label = "Territory";
                break;
            case '2':
                x_label = "Government";
                break;
            case '3':
                x_label = "Both";
                break;
        }
    }

    if (currFilter == 'intensity') {

        switch (key) {
            case '1':
                x_label = "Minor conflict";
                break;
            case '2':
                x_label = "War";
                break;
        }
    }

    return x_label;

}







/* *****************  Backup **********************

 filterCharts.prototype.simpleBar = function (div_container, smpl_data, curfilter, cnt ){

 console.log('hello');


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
 .attr('class', function(d) {
 return 'xLabels   ' + curfilter +'_labels_' +d.key
 });


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

 */