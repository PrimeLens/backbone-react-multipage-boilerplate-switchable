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
        grandCentral.trigger('modalHide');
        // now check for modal deeplink and remove it if needed
        // we will use a url change as we want any url change tracking to notice 
        // we will rely on react diff to manage and minimize rerender
        // any ajax calls on any such page should be coded to handle page reloads
        // to my knowledge, browser back buttons do not recognize query string chages
        if (app.status.currentQueryObject.modalShow) { 
            var newURL = '#/' + app.status.currentRoute;
            var stringToRemove = 'modalShow='+app.status.currentQueryObject.modalShow;
            // check all three possibilities in this order
            newURL = newURL.replace('&'+stringToRemove,'');
            newURL = newURL.replace(stringToRemove+'&','');
            newURL = newURL.replace('?'+stringToRemove,'');
            // update the URL
            window.location.replace(newURL);
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
