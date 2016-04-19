/*
	DEPENDS ON jQUERY
		*see note on Line 55 for pure Javascript
*/

var GATracker = (function(){

	// Function to initialize Google Analytics
	// GATracker.initGA(); should be called somewhere global to the app
	// Typical placement will be in routerSetupConfig.initialize
	function initGA(gaid){
		if (typeof ga == "undefined"){

            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

        } else {

        }

        ga('create', gaid, { // set the google analytics account id when you call GATracker.initGA(ID)
            'cookieDomain': 'none', // localhost testing
            'name': 'mactrack'
        }); 
	}

	// Function to add Event Tracking based on the 'data-track' attribute
	// GATracker.setGA(); should be placed on every page you want to track
	// Typical placement will be in routerSetupConfig.appStatusNowReady
	function setGA(){
		console.log("GATracker.setGA() launched");

		/* example:
			ga('send', {
				'hitType': 'event',          // Required.
				'eventCategory': 'button',   // Required.
				'eventAction': 'click',      // Required.
				'eventLabel': 'nav buttons',
				'eventValue': 4
			}); */

		$('body').off('mouseup','[data-track]').on({
            'mouseup': function(event) {
                var eventCategory = 'macmillantrack',
                    eventAction = 'click',
                    //parent_container = $(event.currentTarget).closest('[id*="ontainer"]').attr('id'),
                    eventValue = event.currentTarget.attributes["data-track"].value;
                console.log("jquery--- ", eventCategory, eventAction, eventValue);
                ga('mactrack.send', 'event', eventCategory, eventAction, eventValue);
            }
        }, '[data-track]');

        // In order to use pure javascript and underscore, you would need to call the setGA() function in componentDidMount()
		/*_.each(document.body.querySelectorAll('[data-track]'), function(obj){
			obj.onclick = function(event){
				console.log("js--- ", event, event.currentTarget);
			}
		});*/
	}

	// Function to add Pageview Tracking based on the window.location.hash
	// GATracker.setPageview(); should be placed on every page/route you want a pageview to be fired
	// Typical placement will be in componentDidMount() wherever you want to track
	function setPageview(){
		console.log('*** page ***', window.location.hash);
		ga('mactrack.send', 'pageview', {
		    'page': window.location.hash 
		});
	}

	return {
		initGA: initGA,
		setGA: setGA,
		setPageview: setPageview
	}


})();