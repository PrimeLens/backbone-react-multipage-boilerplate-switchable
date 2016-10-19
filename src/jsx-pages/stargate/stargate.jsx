
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


    render:function(){
        console.log(this.constructor.displayName+' render()');

        var output;
        if(app.status.currentFragsArray[0] != "iframe"){
            output = '<iframe src="https://still-cliffs-45326.herokuapp.com/#/stargate/iframe" />';
        }else{
            output = '<img src="images/stagatepage/Stargate.JPG" />';
        }

        // render,  and include received output
        return (

<div id="bladerunner">
    
    {output}
    
    <br/><br/><br/><br/><br/>
</div>

        );
    }
});
