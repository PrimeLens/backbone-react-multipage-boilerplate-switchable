/*  
    EXAMPLE
    interapp.post('http://localhost:3000/interapp', {director: 'Ridley Scott', year : 1982});

    DEPENDENCIES
    jQuery ajax

    REFERENCE SOURCE
    http://stackoverflow.com/questions/19064352/how-to-redirect-through-post-method-using-javascript
                    TWO OPTIONS OF CODE, pure js or jQuery
                        var redirect = function(url, method) {
                            var form = document.createElement('form');
                            form.method = method;
                            form.action = url;
                            form.submit();
                        };
                        redirect('http://www.example.com', 'post');
                    OR
                        var redirect = function(url, method) {
                            $('<form>', {
                                method: method,
                                action: url
                            }).submit();
                        };
                        redirect('http://www.example.com', 'post');
*/



var interapp = ( function() {

    function setup(){
        if (window.interappReceived) {
            dc.interappReceived = window.interappReceived;
            window.interappReceived = undefined;
            if (dc.interappReceived.clientSideRoute) {
                if ( dc.interappReceived.clientSideRoute.substr(0, 2) != '#/' ) return;
                app.navigate(dc.interappReceived.clientSideRoute);
            }
        }
    }


    function post(appurl, payload){
        // create a virtual form
        var $form = $('<form>', { method: 'post', action: appurl });
        // create and attach a virtual input with payload
        var $input = $('<input>').attr('type', 'hidden').attr('name', 'payload').attr('value', JSON.stringify(payload));
        // send
        $form.append($input).submit();        
    }

	return {
        setup : setup,
        post : post
	};


} )();