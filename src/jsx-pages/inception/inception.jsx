rc.inceptionPageComponent = class InceptionPageComponent extends React.Component {
  constructor(props) {
    super(props);
    var self = this;
    this.state = _.extend(app.status, {});
    this.displayName = 'inceptionPageComponent';
    if (typeof app.status.inception === 'undefined' || app.status.inception.level > 2) {
      app.status.inception = {};
      app.status.inception.level = 0;
    }
  }
  render() {
    console.log(this.displayName+' render()');
    var inception = (app.status.inception.level < 2)? <rc.inceptionPageComponent />: null;
    app.status.inception.level++;
    return (
      <div className="inceptionpage clearfix">
        <img src= {SiteConfig.assetsDirectory+'images/inception/inception.jpg'}/>
        <p>
            Here we have an example of inception. Also, it is an example of creating a React component using ES6 class notation.
        </p>
        {inception}
      </div>
    );
  }
}