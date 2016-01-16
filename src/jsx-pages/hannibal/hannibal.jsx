
rc.hannibalPageComponent = React.createClass({
    getInitialState:function(){
        return _.extend(app.status, {
        })
    },
    render:function(){
        console.log(this.constructor.displayName+' render()');

        return (

<div id="hannibalpage">
    <img src={SiteConfig.assetsDirectory+'images/hannibalpage/hannibal.jpg'}/>
    <p> 
        Here we instanciate a shared child component called quizComponent which
        receives its configuration at the time of instanciation.
    </p>
    <p>
        This child component is simple and does not save its state when changing 
        away to another page. To do this the state data should be stored in 
        <span className='codestyle'>app.status</span>
    </p>
    <rc.quizComponent data={SiteConfig.quiz.hannibal}/>
</div>


        );
    }
});
