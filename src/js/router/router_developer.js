







// ROUTER INITIALIZE

routerSetupConfig.initialize = function() {
    console.log('router initialize()');
    this.status.currentPage = this.status.lastPage = this.status.currentRoute = null;


    // Permanent items as react components
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

    // the only page that is set up as Backbone view
    this.exmachinaView = new ExmachinaView();


};




// ROUTER ROUTES

routerSetupConfig.routes =  {

    // home page route uses a react component as a page
    '(?*path)': function(f, q){ this.routeTunnel('react', 'home', rc.homePageComponent, f, q); },

    // exmachina route shows how to use jquery / backbone view from the backbone only boilerplate
    'exmachina(/*path)': function(f, q){ this.routeTunnel('jquery', 'exmachina', this.exmachinaView, f, q); },

    // more page routes that are all react
    'gameofthrones(/*path)': function(f, q){ this.routeTunnel('react', 'gameofthrones', rc.thronesPageComponent, f, q); },
    'trueblood(/*path)': function(f, q){ this.routeTunnel('react', 'trueblood', rc.truebloodPageComponent, f, q); },
    // an explanation. using dexter route for this example you can see key : value pairs
    // where the key is 'dexter(/*path)' and the value is a function
    // in the key 'dexter(/*path)', the appearance of the string dexter is regex applied to the url
    // inside the function we specify the render engine as eith 'react' or 'jquery'
    // we must also pass a string 'dexter through, this ultimately gets stored in
    // app.status.currentpage and is used to find the correct nav item to highlight
    // finally we must also pass the pointer to the react component
    // f argument is fragment,  q argument is query string
    'dexter(/*path)': function(f, q){ this.routeTunnel('react', 'dexter', rc.dexterPageComponent, f, q); },
    'walkingdead(/*path)': function(f, q){ this.routeTunnel('react', 'walkingdead', rc.walkingPageComponent, f, q); },
    'hungergames(/*path)': function(f, q){ this.routeTunnel('react', 'hungergames', rc.hungergamesPageComponent, f, q); },
    'hannibal(/*path)': function(f, q){ this.routeTunnel('react', 'hannibal', rc.hannibalPageComponent, f, q); },
    'breakingbad(/*path)': function(f, q){ this.routeTunnel('react', 'breakingbad', rc.breakingbadPageComponent, f, q); },
    'firefly(/*path)': function(f, q){ this.routeTunnel('react', 'firefly', rc.fireflyPageComponent, f, q); },

    'madmax(/*path)': function(f, q){ this.routeTunnel('react', 'madmax', rc.madmaxPageComponent, f, q); },
    'inception(/*path)': function(f, q){ this.routeTunnel('react', 'inception', rc.inceptionPageComponent, f, q); },


    '*badroute': function(){ this.navigate('#', {trigger: true}); }
    // for more information on routing try reading http://mrbool.com/backbone-js-router/28001

};






// ROUTER pre

routerSetupConfig.prePageChange =  function(){
    // any code that must happen before every page change ... place here

};





//  Because all the initialize()  functions occur very early before app.status has values like currentPage
//  we need a function to fire once during the start up and after app.status has populated

routerSetupConfig.appStatusNowReady =  function(){



};


