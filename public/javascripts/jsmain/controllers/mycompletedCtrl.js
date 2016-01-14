app.controller('mycompletedCtrl', function($scope, $state, $http, $rootScope, animeService, userService){
  $scope.whichUrl = 'http://localhost:4000';
    // $scope.whichUrl = 'https://animenetwork.herokuapp.com';
  userService.getCurrentUser().success(function(data) {
    $scope.completedAnime = [];
    var check = []
    $scope.user = data;
    data.completedAnime.forEach(function(e) {
      if(check.indexOf(e) === -1) {
        check.push(e)
        $http.get($scope.whichUrl + '/myanimelists/' + e).success(function(anime) {
          $scope.completedAnime.push(anime)
          console.log(anime)
        });
      }
    })
  });
});
