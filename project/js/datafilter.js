
newfilterData = function(_eventHandler){

    this.eventHandler = _eventHandler;


    this.init();

}


newfilterData.prototype.init = function(){

    console.log('filter init')
  }



//Set Filter Variables based on the filter and key
newfilterData.prototype.filterUpdate = function(fltr){

    console.log('************** FILTERS !!!!!!!! *******************')
    console.log(fltr);


    vals = fltr.split('/');

    var filter = vals[0];
    var key = vals[1];


    console.log('gblFilterSet')
    switch (filter) {
        case 'type':
            byType = key;
            break;
        case 'source':
            bySource = key;
            break;
        case 'region':
            byRegion = key;
            break;
        case 'intensity':
            byIntensity = key;
            break;
        case 'country':
            byCntry = $('.cntryChk:checkbox:checked').map(function() {
                return this.value;
            }).get();

            break;
    }

   this.filterData();

}

//Reset All Filter Variables to Null
newfilterData.prototype.gblFilterReset = function(){
    byType = ''
    byRegion = ''
    bySource = ''
    byIntensity = ''
    byCntry = ''

    $('.filter').css('fill-opacity',0);
    $('.filter').css('stroke-opacity',0);

    // Select all countries
    $('.cntryChk').each(function() { //loop through each checkbox
        this.checked = true;  //select all checkboxes with class "checkbox1"
    });

    this.filterData();
}


//Filter the data based on Filter Variables
newfilterData.prototype.filterData = function(){
    console.log('filterData')
    //Check Filters one by one

    filteredData = allData;


    if (byType != ''){

        filteredData = filteredData.filter(function (val, i, array) {
            if( val.TypeOfConflict == byType ) {
                return val;
            }
        });
    }

    if (byRegion != ''){
        filteredData = filteredData.filter(function (val, i, array) {
            if( val.Region == byRegion ) {
                return val;
            }
        });
    }
    if (bySource != ''){
        filteredData = filteredData.filter(function (val, i, array) {
            if( val.Incompatibility == bySource ) {
                return val;
            }
        });
    }

    if (byIntensity != ''){
        filteredData = filteredData.filter(function (val, i, array) {
            if( val.IntensityLevel == byIntensity ) {
                return val;
            }
        });
    }
    if (byCntry!= ''){
        filteredData = filteredData.filter(function (val, index, array) {

            if (byCntry.indexOf(val.Location) >= 0) {
                return val;
            }
        });
    }




     /********************************************************************************************/
    /****************** Call Update Functions and pass Filtered Data Set here ******************/
    /********************************************************************************************/

    console.log('filteredData')
    console.log(filteredData)

    $(that.eventHandler).trigger("filtersChanged");

    //addStats(filteredData, 1)

    //TimelineVis_UpdateVis(filteredData);


}

