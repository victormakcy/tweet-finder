TweetFinder.controller('TweetFinderController', ['$scope', 'tweetsService', function($scope, tweetsService) {
  $scope.getTweets = function() {
    tweetsService.getTweets($scope.keywords).then( function (result) {
      $scope.tweets = result;
    }, function () {
      return;
    });
  };
}]);
