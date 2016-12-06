rc.attackontitanModal = React.createClass({

    render:function(){
        console.log(this.constructor.displayName+' render()');
        return ( 
            <div className="modalwrapper">
                <rc.modalCloseButton/>
                <div className="modalContentsWrapper">
                    <div id="attackontitanModal">
                        <h3>Attack on Titan</h3>
                        <p>
                            Attack on Titan is a Japanese anime and manga series. After his 
                            hometown is destroyed and his mother is killed, young Eren Jaegar 
                            vows to cleanse the earth of the giant humanoid Titans that have 
                            brought humanity to the brink of extinction.
                        </p>
                        <img src={SiteConfig.assetsDirectory+'images/animepage/attackontitan.jpg'}/>                            
                    </div>
                </div>
            </div>
        );
    }

});
