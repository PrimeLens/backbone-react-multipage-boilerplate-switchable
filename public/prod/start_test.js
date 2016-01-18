// appstarter_v1.js
try {
    console.log(' ');
}
catch (e) {
    window.console = {};
    window.console.log = function(txt){};
    window.console.warn = function(txt){};
    window.console.error = function(txt){}
}
try {
    if (htmlpartials) {
        _.each(htmlpartials, function( value, key, obj ){
            obj[key] = obj[key].replace(/randomDirectory\/images/g, SiteConfig.assetsDirectory+'images');
        });
    }
}
catch(e){}
var Router = Backbone.Router.extend( routerSetupConfig );
$(document).ready(function() {
    $('#appContainer').replaceWith( htmlpartials.structure );
    window.app = new Router;
    Backbone.history.start();
    onRouteEvent();
    app.on('route', onRouteEvent);
    function onRouteEvent(){
    }
});
// grandcentral.js
var grandCentral = _.extend({}, Backbone.Events);
// rc_header_v1.js
var rc = {};
// router_base_v2.2.js
var routerSetupConfig = {};
routerSetupConfig.status = {
    currentPage : '',
    lastPage : '',
    currentRoute : '',
    currentFragsArray : [],
    currentQueryString : '',
    currentQueryStringArray : [],
    completedPreload : {}
},
routerSetupConfig.routeTunnel = function(renderEngine, currentPage, pageHandle, f, q){
    var self = this;
    renderEngine = renderEngine.toLowerCase();
    if (['react','jquery'].indexOf(renderEngine) == -1) { alert('App crash: renderEngine not specified'); return; }
    if ( currentPage == 'home' && f && !q ) { q = f; f= null; }
    var pageChanged = false;
    if ( this.status.currentPage != currentPage ) {
        pageChanged = true;
        this.status.lastPage = this.status.currentPage;
        this.status.currentPage = currentPage;
    }
    this.status.currentRoute = Backbone.history.fragment;
    this.status.currentFragsArray =  f ? f.split('/') : [];
    this.status.currentQueryString = q;
    this.status.currentQueryStringArray = (typeof q ==='string') ? q.split('&') : [];
    this.status.currentQueryStringArray = _.filter(this.status.currentQueryStringArray, function(v){ return v.indexOf('=') > -1; });
    _.each(this.status.currentQueryStringArray, function(v,i){
        if (v.indexOf('=') > -1) {
            self.status.currentQueryStringArray[i] = JSON.parse('{"' + v.replace('=', '":"') + '"}');
        }
    });        
    if (pageChanged) { 
        console.log('\n-- new route (new page)'); 
    } else { 
        console.log('\n-- new route (hashchange only)'); 
    }
    console.log('app.status.currentPage='+this.status.currentPage +
        '\napp.status.lastPage='+this.status.lastPage +
        '\napp.status.currentRoute='+this.status.currentRoute +
        '\napp.status.currentFragsArray='+JSON.stringify(this.status.currentFragsArray) +
        '\napp.status.currentQueryString='+this.status.currentQueryString
    );
    if (!this.appStatusNowReady.started) {
        this.appStatusNowReady.started = true;
        this.appStatusNowReady();
    }
        if (pageChanged) {
        this.prePageChange();         
        if (app.currentReactPage){
            app.currentReactPage = null;
            React.unmountComponentAtNode(document.getElementById('pagecontainer'));
        }
        switch(renderEngine){
            case 'react' : 
                app.currentReactPage = React.render(
                    React.createElement( pageHandle ),
                    document.getElementById('pagecontainer')
                );
                break;
            case 'jquery' :
                pageHandle.render();
                pageHandle.processRouteChange();     
                break;
        }
    }else {
        switch(renderEngine){
            case 'react' :     
                app.currentReactPage.forceUpdate();  
                break;
            case 'jquery' :
                pageHandle.processRouteChange();     
                break;
        }
    }
    grandCentral.trigger('routechange', this.status);
    if (pageChanged) {
        grandCentral.trigger('pagechange', this.status);
    } else {
        grandCentral.trigger('deeplinkchange', this.status);
    }
}
// router_developer.js
routerSetupConfig.initialize = function() {
    console.log('router initialize()');
    this.status.currentPage = this.status.lastPage = this.status.currentRoute = null;
    React.render(
        React.createElement( rc.header ),
        document.getElementById('headercontainer')
    ); 
    React.render(
        React.createElement( rc.nav ),
        document.getElementById('navcontainer')
    );    
    React.render(
        React.createElement( rc.loader ),
        document.getElementById('loadercontainer')
    );   
    this.exmachinaView = new ExmachinaView();
};
routerSetupConfig.routes =  {
    '(?*path)': function(f, q){ this.routeTunnel('react', 'home', rc.homePageComponent, f, q) },
    'exmachina(/*path)': function(f, q){ this.routeTunnel('jquery', 'exmachina', this.exmachinaView, f, q) },
    'gameofthrones(/*path)': function(f, q){ this.routeTunnel('react', 'gameofthrones', rc.thronesPageComponent, f, q) },
    'trueblood(/*path)': function(f, q){ this.routeTunnel('react', 'trueblood', rc.truebloodPageComponent, f, q) },
    'dexter(/*path)': function(f, q){ this.routeTunnel('react', 'dexter', rc.dexterPageComponent, f, q) },
    'walkingdead(/*path)': function(f, q){ this.routeTunnel('react', 'walkingdead', rc.walkingPageComponent, f, q) },
    'hungergames(/*path)': function(f, q){ this.routeTunnel('react', 'hungergames', rc.hungergamesPageComponent, f, q) },
    'hannibal(/*path)': function(f, q){ this.routeTunnel('react', 'hannibal', rc.hannibalPageComponent, f, q) },
    'breakingbad(/*path)': function(f, q){ this.routeTunnel('react', 'breakingbad', rc.breakingbadPageComponent, f, q) },
    'firefly(/*path)': function(f, q){ this.routeTunnel('react', 'firefly', rc.fireflyPageComponent, f, q) },
    'madmax(/*path)': function(f, q){ this.routeTunnel('react', 'madmax', rc.madmaxPageComponent, f, q) },
    '*badroute': function(){ this.navigate('#', {trigger: true}); }
};
routerSetupConfig.prePageChange =  function(){
};
routerSetupConfig.appStatusNowReady =  function(){
};
