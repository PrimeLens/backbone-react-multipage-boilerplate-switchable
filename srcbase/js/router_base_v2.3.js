/* jshint expr: true */


var routerSetupConfig = {};

routerSetupConfig.status = {
    currentPage : '',
    lastPage : '',
    currentRoute : '',
    currentFragString : '',
    currentFragsArray : [],
    currentQueryString : '',
    currentQueryArray : [],
    currentQueryObject : {},
    completedPreload : {}
    // app.status is for app wide vars (this may include data returned from ajax)
    // for page level vars, please store in the view or the component for that page. 
};


routerSetupConfig.stores = {
    // we use app.status when binding to changes in the URL
    // we use app.stores when binding to data that is NOT in the URL
    // for example data may come from the server and be written here by a transform library
    // alert the component by grandCentral event 
    // upond hearing event component does this.setState( app.stores.whatevernameData )
};


// pageHandle arg can be a react component or a backbone view, depends on renderEngine arg
routerSetupConfig.routeTunnel = function(renderEngine, currentPage, pageHandle, f, q){
    var self = this;
    renderEngine = renderEngine.toLowerCase();
    // errorcheck with severe prejudice for renderEngine
    if (['react','jquery'].indexOf(renderEngine) == -1) { alert('App crash: renderEngine not specified'); return; }

    // fix a bug where the querystring ends up in frags, its rare and happens when URL is '#?aaa=555' or '#/?aaa=555'
    if ( currentPage == 'home' && f && !q ) { q = f; f= null; }

    // keep app.status up-to-date !
    var pageChanged = false;
    if ( this.status.currentPage != currentPage ) {
        pageChanged = true;
        this.status.lastPage = this.status.currentPage;
        this.status.currentPage = currentPage;
    }
    this.status.currentRoute = Backbone.history.fragment;
    this.status.currentFragString = f;
    this.status.currentQueryString = q;
    this.status.currentFragsArray =  f ? f.split('/') : [];
    /*  convert query string to Array of objects  */
    this.status.currentQueryArray = (typeof q ==='string') ? q.split('&') : [];
    // filter out any arg that does not contain an '='
    this.status.currentQueryArray = _.filter(this.status.currentQueryArray, function(v){ return v.indexOf('=') > -1; });
    // convert to array of objects for currentQueryArray
    // and create the currentQueryObject
    this.status.currentQueryObject = {};
    _.each(this.status.currentQueryArray, function(v,i){
        if (v.indexOf('=') > -1) {
            v = v.split('=');
            var temp = self.status.currentQueryArray[i] = {};
            temp[  v[0]  ] = v[1];  
            self.status.currentQueryObject[  v[0]  ] = v[1]; 
        }
    });        

    // log routing on the console
    if (pageChanged) { 
        console.log('\n-- new route (new page)'); 
    } else { 
        console.log('\n-- new route (hashchange only)'); 
    }
    console.log('app.status.currentPage= '+this.status.currentPage +
        '\napp.status.lastPage= '+this.status.lastPage +
        '\napp.status.currentRoute= '+this.status.currentRoute +
        '\napp.status.currentFragsArray= '+JSON.stringify(this.status.currentFragsArray) +
        '\napp.status.currentQueryString= '+this.status.currentQueryString
    );


    // make sure app.appStatusNowReady() fires once for the start up of this app
    if (!this.appStatusNowReady.started) {
        this.appStatusNowReady.started = true;
        this.appStatusNowReady();
    }
    


    if (pageChanged) {
        // fire the pre-page change hook
        this.prePageChange();         

        // if a react component is mounted then unmount it 
        if (app.currentReactPage){
            app.currentReactPage = null;
            ReactDOM.unmountComponentAtNode(document.getElementById('pagecontainer'));
        }
        // mount a new react component page or backbone ppage
        switch(renderEngine){
            case 'react' : 
                app.currentReactPage = ReactDOM.render(
                    React.createElement( pageHandle ),
                    document.getElementById('pagecontainer')
                );
                break;
            case 'jquery' :
                pageHandle.render();
                pageHandle.processRouteChange();     
                break;
        }

        // fire the pre-page change hook
        this.postPageChange();   
    }else {
        // page is not changing but route did so fire the hook
        switch(renderEngine){
            case 'react' :     
                // use of force update is the same as calling 
                // app.currentReactPage.setState({status: app.status}); 
                // but it doesn't trigger a warning.
                // this is an acceptable use of force update as the parent 
                // of the component is not react
                app.currentReactPage.forceUpdate();  
                break;
            case 'jquery' :
                pageHandle.processRouteChange();     
                break;
        }
    }


    // fire the post route change hook
    this.postRouteChange();




    // broadcast the url change as events to hook into
    grandCentral.trigger('routechange', this.status);
    if (pageChanged) {
        grandCentral.trigger('pagechange', this.status);
    } else {
        grandCentral.trigger('deeplinkchange', this.status);
    }




};
