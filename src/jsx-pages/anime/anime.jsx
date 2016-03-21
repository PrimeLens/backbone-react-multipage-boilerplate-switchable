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
            <img src={SiteConfig.assetsDirectory+'images/anime/deathnote.jpg'}/>
        </div> 
        <div className="animelink" onClick={this.handleAnimeClick.bind(self,'attackontitanModal')}>
            <img src={SiteConfig.assetsDirectory+'images/anime/attackontitan.jpg'}/>
        </div>    
    </p>
    <p>
        Click the following to open using a deep link.
        Note this uses the query string parameters.        
    </p>
    <p>
        <a className="animelink" href="#/anime?modalShow=deathnoteModal">
            <img src={SiteConfig.assetsDirectory+'images/anime/deathnote.jpg'}/>
        </a> 
        <a className="animelink" href="#/anime?modalShow=attackontitanModal">
            <img src={SiteConfig.assetsDirectory+'images/anime/attackontitan.jpg'}/>
        </a>    
    </p>
    <p>
        When there is a complex query string the modal close preserves 
        the other query parameters. Clicking below will add other paramters 
        to the query string so you can observe the close.
    </p>
    <p>
        <a className="animelink" href="#/anime?modalShow=deathnoteModal&aaa=111&bbb=222">
            <img src={SiteConfig.assetsDirectory+'images/anime/deathnote.jpg'}/>
        </a> 
        <a className="animelink" href="#/anime?xxx=555&yyy=999&modalShow=attackontitanModal">
            <img src={SiteConfig.assetsDirectory+'images/anime/attackontitan.jpg'}/>
        </a>    
    </p>         
</div>

        );
    }
});
