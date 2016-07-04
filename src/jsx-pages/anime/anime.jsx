rc.animePageComponent = React.createClass({

    getInitialState:function(){
        return _.extend(app.status, {
        })
    },

    handleAnimeClick : function(modaltemplate){
        grandCentral.trigger('modalShow', modaltemplate);
    },

    render:function(){
        console.log(this.constructor.displayName+' render()');
        return (

<div id="animepage">
    <p>
        The anime page is a demonstration of how to have event driven 
        modals that can be deep linkable.
    </p>   
    <p>
        Click the following to open just using events and without altering the URL<br/>
        <div className="animelink" onClick={this.handleAnimeClick.bind(self,'deathnoteModal')}>
            <img src={SiteConfig.assetsDirectory+'images/animepage/deathnote.jpg'}/>
        </div> 
        <div className="animelink" onClick={this.handleAnimeClick.bind(self,'attackontitanModal')}>
            <img src={SiteConfig.assetsDirectory+'images/animepage/attackontitan.jpg'}/>
        </div>    
    </p>
    <p>
        Click the following to open using a deep link.
        The url fragment must consist of modalShow-nameoftemplate 
        where nameoftemplate is the name of the modal template you want to open
        Note that modalShow-nameoftemplate must be the last URL fragment.        
    </p>
    <p>
        <a className="animelink" href="#/anime/modalShow-deathnoteModal">
            <img src={SiteConfig.assetsDirectory+'images/animepage/deathnote.jpg'}/>
        </a> 
        <a className="animelink" href="#/anime/modalShow-attackontitanModal">
            <img src={SiteConfig.assetsDirectory+'images/animepage/attackontitan.jpg'}/>
        </a>    
    </p>     
</div>

        );
    }
});
