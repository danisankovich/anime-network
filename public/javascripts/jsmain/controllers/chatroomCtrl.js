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
  $('form').submit(function(event){
    event.preventDefault();
    var $msg = $('#m');
    if ($msg.val().length > 0) {
      socket.emit('chat message', $rootScope.currentUser.username + ': ' + $msg.val());
      $msg.val('');
      // var dateObj = new Date();
      // var month = dateObj.getUTCMonth() + 1; //months from 1-12
      // var day = dateObj.getUTCDate();
      // var year = dateObj.getUTCFullYear();
      // var hour = dateObj.getUTCHours() - 5;
      // if(hour < 12) {
      //   var piece = 'AM'
      // }
      // else {
      //   piece = "PM"
      // }
      // var minute = dateObj.getUTCMinutes();
      // $message.text('Last Message On ' + month+ "/" +day + "/" + year + " | " + hour + ":" + minute + " " + piece);
    }
  });
  socket.on('chat message', function(msg){
    console.log('msg')
    $scope.messages.push(msg)
  });
});
})
