// set up
var express = require('express');
var request = require('request');
var config = require('./config')
var app     = express();

/**
 * Express Configurations - set the static files location for assets
 */
app.use(express.static(__dirname + '/public'));

// routes
app.get('/api/tweets', function(req, res) {
  var keyword = req.query.q;
  var conf = config.get();

  requestBearerToken(conf.consumer_key, conf.consumer_secret, function(token) {
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

  request.post('https://api.twitter.com/oauth2/token', options, function(err, response, body) {
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

  request.get('https://api.twitter.com/1.1/search/tweets.json', option, function(err, response, body) {
    var data = JSON.parse(body);
    return success(data);
  });
}

// start listening
var port = process.env.PORT || 5000;
app.listen(port);
console.log("App listening on port " + port);
