app.controller('topicCtrl', function($scope, $state, $http, animeService, userService){
  $scope.whichUrl = 'http://localhost:4000';
  // $scope.whichUrl = 'http://animenetwork.herokuapp.com';
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
  $scope.reply = function(response) {
    response.user = $scope.user._id
    response.createdAt = Date.now()
    $scope.topic.responses.push(response)
    $http.post('/respondtopic', $scope.topic).success(function(topic) {
      $scope.topic = topic;
      console.log(topic)
    })
  }

})
