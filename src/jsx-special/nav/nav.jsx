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
	<a className={this.getClassNameWithActive('home')} href="#">Home</a>
	<a className={this.getClassNameWithActive('exmachina')} href="#/exmachina">Ex Machina</a>
	<a className={this.getClassNameWithActive('gameofthrones')} href="#/gameofthrones">Game Of Thrones</a>
	<a className={this.getClassNameWithActive('trueblood')} href="#/trueblood">True Blood</a>
	<a className={this.getClassNameWithActive('dexter')} href="#/dexter">Dexter</a>
	<a className={this.getClassNameWithActive('walkingdead')} href="#/walkingdead">Walking Dead</a>
	<a className={this.getClassNameWithActive('hungergames')} href="#/hungergames">Hunger Games</a>
	<a className={this.getClassNameWithActive('hannibal')} href="#/hannibal">Hannibal</a>
	<a className={this.getClassNameWithActive('breakingbad')} href="#/breakingbad">Breaking Bad</a>
	<a className={this.getClassNameWithActive('firefly')} href="#/firefly">Firefly</a>
	<a className={this.getClassNameWithActive('madmax')} href="#/madmax">Mad Max</a>
	<a className={this.getClassNameWithActive('inception')} href="#/inception">Inception</a>
	<a className={this.getClassNameWithActive('anime')} href="#/anime">Anime</a>
	<a className={this.getClassNameWithActive('jessicajones')} href="#/jessicajones">Jessica Jones</a>
	<a className={this.getClassNameWithActive('bladerunner')} href="#/bladerunner">Blade Runner</a>
</div>
        );
    }
});
