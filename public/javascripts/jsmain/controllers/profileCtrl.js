app.controller('profileCtrl', function($scope, $state, $http, $rootScope, userService){
  $scope.whichUrl = 'http://localhost:4000';
  // $scope.whichUrl = 'https://animenetwork.herokuapp.com';
  userService.getCurrentUser().success(function(data) {
    $scope.user = data;
    $scope.user.friendList = []
    $scope.completedLength = $scope.user.completedAnime.length
    $scope.willWatchLength = $scope.user.willWatch.length
    $scope.favoritedLength = $scope.user.likes.length
    $scope.watchingLength = $scope.user.watchingAnime.length
    $scope.user.friendIds.forEach(function(e) {
      $http.get('/user/' + e.friendId).success(function(friend) {
        e.username = friend.username
        $scope.user.friendList.push(e)
      })
    })
  });
  $scope.completedAnime = function() {
    $state.go('myComplete')
  }
  $scope.willWatchAnime = function() {
    $state.go('willWatch')
  }
  $scope.accept=function(friend) {
    $http.post('/acceptfriend/' + friend.friendId).success(function(success) {
      console.log(success)
    })
  }
});
