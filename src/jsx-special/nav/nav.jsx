rc.nav = React.createClass({
	getInitialState:function(){
        return {
        	currentPage : ''
        }
    },
	componentDidMount : function(){
		var self= this;
        // unbind before binding in case component unmounts/remounts, optionally use componentWillUnmount	
	    grandCentral.off('pagechange').on('pagechange', function(data){
			self.setState({
				currentPage: data.currentPage
			});
	    });
	},
	getClassNameWithActive : function(arg){
		var className = 'navitem';
		if (arg == this.state.currentPage) {
			className = className + ' active';
		}
		return className;
	},
    render:function(){
        return (
<div>
															</div>
        );
    }
});
	