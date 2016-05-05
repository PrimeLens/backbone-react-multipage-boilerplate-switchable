/*
	DEPENDS ON jQUERY
		*see note on Line 56 for pure Javascript
*/

var Nux = (function(){

	// List out possible Tracking Vendors
	var GA = false;
	var Splunk = false; // testing
	var SQSQ = false; // testing

	// Function to initialize Tracking
	// Nux.initTrack(obj); should be called somewhere global to the app
	// Typical placement will be in routerSetupConfig.initialize
	function initTrack(obj){
		console.log("Initialize tracking for: ", _.keys(obj));

		// Initialize Google Analytics
		if(obj.GA){
			GATracker.initGA(obj.GA);
			GA = true;
		}

		// Testing
		if(obj.Splunk){
			console.log("Splunk");
			Splunk = true;
		}

		// Testing
		if(obj.SQSQ){
			console.log("SQSQ");
			SQSQ = true;
		}

	}

	// Function to add Event Tracking based on the 'data-track' attribute
	// Nux.attachTrack(); should be placed on every page you want to track
	// Typical placement will be in routerSetupConfig.appStatusNowReady
	function attachTrack(){
		console.log("Attach Event Tracking");

		$('body').off('mouseup','[data-track]').on({
            'mouseup': function(event) {
                var eventValue = event.currentTarget.attributes["data-track"].value;
                console.log("click track: ", eventValue);

                // Send Google Analytics Click Event
                if(GA){
                	GATracker.setGA("click", eventValue);
                }
            }
        }, '[data-track]');

        // In order to use pure javascript and underscore, you would need to call the setGA() function in componentDidMount()
		/*_.each(document.body.querySelectorAll('[data-track]'), function(obj){
			obj.onclick = function(event){
				console.log("js--- ", event, event.currentTarget);
			}
		});*/
	}

	// Function to send a Manual Event
	// Nux.sendManualEvent(vendor, eventAction, eventValue); should be placed wherever you want an event to be tracked other than data-track click events
	function sendManualEvent(vendor, eventAction, eventValue){
		// Send Google Analytics Event
		if(GA && vendor == 'GA'){
			GATracker.setGA(eventAction, eventValue);
		}
	}

	// Function to add Pageview Tracking
	// Nux.sendPageview(); should be placed on every page/route you want a pageview to be fired
	// Typical placement will be in componentDidMount() wherever you want to track
	function sendPageview(){
		
		// Send Google Analytics Pageview Event
		if(GA){
			GATracker.setPageview();
		}
	}

	return {
		initTrack: initTrack,
		attachTrack: attachTrack,
		sendManualEvent: sendManualEvent,
		sendPageview: sendPageview
	}


})();