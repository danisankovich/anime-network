app.controller('genreCtrl', function($scope, $state, $http, $rootScope){
  $scope.whichUrl = 'http://localhost:4000';
  // $scope.whichUrl = 'https://animenetwork.herokuapp.com';
  $scope.search = $rootScope.searchGenres;
  $http.post($scope.whichUrl + '/genres', $scope.search).success(function(anime) {
    $scope.anime = anime;
    console.log(anime);
    $rootScope.searchGenres = [];
  });
});
