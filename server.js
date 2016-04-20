var express = require('express');
var request = require('request');
var path = require('path');
var config = require('./config')
var app = express();

/**
 * Express Configurations - set the static files location for assets
 */
app.use(express.static(__dirname + '/client'));

/**
 * Get all tweets request definition
 */
app.get('/api/tweets', function(req, res) {
  var keyword = req.query.q;

  requestBearerToken(function(token) {
    requestTweets(token, keyword, function(data) {
      res.send(data.statuses);
    });
  });
});

/**
 * Load the index template
 */
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '/client/index.html'));
});

/**
 * Calls Twitter OAuth 2.0 for a bearer token used for applicaiton-only authorization
 * @param {Function} cb
 */
requestBearerToken = function(cb) {
  var conf = config.get(),
      httpOptions = {
        auth: {
          user: conf.consumer_key,
          pass: conf.consumer_secret
        },
        form: {
          grant_type: 'client_credentials'
        }
      }

  request.post('https://api.twitter.com/oauth2/token', httpOptions, function(err, response, body) {
    var data = JSON.parse(body),
        token = data.access_token;

    return cb(token);
  });
};

/**
 * Get Tweets based on keyword
 * @param {String} token
 * @param {String} keyword
 * @param {Function} cb
 */
requestTweets = function(token, keyword, cb) {
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
    return cb(data);
  });
}

// start listening
var port = process.env.PORT || 5000;
app.listen(port);
console.log("App listening on port " + port);
