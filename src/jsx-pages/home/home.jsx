rc.homePageComponent = React.createClass({
    getInitialState:function(){
        return _.extend(app.status, {
        })
    },    
    render:function(){
        console.log(this.constructor.displayName+' render()');
        return (


<div id="homepage">
    <img src={SiteConfig.assetsDirectory+'images/homepage/ghostshell.jpg'}/>
    <p>
        This is a basic page. The jsx and css for this page level component is 
        stored in <span className='codestyle'>/public/jsx-pages</span>
    </p>
    <p>
        Note that when I reference the url the first fragment after the # is called
        the page fragment. Subsequent fragments are called 0, 1, 2 etc.<br/>
        <span className='codestyle'>#/pageFragment/fragment0/fragment1/fragment2</span>
        <br/>Below are links and summaries of the other pages in the boilerplate.
    </p>
    <p>
        <a className={'pagetitle'} href="#/exmachina">Ex Machina</a> - 
        here is an example showing how during runtime we can switch back to a jQuery rendered backbone view page.
    </p>
    <p>
        <a className={'pagetitle'} href="#/gameofthrones">The Game of Thrones Page</a> - 
        here is an example showing how css can completely break away from the
        css pattern discussed on the home page. It also shows an extra render panel.
    </p>
    <p>
        <a className={'pagetitle'} href="#/dexter">Dexter and True Blood</a> - 
        here you can see how a child component is shared across multiple pages.
    </p>
    <p>
        <a className={'pagetitle'} href="#/walkingdead">Walking Dead Page</a> - 
        an example showing how to combine deeplinks with
        pulling data from the config. The browsers back button works with the deeplinks.
    </p>
    <p>
        <a className={'pagetitle'} href="#/hungergames">Hunger Games Page</a> - 
        demonstrates how the component can impose its own local Model onto 
        <span className="codestyle">this.state</span>
    </p>        
    <p>
        <a className={'pagetitle'} href="#/hannibal">Hannibal and Breaking Bad</a> - 
        here is an example showing how a child component shared across different
        pages can have different configurations.
    </p>
    <p>
        <a className={'pagetitle'} href="#/firefly">Firefly</a> - 
        this page has two sibling components that communicate to each other
        using event architecture. The event dispatcher is named grandCentral.
    </p>
    <p>
        <a className={'pagetitle'} href="#/madmax">Mad Max</a> - 
        this page gives an example of how to use the image loader component in conjunction with the BBPreload library.
    </p>
    <p>
        <a className={'pagetitle'} href="#/inception">Inception</a> - 
        the inception page demonstrates how we can use ES6 notion in our JSX
    </p>

    <p>
        <a className={'pagetitle'} href="#/anime">Anime</a> - 
        The anime page is a demonstration of how to have event driven modals that can be deep linkable.
    </p>

        <p>
        <a className={'pagetitle'} href="#/jessicajones">Jessica Jones</a> - 
        Example of a component remembering state after navigating away. Also bubbled events.
    </p>


</div>




        );
    }
});