app.controller('mycompletedCtrl', function($scope, $state, $http, $rootScope, animeService, userService){
  animeService.myCompleted().success(function(data) {
    $scope.user = data
  })
  $scope.showOne = function(anime) {
    $state.go('anime', {animename: anime.title})
  }
});
