
var GATracker = (function(){

	// Function to initialize Google Analytics
	// Called in Nux.initTrack();
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
        console.log("GA Initalized");
	}

	// Function to send an event to Google Analytics
	// Called in Nux.attachTrack();
	function setGA(eventAction, eventValue){
		/* example:
			ga('send', {
				'hitType': 'event',          // Required.
				'eventCategory': 'button',   // Required.
				'eventAction': 'click',      // Required.
				'eventLabel': 'nav buttons',
				'eventValue': 4
			}); */

		var eventCategory = 'macmillantrack';
			//parent_container = $(event.currentTarget).closest('[id*="ontainer"]').attr('id'),

		ga('mactrack.send', 'event', eventCategory, eventAction, eventValue);
		console.log("GA Event: ", eventCategory, eventAction, eventValue);

	}

	// Function to send a Pageview event based on the window.location.hash (or window.location.pathname?)
	// Called in Nux.sendPageview();
	function setPageview(){
		console.log("GA Pageview Event: ", window.location.hash);
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