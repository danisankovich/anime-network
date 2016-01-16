app.controller('profileCtrl', function($scope, $state, $http, $rootScope, userService){
  $scope.whichUrl = 'http://localhost:4000';
  // $scope.whichUrl = 'https://animenetwork.herokuapp.com';
  userService.getCurrentUser().success(function(data) {
    $scope.user = data;
    $scope.completedLength = $scope.user.completedAnime.length
    $scope.willWatchLength = $scope.user.willWatch.length
    $scope.favoritedLength = $scope.user.likes.length
    $scope.watchingLength = $scope.user.watchingAnime.length
  });
  $scope.completedAnime = function() {
    $state.go('myComplete')
  }
  $scope.willWatchAnime = function() {
    $state.go('willWatch')
  }
});
