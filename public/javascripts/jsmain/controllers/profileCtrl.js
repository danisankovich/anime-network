app.controller('profileCtrl', function($scope, $state, $http, $rootScope){
  $scope.whichUrl = 'http://localhost:4000';
  // $scope.whichUrl = 'https://animenetwork.herokuapp.com';
  $http.get($scope.whichUrl + "/user").success(function(user) {
    $scope.user = user;
  });
});
