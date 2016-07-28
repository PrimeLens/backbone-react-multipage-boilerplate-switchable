
rc.fireflyPageComponent = React.createClass({

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