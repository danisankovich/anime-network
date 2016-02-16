app.controller('userCtrl', function($scope, $state, $http, $rootScope, userService){

  userService.getCurrentUser().success(function(data) {
    $scope.user = data;
  });
  $http.get('/users/' + $state.params.userId).success(function(person) {
    $scope.person = person
    $scope.person.friendList = []
    $scope.reviews = []
    $scope.completedLength = $scope.person.completedAnime.length
    $scope.willWatchLength = $scope.person.willWatch.length
    $scope.favoritedLength = $scope.person.likes.length
    $scope.watchingLength = $scope.person.watchingAnime.length
    $http.post('/users/reviews', $scope.person.reviews).success(function(reviews) {
      $scope.reviews = reviews
      $scope.reviews.forEach(function(a) {
        $http.get('/users/anime/' + a.showId).success(function(anime) {
          a.showTitle = anime.title
        })
      })
    })
    $scope.person.friendIds.forEach(function(e) {
      $http.get('/users/' + e.friendId).success(function(friend) {
        e.username = friend.username
        $scope.person.friendList.push(e)
      })
    })
  })

  $scope.notFriend = function() {
    if($rootScope.currentUser) {
      var found = $scope.person.friendIds.some(function (el) {
        return el.friendId === $rootScope.currentUser._id;
      });
      if(!found) { return true; }
      else { return false; }
    }
    else { return false; }
  }
  $scope.addFriend = function(person) {
    var found = person.friendIds.some(function (el) {
      return el.friendId === $rootScope.currentUser._id;
    });
    if(found === false) {
      $http.post('/users/friendrequest/' + person._id).success(function(success) {
        swal('success', "Friend Request Sent", 'success')
        $http.get('/users/' + $state.params.userId).success(function(person) {
          $scope.person = person
          $scope.person.friendList = []
          $scope.person.friendIds.forEach(function(e) {
            $http.get('/users/' + e.friendId).success(function(friend) {
              e.username = friend.username
              $scope.person.friendList.push(e)
            })
          })
        })
      })
    }
  }
  $scope.showOneAnime = function(review) {
    $state.go('anime', {animename: review.showTitle});
  };
  $scope.toUser = function(friend) {
    $state.go('user', {userId: friend.friendId})
  }
});
