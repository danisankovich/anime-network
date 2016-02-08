app.controller('genreCtrl', function($scope, $state, $http, $rootScope, animeService){

  $scope.search = $rootScope.searchGenres;
  $http.post('/genres', $scope.search).success(function(anime) {
    $scope.anime = anime;
    $rootScope.searchGenres = [];
  });
  $scope.toShow = animeService.showOneAnime;
});
