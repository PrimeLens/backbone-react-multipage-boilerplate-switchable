


// protect against IE console errors
try {
    console.log(' ');
}
catch (e) {
    window.console = {};
    window.console.log = function(txt){};
    window.console.warn = function(txt){};
    window.console.error = function(txt){};
}

try {
// assetsDirectory will be empty locally but when on staging it will reflect the FILES_ROOT + /ipad/
// the following piece of code injects this into every html partial
    if (htmlpartials) {
        _.each(htmlpartials, function( value, key, obj ){
            obj[key] = obj[key].replace(/randomDirectory\/images/g, SiteConfig.assetsDirectory+'images');
        });
    }
}
catch(e){}

var Router = Backbone.Router.extend( routerSetupConfig );
$(document).ready(function() {
    // Added the following line so the line after that does not throw an error when Karma runs the tests without index.html.
    if (!$('#appContainer').length) {
        $('body').append("<div id='appContainer'></div>");
    }
    $('#appContainer').replaceWith( htmlpartials.structure );

    window.app = new Router();
    Backbone.history.start();


    // this will maintain highlight state in the nav
    onRouteEvent();
    app.on('route', onRouteEvent);
    function onRouteEvent(){
        //app.navView.updateNavActive();
    }


});

