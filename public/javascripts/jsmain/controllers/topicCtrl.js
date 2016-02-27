app.controller('topicCtrl', function($scope, $state, $http, animeService, userService, forumService){

  userService.getCurrentUser().success(function(data) {
    $scope.user = data;
  });

  $http.get('/onetopic/' + $state.params.topicId).success(function(onetopic) {
    $http.get('/users/' + onetopic[0].creatorId).success(function(user){
      onetopic[0].user = user
      $scope.topic = onetopic[0]
      $scope.topic.responses.forEach(function(e) {
        $http.get('/users/' + e.user).success(function(here) {
          e.user = here
          if (e.responses.length > 0) {
            e.responses.forEach(function(a) {
              $http.get('/users/' + a.user).success(function(there) {
                a.user = there
              })
            })
          }
        })
      })
    })
  })

  $scope.reply = function(response) { //reply to main topic
    response.user = $scope.user._id
    response.createdAt = Date.now()
    response.responses = []
    $scope.topic.responses.push(response)
    var rTopic = $scope.topic
    forumService.topicResponse(rTopic).success(function(topic) {
      $scope.topic=topic
    })
  }
  $scope.replyToPost = function(post) { //reply to a reply
    post.user = $scope.user._id
    post.createdAt = Date.now()
    $scope.post.responses.push(post)
    var rTopic = $scope.topic
    forumService.topicResponse(rTopic).success(function(topic) {
      $scope.topic=topic
    })
  }
  $scope.toUser = function(topic) {
    $state.go('user', {userId: topic.user._id})
  }
  $scope.replyModal = function() {
    $('#replyModal').foundation('reveal', 'open');
  }
  $scope.replyPostModal = function() {
    $('#replyPostModal').foundation('reveal', 'open');
    $scope.post = this.response
  }
  $scope.test = function() {
    console.log(this)
  }
})
