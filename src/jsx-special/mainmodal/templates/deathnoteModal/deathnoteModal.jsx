rc.deathnoteModal = React.createClass({

    render:function(){
        console.log(this.constructor.displayName+' render()');
        return ( 
            <div className="modalwrapper">
                <rc.modalCloseButton/>
                <div className="modalContentsWrapper">
                    <div id="deathnoteModal">
                        <h3>Death Note</h3>
                        <p>
                        Death Note is a Japanese anime and manga series. 
                        Light Yagami, an ordinary university student, receives a death 
                        note which changes his life. The death note awakens his warped 
                        sense of justice and genius.
                        </p>
                        <img src={SiteConfig.assetsDirectory+'images/animepage/deathnote.jpg'}/>     
                    </div>
                </div>
            </div>
        );        
    }
});
