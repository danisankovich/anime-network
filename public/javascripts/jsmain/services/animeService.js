app.service('animeService', function($http, $state) {
  var whichUrl = 'http://localhost:4000';
  // var whichUrl = 'https://animenetwork.herokuapp.com';
  this.getCurrentAnime = function() {
    return $http.post(whichUrl + '/animelist/' + $state.params.animename).success(function(anime) {
      return anime;
    });
  };
  this.showOneAnime = function() {
    console.log(this.a.title);
    $state.go('anime', {animename: this.a.title});
  };
});
