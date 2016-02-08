app.controller('willwatchCtrl', function($scope, $state, $http, $rootScope, animeService, userService){

  userService.getCurrentUser().success(function(data) {
    $scope.willWatchAnime = [];
    var check = []
    $scope.user = data;
    data.willWatch.forEach(function(e) {
      if(check.indexOf(e) === -1) {
        check.push(e)
        $http.get('/myanimelists/' + e).success(function(anime) {
          anime.myRating = 'N/A'
          anime.avgRating = 0;
          anime.ratings.forEach(function(a){
            anime.avgRating += a.rating/(anime.ratings.length)
          })
          if(anime.avgRating === 0) {
            anime.avgRating = 'N/A'
          }
          else {
            anime.avgRating = Math.round(anime.avgRating * 10)/10 + '/10'
          }
          $scope.willWatchAnime.push(anime)
        });
      }
    })
  });
  $scope.showOne = function(anime) {
    $state.go('anime', {animename: anime.title})
  }
});
