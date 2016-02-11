app.controller('forumCtrl', function($scope, $state, $http, animeService, userService, forumService){

  userService.getCurrentUser().success(function(data) {
    $scope.user = data;
  });
  $http.get('/showforum/' + $state.params.animeId).success(function(forum) {
    $scope.forum = forum
    $http.get('/topics/' + forum._id).success(function(topics) {
      topics.forEach(function(topic) {
        $http.get('/users/' + topic.creatorId).success(function(user){
          topic.user = user
          $http.get('/users/' + topic.mostRecentUser).success(function(lastUser) {
            topic.mostRecentUser = lastUser.username
          })
        })
      })
      $scope.topics = topics
    })
  })
  // forumService.getForum().success(function(forum) {
  //   console.log(forum);
  // });

  $scope.toTopic = function(topic) {
    $state.go('onetopic', {topicId: topic._id})
  }
  $scope.toUser = function(topic) {
    $state.go('user', {userId: topic.user._id})
  }
  $scope.toUserTwo = function(topic) {
    $state.go('user', {userId: topic.mostRecentUser})
  }


  $scope.newTopic = function(topic) {
    topic.forumId = $scope.forum._id
    topic.creatorId = $scope.user._id
    $http.post('/newtopic', topic).success(function(newtopic) {
      $('#topicModal').foundation('reveal', 'close');

      $http.get('/showforum/' + $state.params.animeId).success(function(forum) {
        $scope.forum = forum
        $http.get('/topics/' + forum._id).success(function(topics) {
          topics.forEach(function(topic) {
            $http.get('/users/' + topic.creatorId).success(function(user){
              topic.user = user
            })
          })
          $scope.topics = topics
        })
      })
    })
  }
});
