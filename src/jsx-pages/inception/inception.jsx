rc.inceptionPageComponent = class InceptionPageComponent extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'inceptionPageComponent';
        if (typeof app.stores.inception === 'undefined' || app.stores.inception.level > 2) {
            app.stores.inception = {};
            app.stores.inception.level = 0;
        }
    }
    render() {
        console.log(this.displayName+' render()');
        var inception = (app.stores.inception.level < 2) ? <rc.inceptionPageComponent/> : null;
        app.stores.inception.level++;
        return (
            <div className="inceptionpage clearfix">
                <img src={SiteConfig.assetsDirectory+'images/inceptionpage/inception.jpg'}/>
                <p>Here we have an example of inception. Also, it is an 
                   example of creating a React component using ES6 class notation.</p>
                {inception}
            </div>
        );
    }
}