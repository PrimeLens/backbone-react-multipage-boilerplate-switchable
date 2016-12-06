rc.modalCloseButton = React.createClass({
    handleModalClose : function(){
        grandCentral.trigger('modalHide');
    },
    render:function(){
        return ( 
            <div className="modalCloseButtonWrapper">
                <div className="modalCloseButton" onClick={this.handleModalClose}>
                    <img src={SiteConfig.assetsDirectory+'images/ui/modal-close-btn.png'}/>                            
                </div>
            </div>
         );
    }

});
