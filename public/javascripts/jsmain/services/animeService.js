app.service('animeService', function($http, $state, userService) {

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
  this.myWatching = function() {
    return userService.getCurrentUser().success(function(data) {
      var check = []
      data.mywatchingAnime = [];
      data.watchingAnime.forEach(function(e) {
        if(check.indexOf(e) === -1) {
          check.push(e)
          $http.get('/myanimelists/' + e.animeId).success(function(anime) {
            anime.episodesWatched = e.episodesWatched
            anime.avgRating = 0;
            if (anime.ratings) {
              anime.ratings.forEach(function(a){
                if(a.user === data._id) {
                  anime.myRating = a.rating + "/10"
                  anime.avgRating += a.rating/(anime.ratings.length)
                }
                else {
                  anime.avgRating += a.rating/(anime.ratings.length)
                }
              })
              if(anime.avgRating === 0) {
                anime.avgRating = 'N/A'
              }
              else {
                anime.avgRating = Math.round(anime.avgRating * 10)/10 + '/10'
              }
              data.mywatchingAnime.push(anime)
            }
          });
        }
      })
      return data;
    });
  }

  this.myCompleted = function() {
    return userService.getCurrentUser().success(function(data) {
      var check = []
      data.mycompletedAnime = [];
      data.completedAnime.forEach(function(e) {
        if(check.indexOf(e) === -1) {
          check.push(e)
          $http.get('/myanimelists/' + e).success(function(anime) {
            anime.avgRating = 0;
            if (anime.ratings) {
              anime.ratings.forEach(function(a){
                if(a.user === data._id) {
                  anime.myRating = a.rating + "/10"
                  anime.avgRating += a.rating/(anime.ratings.length)
                }
                else {
                  anime.avgRating += a.rating/(anime.ratings.length)
                }
              })
              if(anime.avgRating === 0) {
                anime.avgRating = 'N/A'
              }
              else {
                anime.avgRating = Math.round(anime.avgRating * 10)/10 + '/10'
              }
              data.mycompletedAnime.push(anime)
            }
          });
        }
      })
      return data;
    });
  }

  this.myFavorited = function() {
    return userService.getCurrentUser().success(function(data) {
      var check = []
      data.favoritedAnime = [];
      data.likes.forEach(function(e) {
        if(check.indexOf(e) === -1) {
          check.push(e)
          $http.get('/myanimelists/' + e).success(function(anime) {
            anime.avgRating = 0;
            if (anime.ratings) {
              anime.ratings.forEach(function(a){
                if(a.user === data._id) {
                  anime.myRating = a.rating + "/10"
                  anime.avgRating += a.rating/(anime.ratings.length)
                }
                else {
                  anime.avgRating += a.rating/(anime.ratings.length)
                }
              })
              if(anime.avgRating === 0) {
                anime.avgRating = 'N/A'
              }
              else {
                anime.avgRating = Math.round(anime.avgRating * 10)/10 + '/10'
              }
              data.favoritedAnime.push(anime)
            }
          });
        }
      })
      return data;
    });
  }

  this.myWillWatch = function() {
    return userService.getCurrentUser().success(function(data) {
      var check = []
      data.willWatchAnime = [];
      data.willWatch.forEach(function(e) {
        if(check.indexOf(e) === -1) {
          check.push(e)
          $http.get('/myanimelists/' + e).success(function(anime) {
            anime.myRating = 'N/A'
            anime.avgRating = 0;
            anime.ratings.forEach(function(a){
              anime.avgRating += a.rating/(anime.ratings.length)
            })
            if(anime.avgRating === 0) {
              anime.avgRating = 'N/A'
            }
            else {
              anime.avgRating = Math.round(anime.avgRating * 10)/10 + '/10'
            }
            data.willWatchAnime.push(anime)
          });
        }
      })
      return data;
    });
  }
});
