


module.exports = function(){


    var express = require('express');
    var bodyParser = require('body-parser');
    var app = express();

    app.use( bodyParser.json() );
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(express.static(__dirname + '/public'));

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

    // alter response header so it doesn't say powered by expressJS
    app.use(function(req, res, next){
        res.set('X-Powered-By', '');
        next();
    });

    return app;

}
