rc.quizComponent = React.createClass({
    render:function(){
        // loop through and build up an array which we will include in the render
    	var theOptions = [];
    	_.each(this.props.data.options, function(value, i){
    		theOptions.push(<rc.quizItemComponent key={i} label={value}/>);
    	});

        return (
<div>
	<div className="quizheader">
	    <span className="leftGraphic"></span>
	    <span className="quiztitle">{this.props.data.quiztitle}</span>
	    <span className="rightGraphic"></span>
	</div>
	<div className="options">{theOptions}</div>
	<div className="submitquizbtn">Submit</div>
</div>
        );
    }
});
