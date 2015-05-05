/**
 * Created by edgonzalez on 4/23/15.
 */
function addStats(data, update){
    placeHolder = []
    countByCountry =[]
    countByRegion =[]
    countBytype =[]
    countByIntensity =[]
    countByType =[]
    countBySource =[]

   console.log('update Filters');
    console.log(data);

    data = data.filter(function (d) {
        if (d.Year >= timeMin && d.Year <= timeMax) {
            return d;
        }
    });



   var trimmed_org  = data.map(function (d) {
       return {
           "id": d["ConflictId"],
           "country": d["Location"],
           "startDate": d["StartDate2"],
           "region": d["Region"],
           "intensity": d["IntensityLevel"],
           "type": d["TypeOfConflict"],
           "source": d["Incompatibility"]
       };
   });
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



    /* Sum by Country ************************************/
    var countByIntensity = d3.nest()
        .key(function(d) { return d.intensity;})
        .rollup(function(d) {
            return d3.sum(d, function(g) {return g.count; });
        }).entries(placeHolder);




    var test1 = d3.max(countByRegion, function(d) { return d.values; })



    /* this Sets up barCharts to use as filters

      Parameters  1 = DivContainer for chart
      Parameters  2 = data source for chart
      Parameters  3 = name of the filter
      Parameters  4 = minimum number of columns to account for nulls
    */


    if (update == 1) {

        statUpdate(countByRegion, 'region', 5);
        statUpdate(countByType, 'type', 4);
        statUpdate(countBySource, 'source', 3);
        statUpdate(countByIntensity, 'intensity', 2);
        selectCountryUpdate(countByCountry);

    } else {
        simpleBar('#stats1_left', countByRegion, 'region', 5);
        simpleBar('#stats1_right', countByType, 'type', 4);
        simpleBar('#stats2_left', countBySource, 'source', 3);
        simpleBar('#stats2_right', countByIntensity, 'intensity', 2);
// Call Function to add filter events *Placed here, because it needs to be called only after charts are initilized
        addEventStuff();
    }





}




function statUpdate(dataSet, filter, colCnt){

    console.log(filter);
    //console.log(dataSet);

    if (dataSet.length > 1){
        var maxVal = d3.max(dataSet, function(d) { return d.values; })
        var minVal = d3.min(dataSet, function(d) { return d.values; })
    } else{

        var maxVal = d3.max(dataSet, function(d) { return d.values; })
        var minVal = 0
    }


    var scale = d3.scale.linear()
        .domain([minVal, maxVal])
        .range([1, 35]);



    $( "rect[chart='"+filter+"']").attr("height", 0)

    for (var i = 0, len = dataSet.length; i < len; i++) {

        var height = scale(dataSet[i].values);
        var y = 35 - height;


        $( "rect[chart='"+filter+"'][key='"+dataSet[i].key+"']").attr("height", height).attr("y", y);

    }



}


function selectCountryUpdate(dataSet){
    $('.cntryChk').prop('checked', false);


    for (var i = 0, len = dataSet.length; i < len; i++) {

     $( ".cntryChk[value='"+dataSet[i].key+"']").prop('checked', true);




    }





}