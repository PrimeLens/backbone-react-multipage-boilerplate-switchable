


module.exports = function(){


	var express = require('express');
	var bodyParser = require('body-parser');
	var aws = require('aws-sdk');
	var sts = new aws.STS();
	var keys = require('./keys'); 


	var app = express();

	app.use( bodyParser.json() );
	app.use(bodyParser.urlencoded({ extended: true }));

	app.use(express.static(__dirname + '/public'));

  /*
  ** This is a sample endpoint to demonstrate the code
  ** that is necessary to get an AWS STS token.
  ** A keys.js file is needed in the root directory
  ** to make this work.
  ** The contents of the keys file should be...
  ** var keys = {
  **  accessKeyId: 'enter a real access key iD here',
  **  secretAccessKey: 'enter a secret access key here'
  ** };
  */
  // These are the credentials for the macmillan-front-end user.
  aws.config.update({
    accessKeyId: keys.accessKeyId,
    secretAccessKey: keys.secretAccessKey
  });

  app.get('/token', function(req, res) {
    var params = {
      DurationSeconds: 3600
    };
    sts.getSessionToken(params, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else {
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
