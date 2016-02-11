app.controller('myWatchingCtrl', function($scope, $state, $http, $rootScope, animeService, userService){

  animeService.myWatching().success(function(data) {
    $scope.user = data;
  });
  $scope.upOne=function(anime) {
    $scope.user.watchingAnime.forEach(function(e) {
      if(e.animeId === anime._id) {
        e.episodesWatched += 1
        $http.post('/updateuser', $scope.user).success(function(data) {
          animeService.myWatching().success(function(data) {
            $scope.user = data;
          });
        })
      }
    })
  }
  $scope.downOne=function(anime) {
    $scope.user.watchingAnime.forEach(function(e) {
      if(e.animeId === anime._id) {
        e.episodesWatched -= 1
        $http.post('/updateuser', $scope.user).success(function(data) {
          animeService.myWatching().success(function(data) {
            $scope.user = data;
          });
        })
      }
    })
  }
  $scope.showOne = function(anime) {
    $state.go('anime', {animename: anime.title})
  }
});
