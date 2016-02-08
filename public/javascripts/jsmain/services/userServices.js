app.service('userService', function($http) {

  this.getCurrentUser = function() {
    return $http.get('/users').success(function(user) {
        if(user) {
          return user;
        }
      }).error(function(err) {
        console.log(err)
      });
  };
});
