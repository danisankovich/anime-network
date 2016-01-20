app.controller('forumCtrl', function($scope, $state, $http, animeService, userService){
  $scope.whichUrl = 'http://localhost:4000';
  // $scope.whichUrl = 'http://animenetwork.herokuapp.com';
  $http.get('/showforum/' + $state.params.animeId).success(function(forum) {
    $scope.forum = forum
    $http.get('/topics/' + forum._id).success(function(topics) {
      console.log(topics)
      $scope.topics = topics
    })
  })
  userService.getCurrentUser().success(function(data) {
    $scope.user = data;
  });

  $scope.newTopic = function(topic) {
    topic.forumId = $scope.forum._id
    topic.creatorId = $scope.user._id
    $http.post('/newtopic', topic).success(function(newtopic) {
      console.log(newtopic)
    })
  }
});
