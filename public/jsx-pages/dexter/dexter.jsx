rc.dexterPageComponent = React.createClass({
    getInitialState:function(){
        return _.extend(app.status, {
        })
    },
    render:function(){
        console.log(this.constructor.displayName+' render()');
        return (

<div id="dexterpage">
    <img src={SiteConfig.assetsDirectory+'images/dexterpage/dexter.jpg'}/>
    <p>
        The Dexter page (as well as the True Blood page) bring in a 
        Parents Advisory child component. Components such as parentsadvisory.jsx
        are stored in <span className='codestyle'>/public/jsx-special</span> along
        with any other component that might be shared between pages.
    </p>
    <rc.parentsadvisory/>
</div>
        );
    }
});
