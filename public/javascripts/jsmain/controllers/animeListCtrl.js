app.controller('animeListCtrl', function($scope, $state, $http, $rootScope, animeService){
  // $scope.whichUrl = 'http://localhost:4000';

  animeService.getCurrentAnime().success(function(anime) {
      if(anime.length === 1) {
        console.log('hello');
        $state.go('anime', {animename: $state.params.animename});
      }
      else {
        $scope.anime = anime;
        console.log($scope.anime);
      }
    });
  $scope.toShow = animeService.showOneAnime;
});
