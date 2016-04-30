TweetFinder.factory('tweetsService', [ "$http", function($http) {
  var transformTweets = function (tweets) {
    var transformedTweets = [];

    tweets.forEach( function(tweet) {
      var index = tweet.created_at.indexOf("+");
      var date = tweet.created_at.substr(0,index-1)

      transformedTweets.push({
        "userProfileImageURL": (tweet.user.profile_image_url).replace("normal","bigger"),
        "userScreenName": '@' + tweet.user.screen_name,
        "userProfileURL": 'https://www.twitter.com/' + tweet.user.screen_name,
        "message": tweet.text,
        "date": date
      });
    });

    return transformedTweets;
  }

  return {
    getTweets: function(keywords) {
      return $http({
        method: 'GET',
        url: '/api/tweets?q=' + keywords
      }).then( function (res) {
        return transformTweets(res.data);
      }, function (err) {
        return;
      });
    }
  };
}]);
