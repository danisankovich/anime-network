app.service('animeService', function($http, $state) {

  this.getCurrentAnime = function() {
    return $http.post('/animelist/' + $state.params.animename).success(function(anime) {
      return anime;
    });
  };
  this.getOneAnime = function() {
    return $http.get('/animesearch/' + $state.params.animename).success(function(anime) {
      return anime;
    });
  };
  this.getRandAnime = function() {
    return $http.post('/').success(function(randAnime) {
      return randAnime;
    });
  };
  this.showOneAnime = function() {
    $state.go('anime', {animename: this.a.title});
  };
  this.showOneRandAnime = function() {
    $state.go('anime', {animename: this.rand.title});
  };
  this.likeAnime = function() {
    return $http.post('/users/addLike/' + this.anime._id).success(function(result) {
      return result;
    });
  };
  this.completeAnime = function() {
    return $http.post('/users/addToCompleted/' + this.anime._id).success(function(result) {
      return result;
    });
  };
  this.watchingAnime = function() {
    return $http.post('/users/addToWatching/' + this.anime._id).success(function(result) {
      return result;
    });
  };
  this.willWatch = function() {
    return $http.post('/users/addToWillWatch/' + this.anime._id).success(function(result) {
      return result;
    });
  };
});
