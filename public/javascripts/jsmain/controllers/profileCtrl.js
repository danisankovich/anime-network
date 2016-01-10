app.controller('profileCtrl', function($scope, $state, $http, $rootScope, userService){
  $scope.whichUrl = 'http://localhost:4000';
  // // $scope.whichUrl = 'https://animenetwork.herokuapp.com';
  userService.getCurrentUser().success(function(data) {
    $scope.user = data;
  });
});
