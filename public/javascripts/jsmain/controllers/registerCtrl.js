app.controller('registerCtrl', function($scope, $state, $http){
    // $scope.whichUrl = 'http://localhost:4000';
    $scope.whichUrl = 'http://animenetwork.herokuapp.com';
  $scope.register = function(newUser) {
    $scope.newUser = newUser;
    $http.post($scope.whichUrl + '/register', $scope.newUser).success(function(err, data) {
      if(err.hasOwnProperty('name') === true) {
        sweetAlert("Uh Oh  ", err.message, "error");
        return;
      }
      else if(err.hasOwnProperty('errmsg')) {
        console.log(err);
        sweetAlert("Uh Oh ", newUser.email + " is already registered", "error");
        return;
      }
      else {
        $scope.user = $scope.newUser;
        $state.go('/').then(function() {
          location.reload();
        });
      }
    });
  };
});
