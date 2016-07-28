rc.walkingPageComponent = React.createClass({

    render:function(){
        console.log(this.constructor.displayName+' render()');

        // lets have some render logic for an if else to switch between two child components
        // inject the correct data from config based on deeplink
        // OR 
        // inject a Call To Action line of copy to prompt the user
        // use an if else condition as per https://facebook.github.io/react/tips/if-else-in-JSX.html

        var key = app.status.currentFragsArray[0];
        var data;
        var panel;
        
        if (key) {
            data = SiteConfig.walking[ key ];
            // errorcheck that the deeplink exists in the config and redirect if its bad
            if (!data) {
                app.navigate('#/walkingdead');
            } else {
                panel = <rc.walkingPanel imagepath={ SiteConfig.assetsDirectory + data.path} />;
            }
        } else {
            panel = <rc.walkingPanelCTA/>;
        }

        return (


<div id="walkingpage">
    <img src= {SiteConfig.assetsDirectory+'images/walkingpage/walkingdead.jpg'}/>
    <p>
        Here we have an example of deeplinks. The page is created from JSON held in a site config
        file 
        <span className="codestyle">/js/config</span>. 
        The javascript that reads the config and
        controls the dom can be found in  
        <span className="codestyle">walkingdead.jsx</span>
    </p>
    <div>
        <a className="linkitem" href="#/walkingdead/rick">Rick Grimes</a>
        <a className="linkitem" href="#/walkingdead/daryl">Daryl Dixon</a>
        <a className="linkitem" href="#/walkingdead/michonne">Michonne</a>
        <a className="linkitem" href="#/walkingdead/carol">Carol Peletier</a>
    </div>
    <div className="panel">{panel}</div>
</div>


        );
    }
});
