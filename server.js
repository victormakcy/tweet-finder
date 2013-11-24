// set up
var express = require('express');
var app 		= express();

// express configuration
app.configure(function() {
	app.use(express.static(__dirname + '/public')); // set the static files location for assets
});

// configure
config = {
	twitterURL: 'https://api.twitter.com',
	// api key and secret deleted for privacy measures, replace themw ith your own
	apiKey: '',
	apiSecret: '',
};

// request definition
request = (require('request')).defaults({
    strictSSL: true
});

// routes
app.get('/api/tweets', function(req, res) {
	var keyword = req.query.q;

	requestBearerToken(config.apiKey, config.apiSecret, function(token) {
		requestTweets(token, keyword, function(data) {
			res.send(data.statuses);
		});
	});
});

app.get('*', function(req, res) {
	res.sendfile('./public/index.html'); // load the front-end page
});

// helper functions
// calls twitter oauth 2 for a bearer token used for applicaiton-only authorization
requestBearerToken = function(apiKey, apiSecret, success) {
	var token;
	options = {
		auth: {
	        user: apiKey,
	        pass: apiSecret
	    },
		form: {
		  grant_type: 'client_credentials'
		}
	}

	request.post(config.twitterURL + '/oauth2/token', options, function(err, response, body) {
		var data = JSON.parse(body);
		token = data.access_token;
		return success(token);
	});
};

requestTweets = function(token, keyword, success) {
	option = {
		headers: {
			Authorization: "Bearer " + token
		},
		qs: {
			q: keyword,
			count: 50
		}
	}

	request.get(config.twitterURL + '/1.1/search/tweets.json', option, function(err, response, body) {
		var data = JSON.parse(body);
		return success(data);
	});
}

// start listening
app.listen(8080);
console.log("App listening on port 8080");
