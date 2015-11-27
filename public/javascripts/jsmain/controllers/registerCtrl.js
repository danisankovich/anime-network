app.controller('registerCtrl', function($scope, $state, $http){
  $http.get('http://localhost:4000/user').success(function(user) {
    if(user) {
      console.log("use", user);
      $scope.currentUser = user.username;
    }
  });
  $scope.register = function(newUser) {
    $scope.newUser = newUser;
    $http.post('http://localhost:4000/register', $scope.newUser).success(function(err, data) {
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
