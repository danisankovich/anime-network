app.controller('animeCtrl', function($scope, $state, $http){
  $scope.whichUrl = 'http://localhost:4000';
  // $scope.whichUrl = 'https://animenetwork.herokuapp.com';
  console.log($state.params.animename);
  $http.get($scope.whichUrl + '/animesearch/' + $state.params.animename).success(function(anime) {
    console.log(anime);
    $scope.anime = anime;
  });
  $scope.genres = function() {
    console.log('es');
    $http.get($scope.whichUrl + '/genres').success(function(episodes) {
      console.log(episodes);
    });
  };
});
