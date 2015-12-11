app.controller('animeCtrl', function($scope, $state, $http, animeService){
  $scope.whichUrl = 'http://localhost:4000';
  // $scope.whichUrl = 'https://animenetwork.herokuapp.com';
  animeService.getOneAnime().success(function(anime) {
    $scope.anime = anime;
  });
  $scope.genres = function() {
    console.log('es');
    $http.get($scope.whichUrl + '/genres').success(function(episodes) {
      console.log(episodes);
    });
  };
  $scope.favoriteThis = function(show) {
    console.log(show);
  };
});
