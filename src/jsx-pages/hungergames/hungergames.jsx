
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
