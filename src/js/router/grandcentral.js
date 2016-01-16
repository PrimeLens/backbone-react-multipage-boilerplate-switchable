

var grandCentral = _.extend({}, Backbone.Events);


/*
    - trigger all app wide events through grand central
    - will work when communicating from  one view to another

    grandCentral.trigger('myfilmevent');

    grandCentral.on('myfilmevent', function(){
        //
    });





    // to carry data with the event

    grandCentral.trigger('myfilmevent', data);

    grandCentral.on('myfilmevent', function(data){
        //
    });



 */

