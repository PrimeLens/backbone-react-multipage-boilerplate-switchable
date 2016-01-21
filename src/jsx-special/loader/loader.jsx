
// USAGE

// grandCentral.trigger('loaderStart', 'pageload');
// grandCentral.trigger('loaderStart', 'loadmypanel');
// grandCentral.trigger('loaderEnd', 'pageload');
// grandCentral.trigger('loaderEnd', 'loadmypanel');

// the loader will go away once the stack is emptied


// DEPENDANCY : 

// jQuery    $.inArray


rc.loader = React.createClass({
    // no need for stack to be bound to data 
    // so it is a property of the component and outside of this.state
    stack : [],  
    getInitialState:function(){
        return {
            show : false
        }
    },
    componentDidMount : function(currentPage){
        var self= this;
        // unbind before binding in case component unmounts/remounts, optionally use componentWillUnmount    
        grandCentral.off('loaderStart').on('loaderStart', function(uniqueString){
            if($.inArray(uniqueString, self.stack)==-1){
                console.log('loaderStart(' + uniqueString + ')');
                self.stack.push(uniqueString);
                self.setState({ show: true });
            }

        });
        // unbind before binding in case component unmounts/remounts        
        grandCentral.off('loaderEnd').on('loaderEnd', function(uniqueString){
            var i = $.inArray(uniqueString, self.stack);
            if (i>-1){
                self.stack.splice(i,1);
                console.log('loaderEnd(' + uniqueString + ')');
            }
            if ( self.stack.length===0 ){
                self.setState({ show: false });
            }
        });        
    },    
    reset:function() {
        this.stack = [];
        this.setState({ show: false });
    },
    render:function(){
        var classes = this.state.show ? 'active' : '';
        return (
<div id="loader" className={classes}>
    <div className="loadingmessage">
        <img className="spinner" src={SiteConfig.assetsDirectory+'images/ui/spinner.gif'}/>
    </div>
</div>            
        );
    }
});
