
rc.stargatePageComponent = React.createClass({

    getInitialState: function(){
        return ( {count : 0} )
    },

    /*componentWillMount: function(){
        if (!dc.hermesToSend) dc.hermesToSend = {
            clientSideRoute : '#/bladerunner',   //  when the new app loads at port 3001 we want to go to #/bladerunner
            characters : []
        }
    },*/

    createMarkup:function(){
        var output;
        if(app.status.currentFragsArray[0] != "iframe"){
            output = '<iframe width="800" height="600" src="https://still-cliffs-45326.herokuapp.com/#/stargate/iframe" />';
        }else{
            output = '<img src="images/stargatepage/Stargate.JPG" />';
        }
        return {__html:output}
    },

    buttonClickHandler:function(){
        console.log(window.location.href + ": buttonClickHandler() ");
        window.top.testfunction(42);
    },

    domainButtonClickHandler:function(){
        console.log(window.location.href + ": domainButtonClickHandler() ");
        document.domain = "herokuapp.com";
    },

    render:function(){
        console.log(this.constructor.displayName+' render()');

        

        // render,  and include received output
        return (

<div id="stargate">
    
    <div dangerouslySetInnerHTML={this.createMarkup()} />

    <button onClick={this.buttonClickHandler} >Call window.top.testfunction(42)</button>
    <br/><br/>
    <button onClick={this.domainButtonClickHandler} >Set document.domain = "herokuapp.com"</button>

    <p>
        window.top.testfunction fails: <br/>
        start.js:14 Uncaught SecurityError: Blocked a frame with origin "https://still-cliffs-45326.herokuapp.com" from accessing a frame with origin "https://infinite-atoll-33137.herokuapp.com". Protocols, domains, and ports must match.
    </p>

    <p>
        change both parent and child document.domain to same superdomain.
    </p>
            
    <br/><br/><br/><br/><br/>
</div>

        );
    }
});

window.testfunction = function(data){
    console.log(window.location.href + ": testfunction(): ", data)
}
