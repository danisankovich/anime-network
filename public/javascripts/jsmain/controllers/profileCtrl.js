app.controller('profileCtrl', function($scope, $state, $http, $rootScope, userService){

  userService.getCurrentUser().success(function(data) {
    $scope.user = data;
    $scope.user.friendList = []
    $scope.reviews = []
    $scope.completedLength = $scope.user.completedAnime.length
    $scope.willWatchLength = $scope.user.willWatch.length
    $scope.favoritedLength = $scope.user.likes.length
    $scope.watchingLength = $scope.user.watchingAnime.length
    console.log($scope.user.reviews)
    $http.post('/users/reviews', $scope.user.reviews).success(function(reviews) {
      console.log(reviews)
      $scope.reviews = reviews
      $scope.reviews.forEach(function(a) {
        $http.get('/users/anime/' + a.showId).success(function(anime) {
          a.showTitle = anime.title
        })
      })
    })
    $scope.user.friendIds.forEach(function(e) {
      $http.get('/users/' + e.friendId).success(function(friend) {
        e.username = friend.username
        $scope.user.friendList.push(e)
      })
    })

  });
  $scope.completedAnime = function() {
    $state.go('myComplete')
  }
  $scope.willWatchAnime = function() {
    $state.go('willWatch')
  }
  $scope.favoritedAnime = function() {
    $state.go('favorited')
  }
  $scope.watchingAnime = function() {
    $state.go('watching')
  }
  $scope.accept=function(friend) {
    $http.post('/users/acceptfriend/' + friend.friendId).success(function(success) {
      swal("Congrats", "You have Accepted " + friend.username + "\'s friend request", "success");
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
            $scope.user.friendList.push(e)
          })
        })
      });
    })
  }
  $scope.avatar = [];
  $scope.processFiles = function(files){
    angular.forEach(files, function(flowFile, i){
       var fileReader = new FileReader();
          fileReader.onload = function (event) {
            var uri = event.target.result;
              $scope.avatar[0] = uri;
              console.log($scope.avatar)
          };
          fileReader.readAsDataURL(flowFile.file);
    });
  };
  $scope.uploadImage = function() {
    $http.post('/users/newavatar', $scope.avatar).success(function(user) {
      $scope.user.avatar = user.avatar
      $scope.avatar = [];
    })
  }
  $scope.hideFriends = function() {
    console.log(this)
  }
  $scope.hidePending = function() {
    console.log(this)
  }
  $scope.toUser = function(friend) {
    $state.go('user', {userId: friend.friendId})
  }
  $scope.showOneAnime = function(review) {
    $state.go('anime', {animename: review.showTitle});
  };

});
