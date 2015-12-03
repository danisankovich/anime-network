app.controller('animeListCtrl', function($scope, $state, $http, $rootScope){
  $scope.whichUrl = 'http://localhost:4000';
  $http.post($scope.whichUrl + '/animelist/' + $state.params.animename).success(function(anime) {
    if(anime.length === 1) {
      console.log('hello');
      $state.go('anime', {animename: $state.params.animename});
    }
    else {
      $scope.anime = anime;
      console.log($scope.anime);
    }
  });
  $scope.toShow = function(show) {
    console.log(this.a.title);
    $state.go('anime', {animename: this.a.title});
  };

});
