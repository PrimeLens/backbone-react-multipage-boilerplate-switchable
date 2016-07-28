rc.thronesPageComponent = React.createClass({

    render:function(){
        console.log(this.constructor.displayName+' render()');
        return (


<div className="whatevercssclass">
    <p>
        All the other pages follow specific css pattern. The purpose of this page is
        to demonstrate that this is not locked to this boilerplate. You can 
        set your own.
    </p>
    <img src={SiteConfig.assetsDirectory+'images/thronespage/gamethrones.jpg'}/>
    <p>
        <span className="specialQuote">Valar morghulis</span>
        <br/>translates to "all men must die"
    </p>   
</div>


        );
    }
});
