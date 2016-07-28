rc.jessicajonesPageComponent = React.createClass({
    getInitialState: function(){ 
        // dependencies:  the store must exist before instanciation
        if (!app.stores.jessicajones) app.stores.jessicajones = {};        
        return app.stores.jessicajones
    },
    componentWillMount: function(){
        // initialize page's store with data if its blank when we mount
        if (!app.stores.jessicajones.characters) {
            app.stores.jessicajones.characters = [
                {id: '1-jessica', name : 'Jessica Jones', open: false},
                {id: '2-luke', name : 'Luke Cage', open: false},
                {id: '3-trish', name : 'Trish Walker', open: false},
                {id: '4-will', name : 'Will Simpson', open: false},
                {id: '5-jeri', name : 'Jeri Hogarth', open: false},
                {id: '6-kilgrave', name : 'Kilgrave', open: false},
                {id: '7-malcolm', name : 'Malcolm Ducasse', open: false},
                {id: '8-hope', name : 'Hope Shlottman', open: false}
            ];
        }     
    },
    handleBubbledClick : function(e){
        console.log('bubbled clicked on ' + e.target.id);
        // find the item clicked in the store
        var founditem = _.findWhere(app.stores.jessicajones.characters, {id: e.target.id});
        // set all of them to false
        _.each(app.stores.jessicajones.characters, function(item, k){ 
            item.open = false;
        });
        // set the found one to true. 
        // If founditem is undefinded the user clicked between items
        if (founditem) founditem.open = true;
        // setState and trigger re-render
        this.setState(app.stores.jessicajones);
    },

    render:function(){
        console.log(this.constructor.displayName+' render()');
        // loop through the store and build up data to output, push it with jsx
        var outputArray = [];
        _.each(app.stores.jessicajones.characters, function(item, k){
            var classes = item.open ? 'item open' : 'item';
            outputArray.push(
                <div className={classes} id={item.id}>
                    {item.name}
                </div> 
            );
        });
        // determine if we have an open item and create correct messaging
        var openItem = _.findWhere(app.stores.jessicajones.characters, {open: true});
        var openItemMessage = openItem 
            ? 'The open item is ' + openItem.id 
            : 'There is no open item';

        // the jsx render template
        return (

<div id="jessicajonespage">
    <div className="pageDescription clearfix">
        <img className="poster" src={SiteConfig.assetsDirectory+'images/jessicajonespage/jjposter.jpg'}/>
        <p>
            The Jessica Jones page differs from earlier examples becasue if you navigate away and 
            come back the page remembers which item is open. Check app.stores for debugging 
            purposes and you can see the current data in your components 'model' or store.
        </p>
        <p>
            Additionally this page is an example of listening to bubbled events. There is only one 
            listener on the wrapper of all the clickable items. To support deeplinking the store should be updated with the correct open item during 
            componentWillMount.
        </p>
    </div>
    <div className="itemReadout">
        {openItemMessage}
    </div>
    <div className="itemContainer" onClick={this.handleBubbledClick}>
        {outputArray}
    </div>     
</div>

        );
    }
});
