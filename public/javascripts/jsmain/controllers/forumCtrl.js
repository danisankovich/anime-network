app.controller('forumCtrl', function($scope, $state, $http, animeService, userService, forumService){

  userService.getCurrentUser().success(function(data) {
    $scope.user = data;
  });
  forumService.getForum().success(function(forum) {
    $scope.forum = forum
  });

  $scope.toTopic = function(topic) {
    $state.go('onetopic', {topicId: topic._id})
  }
  $scope.toUser = function(topic) {
    $state.go('user', {userId: topic.user._id})
  }
  $scope.toRecentUser = function(topic) {
    $state.go('user', {userId: topic.mostRecentUser._id})
  }

  $scope.newTopic = function(topic) {
    topic.forumId = $scope.forum._id
    topic.creatorId = $scope.user._id
    $http.post('/newtopic', topic).success(function(newtopic) {
      $('#topicModal').foundation('reveal', 'close');
      forumService.getForum().success(function(forum) {
        $scope.forum = forum
      });
    })
  }
});
