
rc.walkingPanel =  React.createClass({
    getDefaultProps:function(){
        return { imagepath: '' }
    },
    render:function(){
        return (
            <img src={this.props.imagepath}/>
        );
    }
});
