app.controller('chatroomCtrl', function($scope, $state, $http, $rootScope, userService){
  $scope.signedIn = false;
  $(function() {
    userService.getCurrentUser().success(function(data) {
      $scope.user = data;
      $scope.messageText = 'Welcome to the room, ' + $scope.user.username + '!';
      socket.emit('user enter', $scope.user.username);
      $scope.signedIn = true;
      $http.get('/allloggedin').success(function(currentUserList) {
        $rootScope.currentUserList = currentUserList
      })
    });
    $http.get('/chats/').success(function(chats) {
      $scope.chats= chats
      console.log($scope.chats)
    })
    $scope.toUser = function(user) {
      $state.go('user', {userId: user._id})
    }
    $scope.toUserSaved = function(chat) {
      $state.go('user', {userId: chat.userId})
    }
  var socket = io();
  var $username = $('#username');
  var $usernameButton = $('header button[name="addUsername"]');
  var $message = $('header p');
  $scope.messages = []
  socket.on('user enter', function(msg) {
    $http.get('/allloggedin').success(function(currentUserList) {
      console.log(currentUserList)
      $rootScope.currentUserList = currentUserList
    })
  });
  $scope.chatMessage = function(sent) {
    var chat = {user: $rootScope.currentUser.username, message: sent, userId: $rootScope.currentUser._id, createdAt: Date.now()};
    if (sent.length > 0) {
      socket.emit('chat message', chat);
      console.log(chat)
      $http.post('/chats/', chat).success(function(chats) {
        console.log(chats)
      })
      $scope.sent = '';
    }
  };
  socket.on('chat message', function(msg){
    $scope.$apply(function () {
      $scope.messages.push(msg)
    });
  });
});
})
