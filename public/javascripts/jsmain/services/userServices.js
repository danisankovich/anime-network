app.service('userService', function($http) {
  var whichUrl = 'http://localhost:4000';
  // var whichUrl = 'https://animenetwork.herokuapp.com';

  this.getCurrentUser = function() {
    return $http.get(whichUrl + '/user').success(function(user) {
        if(user) {
          return user;
        }
      });
    // console.log('got it');
  };
});
