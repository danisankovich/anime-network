app.service('userService', function($http) {
  var whichUrl = 'http://localhost:4000';
  // var whichUrl = 'http://animenetwork.herokuapp.com';

  this.getCurrentUser = function() {
    return $http.get(whichUrl + '/user').success(function(user) {
        if(user) {
          return user;
        }
      });
  };
});
