
/*  
    (1) render an empty page 
    (2) show the loader 
    (3) preload the images  
    (4) hide the loader  
    (5) re-render the page 

 this is a stacked loader ie. it runs off a stack 
 of strings which all must clear before it goes away

*/


rc.madmaxPageComponent = React.createClass({
    getInitialState:function(){
        return _.extend(app.status, {
        })
    },
    preloadArray : [
        SiteConfig.assetsDirectory+'images/madmaxpage/furiosa.jpg',
        SiteConfig.assetsDirectory+'images/madmaxpage/guitarmadmax.jpg',
        SiteConfig.assetsDirectory+'images/madmaxpage/immortanjoe.jpg',
        SiteConfig.assetsDirectory+'images/madmaxpage/nuxvehicle.jpg',
        SiteConfig.assetsDirectory+'images/madmaxpage/openingscene.jpg',
        SiteConfig.assetsDirectory+'images/madmaxpage/prisoner.jpg',
        SiteConfig.assetsDirectory+'images/madmaxpage/witnessme.jpg'       
    ],
    preload : function(){ 
        var self = this;
        // reset the preloader
        BBPreload.reset();
        // loop thru adding every image
        _.each(this.preloadArray, function(item,i){
            BBPreload.add( item );
        });
        // start it up and pass in a callback
        BBPreload.start(function() { 
            // app status flag so we never preload this component again
            var name = self.constructor.displayName;
            app.status.completedPreload[name] = true;
            // trigger a re-render, this only happens once so no need to data bind                  
            self.forceUpdate();
            // message the component with spinning gif
            grandCentral.trigger('loaderEnd', 'pageload');
        });
    },
    stillPreloading : true,    
    componentWillMount: function(){
        var name = this.constructor.displayName;
        if (!app.status.completedPreload[name]){
            // message the component with spinning gif
            grandCentral.trigger('loaderStart', 'pageload');
            this.preload();
        }
    },
    render: function() {
        var name = this.constructor.displayName;
        var completedPreload = app.status.completedPreload[name];
        console.log(this.constructor.displayName+' render()', completedPreload ? '' : ' (renders blank while preloading)');
        var renderHandle;
        if (!completedPreload) {
            renderHandle = <div id="madmaxpage"></div>
        } else {
            renderHandle =             
            <div id="madmaxpage">   
                <p>The Mad Max page gives an example of how the loader component works in conjunction with the BBPreload library. Throttle the network load time in your browser to see it in action. This is the order of what is happening</p>
                <ol>
                    <li>It shows the loaderview which contains a spinning gif</li>
                    <li>Preloads the images with BBPreload</li>
                    <li>The callback fires for BBPreload</li>
                    <li>It hides the loaderview</li>
                    <li>Then renders the page</li>
                </ol>
                <p>
                    This is a stacked loader ie. it runs off a stack
                    of strings which all must clear before it goes away.
                </p>
                <img src={SiteConfig.assetsDirectory+'images/madmaxpage/furiosa.jpg'}/>
                <img src={SiteConfig.assetsDirectory+'images/madmaxpage/guitarmadmax.jpg'}/>
                <img src={SiteConfig.assetsDirectory+'images/madmaxpage/immortanjoe.jpg'}/>
                <img src={SiteConfig.assetsDirectory+'images/madmaxpage/nuxvehicle.jpg'}/>
                <img src={SiteConfig.assetsDirectory+'images/madmaxpage/openingscene.jpg'}/>
                <img src={SiteConfig.assetsDirectory+'images/madmaxpage/prisoner.jpg'}/>
                <img src={SiteConfig.assetsDirectory+'images/madmaxpage/witnessme.jpg'}/>
            </div>    
        }
        return(
            renderHandle
        );

    }
});