TweetFinder.controller('TweetFinderController', ['$scope', 'tweetsService', function($scope, tweetsService) {
  $scope.showInstructions = true;

  $scope.getTweets = function() {
    tweetsService.getTweets($scope.keywords, 21, null).then( function (result) {
      $scope.showInstructions = false;
      $scope.tweets = result;
    }, function () {
      return;
    });
  }

  $scope.getMoreTweets = function() {
    var lastItem = $scope.tweets[$scope.tweets.length - 1];

    tweetsService.getTweets($scope.keywords, 22, lastItem.id).then( function (result) {
      if (!result.length) return;
      result.splice(0, 1);
      $scope.tweets = $scope.tweets.concat(result);
    }, function () {
      return;
    });
  }
}])
