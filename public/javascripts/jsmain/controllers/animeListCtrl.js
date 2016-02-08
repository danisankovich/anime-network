app.controller('animeListCtrl', function($scope, $state, $http, $rootScope, animeService){

  animeService.getCurrentAnime().success(function(anime) {
      if(anime.length === 1) {
        $state.go('anime', {animename: $state.params.animename});
      }
      else {
        $scope.anime = anime;
      }
    });
  $scope.toShow = animeService.showOneAnime;
});
