app.controller('forumCtrl', function($scope, $state, $http, animeService, userService){
  $scope.whichUrl = 'http://localhost:4000';
  // $scope.whichUrl = 'http://animenetwork.herokuapp.com';
  $http.get('/showforum/' + $state.params.animeId).success(function(forum) {
    $scope.forum = forum
  })
  console.log("forum")
});
