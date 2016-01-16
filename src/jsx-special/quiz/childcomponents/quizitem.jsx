rc.quizItemComponent = React.createClass({
    render:function(){
        return (
<div className="quizitem">
	<input type="checkbox" key={this.props.key}/>
    <span>{this.props.label}</span>
</div>
        );
    }
});
