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
