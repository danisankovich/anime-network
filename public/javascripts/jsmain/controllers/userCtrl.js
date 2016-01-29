app.controller('userCtrl', function($scope, $state, $http, $rootScope, userService){

  userService.getCurrentUser().success(function(data) {
    $scope.user = data;
  });
  $http.get('/user/' + $state.params.userId).success(function(person) {
    $scope.person = person
  })
  $scope.addFriend = function(person) {
    console.log(person)
    var found = person.friendIds.some(function (el) {
      return el.friendId === $scope.user._id;
    });
    if(found === false) {
      $http.post('/friendrequest/' + person._id).success(function(success) {
        console.log(success)
      })
    }
  }

  function checkAndAdd(name) {
  var id = arr.length + 1;
  var found = arr.some(function (el) {
    return el.username === name;
  });
  if (!found) { arr.push({ id: id, username: name }); }
}
});
