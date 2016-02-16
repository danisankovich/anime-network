app.controller('autoCtrl', function($scope, $state, $http, $rootScope, $location, userService){
  $(document).ready(function() {
    $scope.friendShow = false
    $scope.showList = function() {
      if($scope.friendShow === false) {
        $scope.friendShow = true
      }
      else {
        $scope.friendShow = false;
      }
    };

    function getFriends() {
      $rootScope.currentUser.friendIds.forEach(function(e) {
        $http.get('/users/' + e.friendId).success(function(friend) {
          e.username = friend.username
          e.isLoggedIn = friend.isLoggedIn
        })
      })
    }
    $scope.hideGenre = false;
    var availableTags = [];
    userService.getCurrentUser().success(function(data) {
      $rootScope.currentUser = data;
      $rootScope.currentUser.friendList = [];
      getFriends()
    });
    $('.searchinput').keyup(debounce(function(){
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

    $(window).bind("beforeunload", function() {
      socket.emit('user leave', $scope.user._id);
    });

    socket.on('user leave', function(msg) {
      $http.get('/users/userleave/' + msg).success(function() {
        $http.get('/allloggedin').success(function(currentUserList) {
          $rootScope.currentUserList = currentUserList
          getFriends()
        })
      })
    });
    socket.on('user enter', function(msg) {
      getFriends()
      $http.get('/allloggedin').success(function(currentUserList) {
        $rootScope.currentUserList = currentUserList
      })
    });
  });

  $scope.login = function(user) {
    $http.post('/users/login', user).success(function(){
      userService.getCurrentUser().success(function(data) {
        $rootScope.currentUser = data;
        $rootScope.currentUser.friendList = [];
        getFriends()
        $('#loginModal').foundation('reveal', 'close');
      });
    }).error(function(err) {
      $scope.loginMessage = "Incorrect Username/Password Combination"
    })
  }
  $scope.register = function(newUser) {
    $scope.newUser = newUser;
    $http.post('/users/register', $scope.newUser).success(function(err, data) {
      if(err.hasOwnProperty('name') === true) {
        sweetAlert("Uh Oh  ", err.message, "error");
        return;
      }
      else if(err.hasOwnProperty('errmsg')) {
        sweetAlert("Uh Oh ", newUser.email + " is already registered", "error");
        return;
      }
      else {
        $rootScope.currentUser = err;
        $('#loginModal').foundation('reveal', 'close');
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
  $scope.mailModal = function(friend) {
    $scope.friend = friend
    $('#mailModal').foundation('reveal', 'open');
  }
  $scope.choose=function(friend) {
    $scope.friend = friend
  }
  $scope.message=function(newmessage) {
    newmessage.friend = $scope.friend._id
    var theMessage = {to: $scope.friend.friendId, toName: $scope.friend.username, from: $rootScope.currentUser._id, body: newmessage.body, createdAt: Date.now()}
    $http.post('/newmessage', theMessage).success(function(success) {
      $scope.newmessage = {}
      newmessage = {}
    })
  }
});
