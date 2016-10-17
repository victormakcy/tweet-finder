TweetFinder.controller('TweetFinderController', ['$scope', 'tweetsService', function($scope, tweetsService) {
  $scope.loadingNewTweets = false;
  $scope.loadingMoreTweets = false;
  $scope.tweets = [];


  $scope.getTweets = function() {
    $scope.loadingNewTweets = true;

    tweetsService.getTweets($scope.keywords, 21, null).then( function (result) {
      $scope.loadingNewTweets = false;
      $scope.tweets = result;
    }, function () {
      debugger;
      return;
    });
  }

  $scope.getMoreTweets = function() {
    var lastItem = $scope.tweets[$scope.tweets.length - 1];

    $scope.loadingMoreTweets = true;
    tweetsService.getTweets($scope.keywords, 22, lastItem.id).then( function (result) {
      if (!result.length) return;
      result.splice(0, 1);
      $scope.tweets = $scope.tweets.concat(result);
      $scope.loadingMoreTweets = false;
    }, function () {
      return;
    });
  }
}])
