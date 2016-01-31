app.controller('topicCtrl', function($scope, $state, $http, animeService, userService){
  // $scope.whichUrl = 'http://localhost:4000';
  $scope.whichUrl = 'http://animenetwork.herokuapp.com';
  userService.getCurrentUser().success(function(data) {
    $scope.user = data;
  });

  $http.get('/onetopic/' + $state.params.topicId).success(function(onetopic) {
    $http.get('/user/' + onetopic[0].creatorId).success(function(user){
      onetopic[0].user = user
      $scope.topic = onetopic[0]
    })
  })
  $scope.replyModal = function() {
    $('#replyModal').foundation('reveal', 'open');
  }
  $scope.replyPostModal = function() {
    $('#replyPostModal').foundation('reveal', 'open');
    $scope.post = this.response
  }
  $scope.reply = function(response) {
    response.user = $scope.user._id
    response.createdAt = Date.now()
    response.responses = []
    $scope.topic.responses.push(response)
    $http.post('/respondtopic', $scope.topic).success(function(topic) {
      $scope.topic = topic;
      console.log(topic)
    })
  }
  $scope.replyToPost = function(post) {
    post.user = $scope.user._id
    post.createdAt = Date.now()
    $scope.post.responses.push(post)
    $http.post('/respondtopic', $scope.topic).success(function(topic) {
      $scope.topic = topic;
      console.log(topic)
    })
  }

  $scope.toUser = function(topic) {
    $state.go('user', {userId: topic.user._id})
  }


})
