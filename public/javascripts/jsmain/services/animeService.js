app.service('animeService', function($http, $state) {
  // var whichUrl = 'http://localhost:4000';
  var whichUrl = 'http://animenetwork.herokuapp.com';
  this.getCurrentAnime = function() {
    return $http.post(whichUrl + '/animelist/' + $state.params.animename).success(function(anime) {
      return anime;
    });
  };
  this.getOneAnime = function() {
    return $http.get(whichUrl + '/animesearch/' + $state.params.animename).success(function(anime) {
      console.log(anime);
      return anime;
    });
  };
  this.getRandAnime = function() {
    return $http.post(whichUrl + '/').success(function(randAnime) {
      return randAnime;
    });
  };
  this.showOneAnime = function() {
    console.log(this.a.title);
    $state.go('anime', {animename: this.a.title});
  };
  this.showOneRandAnime = function() {
    $state.go('anime', {animename: this.rand.title});
  };
  this.likeAnime = function() {
    return $http.post(whichUrl + '/addLike/' + this.anime._id).success(function(result) {
      return result;
    });
  };
  this.completeAnime = function() {
    return $http.post(whichUrl + '/addToCompleted/' + this.anime._id).success(function(result) {
      return result;
    });
  };
  this.watchingAnime = function() {
    return $http.post(whichUrl + '/addToWatching/' + this.anime._id).success(function(result) {
      return result;
    });
  };
  this.willWatch = function() {
    return $http.post(whichUrl + '/addToWillWatch/' + this.anime._id).success(function(result) {
      return result;
    });
  };
});
