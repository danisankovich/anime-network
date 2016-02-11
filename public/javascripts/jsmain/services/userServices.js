app.service('userService', function($http) {

  this.getCurrentUser = function() {
    return $http.get('/users').success(function(user) {
      if(user.username) { return user; }
      else { return; }
    });
  };
});
