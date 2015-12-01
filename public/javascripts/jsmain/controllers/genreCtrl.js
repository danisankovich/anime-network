app.controller('genreCtrl', function($scope, $state, $http, $rootScope){
  $scope.search = $rootScope.searchGenres;
  $http.post('http://localhost:4000/genres', $scope.search).success(function(anime) {
    $scope.anime = anime;
    console.log(anime);
    $rootScope.searchGenres = [];
  });
});
