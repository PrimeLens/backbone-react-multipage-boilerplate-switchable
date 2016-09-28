
rc.bladerunnerPageComponent = React.createClass({

    getInitialState: function(){
        return ( {count : 0} )
    },

    componentWillMount: function(){
        if (!dc.hermesToSend) dc.hermesToSend = {
            clientSideRoute : '#/bladerunner',   //  when the new app loads at port 3001 we want to go to #/bladerunner
            characters : []
        }
    },

    clickHandlerAddCharacter: function(){
        dc.hermesToSend.characters.push( this.refs.inpText.value );
        this.setState({ count : this.state.count +1 });
    },

    clickHandlerPost: function(){
        Hermes.post('http://localhost:3001/hermes', dc.hermesToSend);
    },

    render:function(){
        console.log(this.constructor.displayName+' render()');

        // pickup any data from dc.hermesReceived and format it for outputArray
        var outputArray = [];
        if (dc.hermesReceived) {
            if ( _.isArray(dc.hermesappReceived) ){
                _.each(dc.hermesReceived, function(e,i){
                    outputArray.push( <div>{JSON.stringify(e)}</div> );
                });
                if (dc.hermesReceived.length===0) outputArray.push( <div>Empty array</div> );
            } else {
                _.each(dc.hermesReceived, function(v,k){
                    outputArray.push( <div>{k+' : '+JSON.stringify(v)}</div> );
                });
                if (outputArray.length===0) outputArray.push( <div>Empty object with no properties</div> );
            }            
        } else {
            outputArray.push( <div>Nothing received</div> );
        }


        // render,  and include received output
        return (

<div id="bladerunner">
    <img src={SiteConfig.assetsDirectory+'images/bladerunnerpage/blade-runner.jpg'}/>
    Data received from hermes post
    <br/>
    <div className="readout">{outputArray}</div>    
    <p>
        The Bladerunner page is demonstrating how we can send JSON data from one front end app to another 
        that is hosted on a different server. Make sure you have a another copy of this boilerplate running 
        at port 3001.  Clicking the button below will post JSON data about this movie to http://localhost:3001
    </p>
    <p>
        Please type a name and add it to the list of characters. You can add more than one. Some suggested names
        from Blade Runner are Deckard, Rachael, Roy, Leon Kowalsk, Pris, J.F. Sebastian and Dr. Tyrell 
    </p>
    <input className="bladeinput" type="text" ref="inpText"/>
    <div className="bladebutton" onClick={this.clickHandlerAddCharacter}>Add Character</div>
    <br/>
    Currently {this.state.count} characters are added.

    <div>{ 
        this.state.count > 0 
        ? 'sending JSON '+JSON.stringify(dc.hermesToSend)
        : ''
    }</div>
    <p> 
        <div className="bladebutton" onClick={this.clickHandlerPost}>Click to send data to http://localhost:3001/</div>
    </p>

</div>

        );
    }
});
