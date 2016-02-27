app.controller('messageCtrl', function($scope, $state, $http, $rootScope, userService){

  userService.getCurrentUser().success(function(data) {
    $scope.user = data;
    $scope.user.friendList = []
    $scope.completedLength = $scope.user.completedAnime.length
    $scope.willWatchLength = $scope.user.willWatch.length
    $scope.favoritedLength = $scope.user.likes.length
    $scope.watchingLength = $scope.user.watchingAnime.length
    $scope.user.friendIds.forEach(function(e) {
      $http.get('/users/' + e.friendId).success(function(friend) {
        e.username = friend.username
        e.isLoggedIn = friend.isLoggedIn
        $scope.user.friendList.push(e)
      })
    })
  });
  $scope.showMessages = function(friend) {
    $scope.friend = friend
    friend.messages.forEach(function(e) {
      if(e.from === $scope.user._id) {
        e.position = 'mine'
      }
      else {
        e.position = 'theirs'
      }
    })
    $scope.selected = this.$index
    $scope.thisFriendsMessages = friend.messages
  }
  $scope.sendMessage=function(newmessage) {
    newmessage.friend = $scope.friend._id
    var theMessage = {to: $scope.friend.friendId, toName: $scope.friend.username, from: $rootScope.currentUser._id, body: newmessage.body, createdAt: Date.now()}
    $http.post('/newmessage', theMessage).success(function(success) {
      theMessage.position = 'mine';
      $scope.thisFriendsMessages.push(theMessage)
      $scope.newmessage = {}
      newmessage = {}
    })
  }
});
