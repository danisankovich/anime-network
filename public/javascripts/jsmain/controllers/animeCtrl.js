app.controller('animeCtrl', function($scope, $state, $http){
  console.log($state.params.animename);
  $http.get('http://localhost:4000/animesearch/' + $state.params.animename).success(function(anime) {
    console.log(anime);
    $scope.anime = anime;
  });
  $scope.genres = function() {
    console.log('es');
    $http.get('http://localhost:4000/genres').success(function(episodes) {
      console.log(episodes);
    });
  };  
});
