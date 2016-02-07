app.controller('autoCtrl', function($scope, $state, $http, $rootScope, $location, userService){
  $(document).ready(function() {

    $scope.hideGenre = false;
    var availableTags = [];
    userService.getCurrentUser().success(function(data) {
      $rootScope.currentUser = data;
      $scope.friendList = [];
      $rootScope.currentUser.friendIds.forEach(function(e) {
        $http.get('/user/' + e.friendId).success(function(friend) {
          e.username = friend.username
          $scope.friendList.push(e)
        })
      })
    });


    $('input').keyup(debounce(function(){
        $scope.n = $(".autocomplete").val();
        $http.post('/anime/' + $scope.n).success(function(anime) {
          anime.forEach(function(e) {
            if(e.title !== undefined && availableTags.indexOf(e.title) === -1) {
              availableTags.push(e.title);
            }
          });
        });
    },200));
    function debounce(func, wait, immediate) {
    	var timeout;
    	return function() {
    		var context = this, args = arguments;
    		var later = function() {
    			timeout = null;
    			if (!immediate) func.apply(context, args);
    		};
    		var callNow = immediate && !timeout;
    		clearTimeout(timeout);
    		timeout = setTimeout(later, wait);
    		if (callNow) func.apply(context, args);
    	};
    }
    $( "#tags" ).autocomplete({
      source: availableTags,
      select: function(event, ui) {
        $(this).val(ui.item.value);
        $scope.anime = $(this).val();
      }
    });
  $scope.searchAnime = function() {
    anime = document.getElementById('tags').value;
    $state.go('animelist', {animename: anime});
    document.getElementById('tags').value = '';
  };
  $(function(){
    var max = 4;
    var checkboxes = $('input[type="checkbox"]');
    checkboxes.change(function(){
      var current = checkboxes.filter(':checked').length;
      checkboxes.filter(':not(:checked)').prop('disabled', current >= max);
    });
  });
  $scope.genres = function(genre) {
    $rootScope.searchGenres = [];
    for(var key in genre) {
      if (genre[key] === true) {
        if(key === 'GenderBender') { $rootScope.searchGenres.push('Gender Bender'); }
        else if(key === 'MahouShoujo') { $rootScope.searchGenres.push('Mahou Shoujo'); }
        else if(key === 'MartialArts') { $rootScope.searchGenres.push('Martial Arts'); }
        else if(key === 'SciFi') { $rootScope.searchGenres.push('Sci-Fi'); }
        else if(key === 'ShounenAi') { $rootScope.searchGenres.push('Shounen Ai'); }
        else if(key === 'MahouShounen') { $rootScope.searchGenres.push('Mahou Shounen'); }
        else if(key === 'ShoujoAi') { $rootScope.searchGenres.push('Shoujo Ai'); }
        else if(key === 'SliceofLife') { $rootScope.searchGenres.push('Slice of Life'); }
        else if(key === 'SuperPower') { $rootScope.searchGenres.push('Super Power'); }
        else { $rootScope.searchGenres.push(key); }
      }
    }
    $('#myModal').foundation('reveal', 'close');
      if ($location.$$path !== "/animegenre") { $state.go('animegenre'); }
      else { $state.go($state.current, {}, {reload: true}); }
    };
    $(function() {
      userService.getCurrentUser().success(function(data) {
        $scope.user = data;
        $scope.messageText = 'Welcome to the room, ' + $scope.user.username + '!';
        socket.emit('user enter', $scope.user.username);
      });
      var socket = io();
    // $scope.messages = []
    // socket.on('user enter', function(msg) {
    //       // if ($scope.signedIn) {
    //   //   $('#messages').append($('<li>').text('USER: ' + msg + ' just entered the chat room.'));
    //   // }
    //   $http.get('/username/' + msg).success(function(newUser) {
    //     $scope.messages.push("USER: ", newUser.username + " has entered the chatroom")
    //   })
    //   $http.get('/users/allloggedin').success(function(currentUserList) {
    //     $scope.currentUserList = currentUserList
    //     console.log($scope.currentUserList)
    //   })
    // });
      // }

    $(window).bind("beforeunload", function() {
      socket.emit('user leave', $scope.user._id);
    });

    socket.on('user leave', function(msg) {
        $http.get('/userleave/' + msg).success(function() {
          console.log('e')
          $http.get('/users/allloggedin').success(function(currentUserList) {
            $scope.currentUserList = currentUserList
            console.log($scope.currentUserList)
          })
        })
    });
  });

  $scope.login = function(user) {
    console.log(user)
    $http.post('/login', user).success(function(user){
      console.log(user)
      userService.getCurrentUser().success(function(data) {
        $rootScope.currentUser = data;
        $scope.user = $rootScope.currentUser
        $scope.friendList = [];
        $rootScope.currentUser.friendIds.forEach(function(e) {
          $http.get('/user/' + e.friendId).success(function(friend) {
            e.username = friend.username
            $scope.friendList.push(e)
          })
        })
        $('#loginModal').foundation('reveal', 'close');
      });
    })
  }
  $scope.register = function(newUser) {
    $scope.newUser = newUser;
    $http.post('/register', $scope.newUser).success(function(err, data) {
      if(err.hasOwnProperty('name') === true) {
        sweetAlert("Uh Oh  ", err.message, "error");
        return;
      }
      else if(err.hasOwnProperty('errmsg')) {
        sweetAlert("Uh Oh ", newUser.email + " is already registered", "error");
        return;
      }
      else {
        userService.getCurrentUser().success(function(data) {
          $rootScope.currentUser = data;
          $scope.friendList = [];
          $rootScope.currentUser.friendIds.forEach(function(e) {
            $http.get('/user/' + e.friendId).success(function(friend) {
              e.username = friend.username
              $scope.friendList.push(e)
            })
          })
          $('#loginModal').foundation('reveal', 'close');
        });
      }
    });
  };
  $scope.closeLogin = function() {
    $('#loginModal').foundation('reveal', 'close');
  }

  });
  $scope.loginModal = function() {
    $('#loginModal').foundation('reveal', 'open');
  }
  $scope.mailModal = function() {
    $('#mailModal').foundation('reveal', 'open');
  }
  $scope.choose=function(friend) {
    $scope.friend = friend
  }
  $scope.message=function(newmessage) {
    newmessage.friend = $scope.friend._id
    var theMessage = {to: $scope.friend.friendId, toName: $scope.friend.username, from: $rootScope.currentUser._id, body: newmessage.body, createdAt: Date.now()}
    console.log(theMessage)
    $http.post('/newmessage', theMessage).success(function(success) {
      $scope.newmessage = {}
      newmessage = {}
    })
  }
  // $(function() {
  // var socket = io.connect('http://localhost');
    // });
});
