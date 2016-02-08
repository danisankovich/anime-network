app.controller('userCtrl', function($scope, $state, $http, $rootScope, userService){

  userService.getCurrentUser().success(function(data) {
    $scope.user = data;
  });
  $http.get('/users/' + $state.params.userId).success(function(person) {
    $scope.person = person
    console.log($scope.person)
  })
  $scope.addFriend = function(person) {
    // console.log(this)
    var found = person.friendIds.some(function (el) {
      return el.friendId === $scope.user._id;
    });
    if(found === false) {
      $http.post('/friendrequest/' + person._id).success(function(success) {
        console.log(success)
      })
    }
  }
});
