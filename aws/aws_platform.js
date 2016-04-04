module.exports = function(){
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
	var aws = require('aws-sdk');
	var sts = new aws.STS();

	var keys = require('./keys'); 	
	aws.config.update({
		accessKeyId: keys.accessKeyId,
		secretAccessKey: keys.secretAccessKey
	});
}