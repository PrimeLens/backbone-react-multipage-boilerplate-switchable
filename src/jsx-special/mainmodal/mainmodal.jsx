rc.mainmodal = React.createClass({

    getInitialState:function(){
        return {
            show : false,
            whichTemplate : ''
        }
    },

    // assign controllers aka event listeners
    componentDidMount : function(){
        var self = this;

        // unbind before binding in case component unmounts/remounts, optionally use componentWillUnmount    
        grandCentral.off('modalHide').on('modalHide', function(){
            // we must check for modal deeplink, if its not there ust setState
            // but it it is there we must remove it from url
            // the removal must use a url change, this accounts for 
            // browser back button and tracking done on url changes
            // we will rely on reactJS diff to manage and minimize page rerender
            // any ajax calls on any such page should be coded to handle page reloads
            var modalDeeplink = false;
            if (app.status.currentFragString) {
                if (app.status.currentFragString.indexOf('modalShow-') > -1) { modalDeeplink = true; }
            }
            // act on the flag
            if (!modalDeeplink) {
                self.setState({ show: false, whichTemplate : '' });
            } else {
                    var newURL = '#/' + app.status.currentRoute;
                    var stringToRemove = 'modalShow-'+self.state.whichTemplate;
                    console.log('removing '+ stringToRemove +'from the URL');
                    // check all three possibilities in this order
                    newURL = newURL.replace('/'+stringToRemove,'');
                    newURL = newURL.replace(stringToRemove+'/','');
                    newURL = newURL.replace(stringToRemove,'');
                    // update the URL
                    app.navigate(newURL);
            }               
        });
        // unbind before binding in case component unmounts/remounts        
        grandCentral.off('modalShow').on('modalShow', function(payLoad){
            self.setState({ show: true, whichTemplate : payLoad});
        });        
    }, 

    render:function(){
        console.log(this.constructor.displayName+' render()');
        var self = this;
        var outputTemplate = [];
        switch(this.state.whichTemplate) {
            case 'attackontitanModal': outputTemplate.push(<rc.attackontitanModal/>);    break;
            case 'deathnoteModal': outputTemplate.push(<rc.deathnoteModal/>);    break;
        }
        if (this.state.show) {
            return (
                <div className="absolutewrapper">
                    <div className="greybacking">
                        <div className="modal-topspacer"></div>
                        {outputTemplate}
                    </div>
                </div>
            );  
        } else {
            return null;
        }
      
    }

});
