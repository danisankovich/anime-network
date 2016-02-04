app.controller('myWatchingCtrl', function($scope, $state, $http, $rootScope, animeService, userService){
  // $scope.whichUrl = 'http://localhost:4000';
    // $scope.whichUrl = 'https://animenetwork.herokuapp.com';
  userService.getCurrentUser().success(function(data) {
    $scope.watchingAnime = [];
    var check = []
    $scope.user = data;
    data.watchingAnime.forEach(function(e) {
      if(check.indexOf(e) === -1) {
        check.push(e)
        $http.get('/myanimelists/' + e.animeId).success(function(anime) {
          anime.episodesWatched = e.episodesWatched
          anime.avgRating = 0;
          if (anime.ratings) {
            anime.ratings.forEach(function(a){
              if(a.user === data._id) {
                anime.myRating = a.rating + "/10"
                anime.avgRating += a.rating/(anime.ratings.length)
              }
              else {
                anime.avgRating += a.rating/(anime.ratings.length)
              }
            })
            if(anime.avgRating === 0) {
              anime.avgRating = 'N/A'
            }
            else {
              anime.avgRating = Math.round(anime.avgRating * 10)/10 + '/10'
            }
            $scope.watchingAnime.push(anime)
          }
        });
      }
    })
  });
  $scope.showOne = function(anime) {
    $state.go('anime', {animename: anime.title})
  }
});
