


module.exports = function(){


    var express = require('express');
    var bodyParser = require('body-parser');
    var cookieParser = require('cookie-parser')
    var app = express();

    app.use( bodyParser.json() );
    app.use(  bodyParser.urlencoded({extended: true})  );
    app.use( cookieParser() );

    // this sets up the public directory so <img> tags can make get requests
    // for images and for linking to css, etc
    app.use(express.static(__dirname + '/public'));

    // fthe ejs server side templating module has a default directory called 'views' to hold all the ejs tempaltes
    // the following line of code changes that to something more descriptive
    app.set('views', __dirname + '/ejs-templates');    

    // include the aws platform code and run it, 
    // un-comment to use aws, you will need keys
    // require('./aws/aws_platform')();


	app.get('/token', function(req, res) {
		var params = {
			DurationSeconds: 3600
		};
		sts.getSessionToken(params, function(err, data) {
			if (err) {
				// an error occurred
				console.log(err, err.stack)
			} else {
				res.setHeader('Content-Type', 'application/json');
				res.send(JSON.stringify({ token: data }));
			}
		});
	});






    // a simple get request to '/' should return index.html
    // look for a cookie written by the route for post request as well
    // comments about the ejs template I dont want appearing as HTML comments so they are below
        /*  
            HTML comments for index.html
            a post request with a payload of data needs to return index.html with a window level object containing the JSON
            please note that <script>window.hermesReceived = <%= payload %></script> is vulnerable to XSS attacks
            so on the client side html (ejs tempalte), we need JSON.parse the string again 
            http://stackoverflow.com/questions/16098397/pass-variables-to-javascript-in-expressjs
        */
    // main route    
    app.get('/', function(req, res){
        // pick up a payload from the cookie if it came from a post request
        var payload = req.cookies.hermes ? req.cookies.hermes : null;
        // kill the cookie
        res.clearCookie('hermes');
        // res the page
        res.render('index.ejs', { payload: payload });
    });    
    // receive a post request and route to '/' to load up the single page app, pass the payload in a cookie
    app.post('/hermes', function(req, res) {
        var valid = null;
        // check that it is vaild JSON by parsing it
        try { valid = JSON.parse(req.body.payload); } catch (e){ valid = null; }
        var payload = valid ? req.body.payload : null;
        // write a cookie with a life span of 30 seconds, it will be 
        // picked up a split second later by the redirect and deleted anyway
        res.cookie('hermes', payload, { expires: new Date(Date.now() + 30000) });
        res.redirect('/');
    });






    // alter response header so it doesn't say powered by expressJS
    app.use(function(req, res, next){
        res.set('X-Powered-By', '');
        next();
    });

    return app;

}
