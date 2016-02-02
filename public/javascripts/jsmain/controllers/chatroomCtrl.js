app.controller('chatroomCtrl', function($scope, $state, $http, $rootScope, userService){
  $scope.signedIn = false;
  $(function() {
    userService.getCurrentUser().success(function(data) {
      $scope.user = data;
      $scope.messageText = 'Welcome to the room, ' + $scope.user.username + '!';
      socket.emit('user enter', $scope.user.username);
      $scope.signedIn = true;
      $http.get('/users/allloggedin').success(function(currentUserList) {
        $scope.currentUserList = currentUserList
      })
    });
  // var socket = io.connect('http://localhost');
    var socket = io();
  var $username = $('#username');
  var $usernameButton = $('header button[name="addUsername"]');
  var $message = $('header p');
  $scope.messages = []
  socket.on('user enter', function(msg) {
    $http.get('/username/' + msg).success(function(newUser) {
      // $scope.messages.push("USER: " + newUser.username + " has entered the chatroom")
    })
    $http.get('/users/allloggedin').success(function(currentUserList) {
      $scope.currentUserList = currentUserList
      console.log($scope.currentUserList)
    })
  });
  $scope.chatMessage = function(sent) {
  //   console.log(sent)
  // }
  // $('form').submit(function(event){
  //   event.preventDefault();
    if (sent.length > 0) {
      socket.emit('chat message', $rootScope.currentUser.username + ': ' + sent);
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
