


module.exports = function(){


	var express = require('express');
	var bodyParser = require('body-parser');


	var app = express();

	app.use( bodyParser.json() );
	app.use(bodyParser.urlencoded({ extended: true }));

	app.use(express.static(__dirname + '/public'));

  /*
  **  Serve index.html for any non-API requests.
  **  Update robots.txt to ignore anything that is not the index page. 
  */
  app.get('*', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
  });

	// alter response header so it doesn't say powered by expressJS
	app.use(function(req, res, next){
		res.set('X-Powered-By', '');
		next();
	});

	return app;

}
	