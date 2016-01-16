
/**** COMPILED 2015-11-10 ****/

/* public/js/router/rc_header_v1.js */
var rc = {};
/* public/jsx-pages/breakingbad/breakingbad.jsx */

rc.breakingbadPageComponent = React.createClass({
    getInitialState:function(){
        return _.extend(app.status, {
        })
    },
    render:function(){
        console.log(this.constructor.displayName+' render()');

        return (

<div id="breakingbadpage">
    <img src={SiteConfig.assetsDirectory+'images/breakingbadpage/breakingbad.jpg'}/>
    <p> 
        Here we instanciate a shared child component called quizComponent which
        receives its configuration at the time of instanciation.
    </p>
    <p>
        This child component is simple and does not save its state when changing 
        away to another page. To do this the state data should be stored in 
        <span className='codestyle'>app.status</span>
    </p>
    <rc.quizComponent data={SiteConfig.quiz.breakingbad}/>
</div>

        );
    }
});

/* public/jsx-pages/dexter/dexter.jsx */
rc.dexterPageComponent = React.createClass({
    getInitialState:function(){
        return _.extend(app.status, {
        })
    },
    render:function(){
        console.log(this.constructor.displayName+' render()');
        return (

<div id="dexterpage">
    <img src={SiteConfig.assetsDirectory+'images/dexterpage/dexter.jpg'}/>
    <p>
        The Dexter page (as well as the True Blood page) bring in a 
        Parents Advisory child component. Components such as parentsadvisory.jsx
        are stored in <span className='codestyle'>/public/jsx-special</span> along
        with any other component that might be shared between pages.
    </p>
    <rc.parentsadvisory/>
</div>
        );
    }
});

/* public/jsx-pages/firefly/childcomponents/fireflyDescriptions.jsx */

rc.fireflyDescriptions = React.createClass({
    // the components internal model
    // the array that is databound will update in batches so if the events 
    // arrive too fast they will not be implemented.
    // for this reason any data arriving from events is applied to trueArray first
    getInitialState:function(){
        return { databindingArray : [] }
    },
    trueArray : [],
    componentDidMount : function(){
        this.trueArray = []; // set to empty every time we return to this page
        var self= this;
        // recieve incoming items        
        // unbind before binding in case component unmounts/remounts, optionally use componentWillUnmount
        grandCentral.off('to_fireflyDescriptions').on('to_fireflyDescriptions', function(data){
            // add this onto the true model, see main commet at top of file
            self.trueArray.push( data );
            // move trueArray onto the virtual dom and let databinding handle the rest
            self.setState({ 
                databindingArray : self.trueArray
            });
        });      
    },
    handleClick: function(i){
        // send the item as a payload on an event
        grandCentral.trigger('to_fireflyImages', this.trueArray[i]);
        // remove the item from the true model
        this.trueArray.splice(i, 1);
        // // move trueArray onto the virtual dom and let databinding handle the rest
        this.setState({ 
            databindingArray : this.trueArray
        });
    },
    render: function(){
        // loop through the databindingArray preparation for returning the render
        // http://stackoverflow.com/questions/29149169/how-to-loop-and-render-elements-in-react-js-without-an-array-of-objects-to-map
        // and also must have key attribute assigned to prevent getting a warning
        var outputArray = [];
        for (var i = 0; i < this.state.databindingArray.length; i++) {
            outputArray.push(
                // retrieve the key as i and pass to the handleClick function
                // http://stackoverflow.com/questions/20377837/how-to-access-custom-attributes-from-event-object-in-react
                <div key={i} onClick={this.handleClick.bind(null, i)}>
                    {this.state.databindingArray[i].description}
                </div>
            );
        }
        return(
            <div className="container one">
                {outputArray}
            </div>
        );
    }
});

/* public/jsx-pages/firefly/childcomponents/fireflyImages.jsx */
rc.fireflyImages = React.createClass({
    // the components internal model
    // the array that is databound will update in batches so if the events 
    // arrive too fast they will not be implemented.
    // for this reason any data arriving from events is applied to trueArray first
    getInitialState:function(){
        return { databindingArray : [] }
    },
    trueArray : [],
    componentDidMount : function(){
        this.trueArray = []; // set to empty every time we return to this page
        var self= this;
        // recieve incoming items
        // unbind before binding in case component unmounts/remounts, optionally use componentWillUnmount
        grandCentral.off('to_fireflyImages').on('to_fireflyImages', function(data){
            // add this onto the true model, see main commet at top of file
            self.trueArray.push( data );
            // move trueArray onto the virtual dom and let databinding handle the rest
            self.setState({ 
                databindingArray : self.trueArray
            });
        });      
    },
    handleClick: function(i){
        // send the item as a payload on an event
        grandCentral.trigger('to_fireflyDescriptions', this.trueArray[i]);
        // remove the item from the true model
        this.trueArray.splice(i, 1);
        // // move trueArray onto the virtual dom and let databinding handle the rest
        this.setState({ 
            databindingArray : this.trueArray
        });
    },
    render: function(){
        // loop through the databindingArray preparation for returning the render
        // http://stackoverflow.com/questions/29149169/how-to-loop-and-render-elements-in-react-js-without-an-array-of-objects-to-map
        // and also must have key attribute assigned to prevent getting a warning
        var outputArray = [];
        for (var i = 0; i < this.state.databindingArray.length; i++) {
            outputArray.push(
                // retrieve the key as i and pass to the handleClick function
                // http://stackoverflow.com/questions/20377837/how-to-access-custom-attributes-from-event-object-in-react
                <img 
                    key={i} 
                    onClick={this.handleClick.bind(null, i)} 
                    src={this.state.databindingArray[i].imagepath}/>
            );
        }
        return(
            <div className="container two">
                {outputArray}
                <div style={{clear: 'both', height: '1px'}}></div>
            </div>
        );
    }
});

/* public/jsx-pages/firefly/firefly.jsx */

rc.fireflyPageComponent = React.createClass({
    getInitialState:function(){
        return _.extend(app.status, {
        })
    },
    componentDidMount : function(){
        // after the page is rendered, send  3 test pieces of 
        // data into one of the components using events
        // each cchild component will use the same events system to
        // send items to the each other
        grandCentral.trigger('to_fireflyDescriptions', {
            imagepath : SiteConfig.assetsDirectory+'images/fireflypage/firefly-reaver.jpg',
            description : 'Ghoulish Reaver Ships, attacking a village'
        });
        // test piece 2
        grandCentral.trigger('to_fireflyDescriptions', {
            imagepath : SiteConfig.assetsDirectory+'images/fireflypage/firefly-spacestation.jpg',
            description : 'Niska\'s Skyplex Spacestation, orbiting Ezra'
        });
        // test piece 3
        grandCentral.trigger('to_fireflyDescriptions', {
            imagepath : SiteConfig.assetsDirectory+'images/fireflypage/firefly.jpg',
            description : 'Serenity, Firefly class spaceship'
        });        
    },    

    render:function(){
        console.log(this.constructor.displayName+' render()');
        return(
<div id="fireflypage">
    <img className="mainpic" src={SiteConfig.assetsDirectory+'images/fireflypage/firefly-cast.jpg'}/>
    <p>
        This page is an example of event driven architecture where sibling components communicate
        and pass data.
    </p>
    <p>
        Click on an item below and it will move to the other container. An item will either take on text form or
        image form depending upon which container it is in. 
    </p>
    <p>
        Each child component is different and does not save its state when changing 
        away to another page. To do this the state data should be stored in 
        <span className='codestyle'>app.status</span>
    </p>
    <p> 
        When an item is clicked the component takes care of itself by removing the item from its model,
        sending the event to Grand Central with appropriate payload data and finally rerendering according 
        to its models new content.
     </p>
    <p>
        The last thing to note is that the code for these views is not stored in <span className="codestyle">/jsx-special</span>
        I chose to do this because its not instanciated on different pages.  Instead each component is instanciated once and is specific
        to the FireFly page experience.  Therefore it makes sense to store the javascript in <span className="codestyle">/jsx-pages/firefly</span>
    </p>
    <p>
        Note the JSX filenames are ignored at compile time, I could have put all components
        in the one file and it would be the same.
    </p>

    <rc.fireflyDescriptions/>

    <rc.fireflyImages/>        

</div>            
        );
    }

});
/* public/jsx-pages/hannibal/hannibal.jsx */

rc.hannibalPageComponent = React.createClass({
    getInitialState:function(){
        return _.extend(app.status, {
        })
    },
    render:function(){
        console.log(this.constructor.displayName+' render()');

        return (

<div id="hannibalpage">
    <img src={SiteConfig.assetsDirectory+'images/hannibalpage/hannibal.jpg'}/>
    <p> 
        Here we instanciate a shared child component called quizComponent which
        receives its configuration at the time of instanciation.
    </p>
    <p>
        This child component is simple and does not save its state when changing 
        away to another page. To do this the state data should be stored in 
        <span className='codestyle'>app.status</span>
    </p>
    <rc.quizComponent data={SiteConfig.quiz.hannibal}/>
</div>


        );
    }
});

/* public/jsx-pages/home/home.jsx */
rc.homePageComponent = React.createClass({
    getInitialState:function(){
        return _.extend(app.status, {
        })
    },    
    render:function(){
        console.log(this.constructor.displayName+' render()');
        return (


<div id="homepage">
    <img src={SiteConfig.assetsDirectory+'images/homepage/ghostshell.jpg'}/>
    <p>
        This is a basic page. The jsx and css for this page level component is 
        stored in <span className='codestyle'>/public/jsx-pages</span>
    </p>
    <p>
        Note that when I reference the url the first fragment after the # is called
        the page fragment. Subsequent fragments are called 0, 1, 2 etc.<br/>
        <span className='codestyle'>#/pageFragment/fragment0/fragment1/fragment2</span>
        <br/>Below are links and summaries of the other pages in the boilerplate.
    </p>
    <p>
        <a className={'pagetitle'} href="#/exmachina">Ex Machina</a> - 
        here is an example showing how during runtime we can switch back to a jQuery rendered backbone view page.
    </p>
    <p>
        <a className={'pagetitle'} href="#/gameofthrones">The Game of Thrones Page</a> - 
        here is an example showing how css can completely break away from the
        css pattern discussed on the home page. It also shows an extra render panel.
    </p>
    <p>
        <a className={'pagetitle'} href="#/dexter">Dexter and True Blood</a> - 
        here you can see how a child component is shared across multiple pages.
    </p>
    <p>
        <a className={'pagetitle'} href="#/walkingdead">Walking Dead Page</a> - 
        an example showing how to combine deeplinks with
        pulling data from the config. The browsers back button works with the deeplinks.
    </p>
    <p>
        <a className={'pagetitle'} href="#/hungergames">Hunger Games Page</a> - 
        demonstrates how the component can impose its own local Model onto 
        <span className="codestyle">this.state</span>
    </p>        
    <p>
        <a className={'pagetitle'} href="#/hannibal">Hannibal and Breaking Bad</a> - 
        here is an example showing how a child component shared across different
        pages can have different configurations.
    </p>
    <p>
        <a className={'pagetitle'} href="#/firefly">Firefly</a> - 
        this page has two sibling components that communicate to each other
        using event architecture. I've named the event dispatcher grandCentral.
    </p>
    <p>
        <a className={'pagetitle'} href="#/madmax">Mad Max</a> - 
        this page gives an example of how to use the image loader component in conjunction with the BBPreload library.
    </p>
</div>




        );
    }
});
/* public/jsx-pages/hungergames/hungergames.jsx */

rc.hungergamesPageComponent = React.createClass({
    // the components internal model
    getInitialState:function(){
        return _.extend(app.status, {
            districtNumber : 13,
            sheSaid : [
                'Peeta I love you', 
                'Let\'s kill President Snow'
            ]
        })
    },

    // components controllers
    addSaying : function(){
        // use .concat to create a new array and set it to setState 
        this.setState({
            sheSaid : this.state.sheSaid.concat( [this.refs.inpText.getDOMNode().value] )
        });
    },
    removeSaying : function(){
        // use .concat to create a new array and set it to setState 
        this.setState({
            sheSaid : this.state.sheSaid.slice( 0, this.state.sheSaid.length-1)
        });
    },
    updateNumber : function(){
        this.setState({
            districtNumber : this.refs.inpNumber.getDOMNode().value
        });
    },

    // components view
    render:function(){
        console.log(this.constructor.displayName+' render()');

        // loop through the array of strings in preparation for returning the render
        // http://stackoverflow.com/questions/29149169/how-to-loop-and-render-elements-in-react-js-without-an-array-of-objects-to-map
        // and also must have key attribute assigned to prevent getting a warning
        var outputArray = [];
        for (var i = 0; i < this.state.sheSaid.length; i++) {
            outputArray.push(<div key={i}>{this.state.sheSaid[i]}</div>);
        }

        return (

<div id="hungergamespage">
    <p>
        The Hunger Games page demonstrates how the page can impose its own local Model onto 
        <span className="codestyle">this.state</span>
    </p>

    <div>She is from District {this.state.districtNumber}</div>

    She said ...
    <br/>
    {outputArray}
  
    <label>Add a saying </label>
    <input className="hungerinput" type="text" ref="inpText"/>
    <div className="linkitem" onClick={this.addSaying}>Add</div>
    <div className="linkitem" onClick={this.removeSaying}>Remove a saying </div>
    <br/>

    <label>Change her District Number </label>
    <input className="hungerinput" type="number" ref="inpNumber"/>
    <div className="linkitem" onClick={this.updateNumber}>Update</div>

    <img src= {SiteConfig.assetsDirectory+'images/hungergamespage/hungergames.jpg'}/>

</div>


        );
    }
});

/* public/jsx-pages/madmax/madmax.jsx */

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
/* public/jsx-pages/thrones/thrones.jsx */
rc.thronesPageComponent = React.createClass({
    getInitialState:function(){
        return _.extend(app.status, {
        })
    },
    render:function(){
        console.log(this.constructor.displayName+' render()');
        return (


<div className="whatevercssclass">
    <p>
        All the other pages follow specific css pattern. The purpose of this page is
        to demonstrate that this is not locked to this boilerplate. You can 
        set your own.
    </p>
    <img src={SiteConfig.assetsDirectory+'images/thronespage/gamethrones.jpg'}/>
    <p>
        <span className="specialQuote">Valar morghulis</span>
        <br/>translates to "all men must die"
    </p>   
</div>


        );
    }
});

/* public/jsx-pages/trueblood/trueblood.jsx */
rc.truebloodPageComponent = React.createClass({
    getInitialState:function(){
        return _.extend(app.status, {
        })
    },
    render:function(){
        console.log(this.constructor.displayName+' render()');
        return (

<div id="truebloodpage">
    <img src={SiteConfig.assetsDirectory+'images/truebloodpage/trueblood.jpg'}/>
    <p>
        The True Blood page (as well as the Dexter page) bring in a 
        Parents Advisory child component. Components such as parentsadvisory.jsx
        are stored in <span className='codestyle'>/public/jsx-special</span> along
        with any other component that might be shared between pages.
    </p>
    <rc.parentsadvisory/>
</div>
        );
    }
});

/* public/jsx-pages/walkingdead/childcomponents/walkingPanel.jsx */

rc.walkingPanel =  React.createClass({
    getDefaultProps:function(){
        return { imagepath: '' }
    },
    render:function(){
        return (
            <img src={this.props.imagepath}/>
        );
    }
});

/* public/jsx-pages/walkingdead/childcomponents/walkingPanelCTA.jsx */
rc.walkingPanelCTA =  React.createClass({
    render:function(){
        return (
            <p>
            Click a button above to see a character. 
            Watch the URL change. Then use the back 
            button to go back through your sequence.
            </p>            
        );
    }
});


/* public/jsx-pages/walkingdead/walkingdead.jsx */
rc.walkingPageComponent = React.createClass({
    getInitialState:function(){
        return _.extend(app.status, {
        })
    },     

    render:function(){
        console.log(this.constructor.displayName+' render()');

        // lets have some render logic for an if else to switch between two child components
        // inject the correct data from config based on deeplink
        // OR 
        // inject a Call To Action line of copy to prompt the user
        // use an if else condition as per https://facebook.github.io/react/tips/if-else-in-JSX.html

        var key = this.state.currentFragsArray[0];
        var data;
        var panel;
        
        if (key) {
            data = SiteConfig.walking[ key ];
            // errorcheck that the deeplink exists in the config and redirect if its bad
            if (!data) {
                window.location.replace('#/walkingdead');
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

/* public/jsx-special/header/header.jsx */
rc.header = React.createClass({
    render:function(){
        return (

<h2>Backbone Multipage Boilerplate</h2>

        );
    }
});

/* public/jsx-special/loader/loader.jsx */

// USAGE

// grandCentral.trigger('loaderStart', 'pageload');
// grandCentral.trigger('loaderStart', 'loadmypanel');
// grandCentral.trigger('loaderEnd', 'pageload');
// grandCentral.trigger('loaderEnd', 'loadmypanel');

// the loader will go away once the stack is emptied


// DEPENDANCY : 

// jQuery    $.inArray


rc.loader = React.createClass({
    // no need for stack to be bound to data 
    // so it is a property of the component and outside of this.state
    stack : [],  
    getInitialState:function(){
        return {
            show : false
        }
    },
    componentDidMount : function(currentPage){
        var self= this;
        // unbind before binding in case component unmounts/remounts, optionally use componentWillUnmount    
        grandCentral.off('loaderStart').on('loaderStart', function(uniqueString){
            if($.inArray(uniqueString, self.stack)==-1){
                console.log('loaderStart(' + uniqueString + ')');
                self.stack.push(uniqueString);
                self.setState({ show: true });
            }

        });
        // unbind before binding in case component unmounts/remounts        
        grandCentral.off('loaderEnd').on('loaderEnd', function(uniqueString){
            var i = $.inArray(uniqueString, self.stack);
            if(i>-1){
                self.stack.splice(i,1);
                console.log('loaderEnd(' + uniqueString + ')');
            }
            if(self.stack.length==0){
                self.setState({ show: false });
            }
        });        
    },    
    reset:function() {
        this.stack = [];
        this.setState({ show: false });
    },
    render:function(){
        var classes = this.state.show ? 'active' : '';
        return (
<div id="loader" className={classes}>
    <div className="loadingmessage">
        <img className="spinner" src={SiteConfig.assetsDirectory+'images/ui/spinner.gif'}/>
    </div>
</div>            
        );
    }
});

/* public/jsx-special/nav/nav.jsx */
rc.nav = React.createClass({
	getInitialState:function(){
        return {
        	currentPage : ''
        }
    },
	componentDidMount : function(){
		var self= this;
        // unbind before binding in case component unmounts/remounts, optionally use componentWillUnmount	
	    grandCentral.off('pagechange').on('pagechange', function(data){
			self.setState({
				currentPage: data.currentPage
			});
	    });
	},
	getClassNameWithActive : function(arg){
		var className = 'navitem';
		if (arg == this.state.currentPage) {
			className = className + ' active';
		}
		return className;
	},
    render:function(){
        return (
<div>
	<a className={this.getClassNameWithActive('home')} href="#">Home</a>
	<a className={this.getClassNameWithActive('exmachina')} href="#/exmachina">Ex Machina</a>
	<a className={this.getClassNameWithActive('gameofthrones')} href="#/gameofthrones">Game Of Thrones</a>
	<a className={this.getClassNameWithActive('trueblood')} href="#/trueblood">True Blood</a>
	<a className={this.getClassNameWithActive('dexter')} href="#/dexter">Dexter</a>
	<a className={this.getClassNameWithActive('walkingdead')} href="#/walkingdead">Walking Dead</a>
	<a className={this.getClassNameWithActive('hungergames')} href="#/hungergames">Hunger Games</a>
	<a className={this.getClassNameWithActive('hannibal')} href="#/hannibal">Hannibal</a>
	<a className={this.getClassNameWithActive('breakingbad')} href="#/breakingbad">Breaking Bad</a>
	<a className={this.getClassNameWithActive('firefly')} href="#/firefly">Firefly</a>
	<a className={this.getClassNameWithActive('madmax')} href="#/madmax">Mad Max</a>
</div>
        );
    }
});
	
/* public/jsx-special/parentsadvisory/parentsadvisory.jsx */
rc.parentsadvisory = React.createClass({
    render:function(){
        return (

<div className="parentsadvisory">
    <strong>Don't</strong>
    <br/>
    let kids
    <br/>
    watch this
</div>

        );
    }
});

/* public/jsx-special/quiz/childcomponents/quizitem.jsx */
rc.quizItemComponent = React.createClass({
    render:function(){
        return (
<div className="quizitem">
	<input type="checkbox" key={this.props.key}/>
    <span>{this.props.label}</span>
</div>
        );
    }
});

/* public/jsx-special/quiz/quiz.jsx */
rc.quizComponent = React.createClass({
    render:function(){
        // loop through and build up an array which we will include in the render
    	var theOptions = [];
    	_.each(this.props.data.options, function(value, i){
    		theOptions.push(<rc.quizItemComponent key={i} label={value}/>);
    	});

        return (
<div>
	<div className="quizheader">
	    <span className="leftGraphic"></span>
	    <span className="quiztitle">{this.props.data.quiztitle}</span>
	    <span className="rightGraphic"></span>
	</div>
	<div className="options">{theOptions}</div>
	<div className="submitquizbtn">Submit</div>
</div>
        );
    }
});
