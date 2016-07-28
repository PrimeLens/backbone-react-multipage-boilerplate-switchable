rc.truebloodPageComponent = React.createClass({

    render:function(){
        console.log(this.constructor.displayName+' render()');
        return (

<div id="truebloodpage">
    <img src={SiteConfig.assetsDirectory+'images/truebloodpage/trueblood.jpg'}/>
    <p>
        The True Blood page (as well as the Dexter page) bring in a 
        Parents Advisory child component. Components such as parentsadvisory.jsx
        are stored in <span className='codestyle'>/public/jsx-special</span> along
        with any other component that might be shared between pages.
    </p>
    <rc.parentsadvisory/>
</div>
        );
    }
});
