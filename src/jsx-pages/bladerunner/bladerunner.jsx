
rc.bladerunnerPageComponent = React.createClass({

    getInitialState: function(){
        return ( {count : 0} )
    },

    componentWillMount: function(){
        if (!dc.hermesToSend) dc.hermesToSend = {
            clientSideRoute : '#/bladerunner',   //  when the new app loads at port 3001 we want to go to #/bladerunner
            characters : []
        }
    },

    clickHandlerAddCharacter: function(){
        if (this.refs.inpText.value) {
            dc.hermesToSend.characters.push( this.refs.inpText.value );
            this.refs.inpText.value = null;
            this.setState({ count : this.state.count +1 });
        }
    },

    clickHandlerPost: function(){
        Hermes.post('http://localhost:3001/hermes', dc.hermesToSend);
    },

    render:function(){
        console.log(this.constructor.displayName+' render()');

        // pickup any data from dc.hermesReceived and format it for outputArray
        var outputArray = [];
        if (dc.hermesReceived) {
            if ( _.isArray(dc.hermesappReceived) ){
                _.each(dc.hermesReceived, function(e,i){
                    outputArray.push( <div>{JSON.stringify(e)}</div> );
                });
                if (dc.hermesReceived.length===0) outputArray.push( <div>Empty array</div> );
            } else {
                _.each(dc.hermesReceived, function(v,k){
                    outputArray.push( <div>{k+' : '+JSON.stringify(v)}</div> );
                });
                if (outputArray.length===0) outputArray.push( <div>Empty object with no properties</div> );
            }            
        } else {
            //outputArray.push( <div>Data received from hermes post</div> );
        }


        // render,  and include received output
        return (

<div id="bladerunner">
    <img src={SiteConfig.assetsDirectory+'images/bladerunnerpage/blade-runner.jpg'}/>
    { outputArray.length == 0 ? '' : 'Data received from hermes post' }
    <div className="readout">{ outputArray.length != 0 ? outputArray : 'Data received from hermes post will appear here' }</div>    
    <p>
        The Bladerunner page addresses a situation where your app has grown too large and it is best split into two.
        When this happens the user will use a deep link to load the next app and any JSON data that has 
        been retreived from the server is lost. You could call the server again but what if you wanted to pass JSON 
        directly? For that we use the Hermes functionality coded into this boilerplate.  
    </p>
    <p>
        <strong>TL;DR</strong>
        <br/>
        We use Hermes library to send the JSON payload as a post request. The boilerpalte on
        the new server handles the request at <span className="codestyle">/hermes</span>, writes the payload to a 
        cookie and redirects to <span className="codestyle">/</span>. There it reads the cookie and deletes it. It 
        then sends index.html to the client with the payload rendered into the page.  XXS attacks are protected against.  
        The boilerpalte javascript then picks up the data on load.
    </p>
    <p>
        <strong>Steps</strong>
        <ol>
            <li>First create a payload to send in <span className="codestyle">dc.hermesToSend</span>.  To test use the 
                Add Character button at bottom of this page.
            </li>
            <li>On clicking the send button the code runs <span className="codestyle">Hermes.post(appurl, payload)</span> 
                in Hermes.js in lib_developer. This creates <span className="codestyle">&lt;input></span> inside a 
                <span className="codestyle">&lt;form></span> with action field for destination and submits it. To see this 
                locally make sure you have a duplicate of the boiler running at port 3001. Edit the port number in server.js
            </li>
            <li>The destination server boilerplate code at localhost:3001 receives the post request at <span className="codestyle">/hermes</span>
                and parses the payload to verify its JSON.  It then writes the payload to a cookie with a lifetime of 30 seconds 
                and redirects to the server side route '/'
            </li>
            <li>When the get request for '/' fires we check for the cookie, read the payload and delete the cookie.</li>
            <li>Index.html is then served to the client from index.ejs server side template with the JSON payload 
                written into a <span className="codestyle">&lt;div></span> along with a piece of embedded javascript.
            </li>
            <li>The client receives index.html and the embedded javascript uses JSON.parse to read from the <span className="codestyle">&lt;div></span> 
                to once again verify that it is legitmate JSON and not malicious code. It then writes the payload to
                <span className="codestyle">window.hermesReceived</span>
            </li>
            <li>The Backbone/React javascript starts up and in router_developer <span className="codestyle">appStatusNowReady</span> 
                we run <span className="codestyle">Hermes.setup()</span>
            </li>
            <li><span className="codestyle">Hermes.setup()</span> copies <span className="codestyle">window.hermesReceived</span>
                to <span className="codestyle">dc.hermesReceived</span> and deletes <span className="codestyle">window.hermesReceived</span>
                after which it looks in the payload for a property called <span className="codestyle">clientSideRoute</span> and 
                redirects the client side Backbone router to that if it exists.
            </li>
        </ol>
    </p>
    <p>
        <strong>Example</strong>
        <br/>
        Please type a name and add it to the list of characters. You can add more than one. Some suggested names
        from the Blade Runner movie are Deckard, Rachael, Roy, Leon and Pris. Make sure you have a copy of the boiler running locally at port 3001.
    </p>
    <input className="bladeinput" type="text" ref="inpText"/>
    <div className="bladebutton" onClick={this.clickHandlerAddCharacter}>Add Character</div>
    <br/>
    Currently {this.state.count} characters are added to dc.hermesToSend

    <div>{ 
        this.state.count > 0 
        ? 'dc.hermesToSend =  '+JSON.stringify(dc.hermesToSend)
        : ''
    }</div>
    <p> 
        <div className="bladebutton" onClick={this.clickHandlerPost}>Click to send data to http://localhost:3001/</div>
    </p>

    <br/><br/><br/><br/><br/>
</div>

        );
    }
});
