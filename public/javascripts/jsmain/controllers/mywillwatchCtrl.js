app.controller('willwatchCtrl', function($scope, $state, $http, $rootScope, animeService, userService){

  animeService.myWillWatch().success(function(data) {
    $scope.user = data
  })
  $scope.showOne = function(anime) {
    $state.go('anime', {animename: anime.title})
  }
});
