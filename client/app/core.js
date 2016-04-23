TweetFinder.controller('TweetFinderController', ['$scope', '$http', function($scope, $http) {

  $scope.getTweets = function() {
    // reset our tweets array every search
    $scope.tweets = [];

    $http.get('/api/tweets?q=' + $scope.tweet.keyword)
      .success($scope.displayTweets);
  };

  $scope.displayTweets = function(data) {
    for (var i = 0; i < data.length; i++) {
      var index = data[i].created_at.indexOf("+");
      var date = data[i].created_at.substr(0,index-1)

      // add each tweets info to tweets array
      $scope.tweets.push({
        "userProfileImageURL": (data[i].user.profile_image_url).replace("normal","bigger"),
        "userScreenName": '@' + data[i].user.screen_name,
        "userProfileURL": 'https://www.twitter.com/' + data[i].user.screen_name,
        "message": data[i].text,
        "date": date
      });
    }

  }
}]);

