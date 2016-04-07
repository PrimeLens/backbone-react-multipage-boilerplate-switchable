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
            self.setState({ show: false, whichTemplate : '' });
        });
        // unbind before binding in case component unmounts/remounts        
        grandCentral.off('modalShow').on('modalShow', function(payLoad){
            self.setState({ show: true, whichTemplate : payLoad});
        });        
    },  

    handleModalClose : function(){
        // first close the modal
        grandCentral.trigger('modalHide');
        // now check for modal deeplink and remove it from url
        // the removal must use a url change, this accounts for 
        // browser back button and tracking done on url changes
        // we will rely on reactJS diff to manage and minimize page rerender
        // any ajax calls on any such page should be coded to handle page reloads
        if (app.status.currentFragString) {
            if (app.status.currentFragString.indexOf('modalShow-') > -1) { 
                var newURL = '#/' + app.status.currentRoute;
                var stringToRemove = 'modalShow-'+this.state.whichTemplate;
                console.log('removing '+ stringToRemove +'from the URL');
                // check all three possibilities in this order
                newURL = newURL.replace('/'+stringToRemove,'');
                newURL = newURL.replace(stringToRemove+'/','');
                newURL = newURL.replace(stringToRemove,'');
                // update the URL
                app.navigate(newURL);
            }
        }
    },

    render:function(){
        console.log(this.constructor.displayName+' render()');
        var self = this;
        var classes = this.state.show ? 'absolutewrapper active' : 'absolutewrapper ';
        var outputArray = [];
        switch(this.state.whichTemplate) {
            case 'attackontitanModal': outputArray.push(<rc.attackontitanModal/>);    break;
            case 'deathnoteModal': outputArray.push(<rc.deathnoteModal/>);    break;
        }

        return ( 
            <div className={classes}>
                <div className="greybacking">
                    <div className="modalwrapper">
                        <div className="modalCloseButtonWrapper">
                            <div className="modalCloseButton" onClick={self.handleModalClose}>
                                <img src={SiteConfig.assetsDirectory+'images/ui/modal-close-btn.png'}/>                            
                            </div>
                        </div>
                        <div className="modalContentsWrapper">
                            {outputArray}
                        </div>
                    </div>
                </div>
            </div>
         );
    }

});
