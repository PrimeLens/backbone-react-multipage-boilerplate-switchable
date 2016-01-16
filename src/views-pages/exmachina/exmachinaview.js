

var ExmachinaView = Backbone.View.extend({

    el : '#pagecontainer',

    initialize: function() {
        console.log('exmachinaView initialize()');
    },

    render: function() {
        console.log('exmachinaView render()');

        this.$el.html(htmlpartials.exmachina); // the property after the dot is the filename of the html partial
    },

    processRouteChange : function() {
        console.log('exmachinaView processRouteChange()');

    }

});