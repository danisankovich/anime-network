app.controller('myFavoritedCtrl', function($scope, $state, $http, $rootScope, animeService, userService){

  userService.getCurrentUser().success(function(data) {
    $scope.favoritedAnime = [];
    var check = []
    $scope.user = data;
    data.likes.forEach(function(e) {
      if(check.indexOf(e) === -1) {
        check.push(e)
        $http.get('/myanimelists/' + e).success(function(anime) {
          anime.myRating = 'N/A'
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
            $scope.favoritedAnime.push(anime)
          }
        });
      }
    })
  });
  $scope.showOne = function(anime) {
    $state.go('anime', {animename: anime.title})
  }
});
