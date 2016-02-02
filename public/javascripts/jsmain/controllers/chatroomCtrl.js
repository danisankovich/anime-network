app.controller('chatroomCtrl', function($scope, $state, $http, $rootScope, userService){
  $scope.signedIn = false;
  $(function() {
    userService.getCurrentUser().success(function(data) {
      $scope.user = data;
      $scope.messageText = 'Welcome to the room, ' + $scope.user.username + '!';
      socket.emit('user enter', $scope.user.username);
      $scope.signedIn = true;
    });
  // var socket = io.connect('http://localhost');
    var socket = io();
  var $username = $('#username');
  var $usernameButton = $('header button[name="addUsername"]');
  var $message = $('header p');
  $('header button[name="addUsername"]').click(function(event) {
    if ($username.val().length > 0) {
      console.log('aasfassf')
      $usernameButton.hide();
      $message.text('Welcome to the room, ' + $username.val() + '!');
      $username.attr('disabled', true);
      $('main').show();
      socket.emit('user enter', $username.val());
      signedIn = true;
    }
  });
  socket.on('user enter', function(msg) {
    console.log('asf')
    if ($scope.signedIn) {
      $('#messages').append($('<li>').text('USER: ' + msg + ' just entered the chat room.'));
    }
  });
  $('form').submit(function(event){
    event.preventDefault();
    $msg = $('#m');
    if ($msg.val().length > 0) {
      console.log($msg.val())
      socket.emit('chat message', $username.val() + ': ' + $msg.val());
      $msg.val('');
      var dateObj = new Date();
      var month = dateObj.getUTCMonth() + 1; //months from 1-12
      var day = dateObj.getUTCDate();
      var year = dateObj.getUTCFullYear();
      var hour = dateObj.getUTCHours() - 5;
      if(hour < 12) {
        var piece = 'AM'
      }
      else {
        piece = "PM"
      }
      var minute = dateObj.getUTCMinutes();
      $message.text('Last Message On ' + month+ "/" +day + "/" + year + " | " + hour + ":" + minute + " " + piece);
    }
  });
  socket.on('chat message', function(msg){
    console.log('msg')
    if (signedIn) {
      $('#messages').append($('<li>').text(msg));
    }
  });
  $(window).bind("beforeunload", function() {
    socket.emit('user leave', $username.val());
  });
  socket.on('user leave', function(msg) {
    if (signedIn) {
      $('#messages').append($('<li>').text('USER: ' + msg + ' just logged out.'));
    }
  });
  $('#m').keypress(function() {
    socket.emit('user typing', $username.val());
  })
  socket.on('user typing', function(msg) {
    if (signedIn) {
      $message.text(msg + ' is typing.');
    }
  })
});
})
