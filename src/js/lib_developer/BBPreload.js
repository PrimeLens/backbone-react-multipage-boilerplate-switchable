/*  
    depends on jQuery

    batch preload usage
    
    for example
    var myarr = [
        assetsDirectory + 'images/home_headline_main.png',
        assetsDirectory + 'images/home_headline_week1.png'
    ];
    BBpreload.batchpreload( myarr, function(){
        // all images loaded, move on to more code
    });









*/



var BBPreload = ( function() {

    var imageArray = [];
    function reset() {   imageArray = [];   }
    function add(filename) {   imageArray.push(filename);   }
    function getlist() {    return imageArray;    }
    function start( callback ) {   batchpreload( imageArray, callback );   }


    //-------------

	function batchpreload( imageArray, callback ) {
        var count = imageArray.length;
        if(count === 0) {
            callback();
        }
        var loaded = 0;
        // flipped the order of the event and set attribute src for ie8
        $(imageArray).each(function() {
             $('<img>').load(function() {
                loaded++;
                if (loaded === count) {
                    callback();
                }
            }).attr('src', this);
        });
    }
    


	// table of contents
	return {
        reset : reset,
        add : add,
        getlist : getlist,
        start : start,
        batchpreload : batchpreload
	};



} )();