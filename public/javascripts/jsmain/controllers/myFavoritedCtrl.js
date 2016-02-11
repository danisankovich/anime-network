app.controller('myFavoritedCtrl', function($scope, $state, $http, $rootScope, animeService, userService){

  animeService.myFavorited().success(function(data) {
    $scope.user = data
  })

  $scope.showOne = function(anime) {
    $state.go('anime', {animename: anime.title})
  }
});
