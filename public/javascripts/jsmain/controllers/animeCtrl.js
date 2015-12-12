app.controller('animeCtrl', function($scope, $state, $http, animeService){
  $scope.whichUrl = 'http://localhost:4000';
  // $scope.whichUrl = 'https://animenetwork.herokuapp.com';
  animeService.getOneAnime().success(function(anime) {
    $scope.anime = anime;
  });
  $scope.genres = function() {
    console.log('es');
    $http.get($scope.whichUrl + '/genres').success(function(episodes) {
      console.log(episodes);
    });
  };
  $scope.favoriteThis = function(show) {
    console.log(show);
  };
  $scope.like = animeService.likeAnime;
  $scope.likeAnime = function() {
    $scope.like().success(function(anime) {
      sweetAlert("Done", "You have Liked " + anime.title, "success");
    });
  };
  $scope.completeAnime = animeService.completeAnime;
  $scope.addToCompleted = function() {
    $scope.completeAnime().success(function(anime) {
      sweetAlert("Done", "You have added  " + anime.title + " to your completed list", "success");
    });
  };
  $scope.watchingAnime = animeService.watchingAnime;
  $scope.addToWatching = function() {
    $scope.watchingAnime().success(function(anime) {
      sweetAlert("Done", "You have added " + anime.title + " to your watching list", "success");
    });
  };
  $scope.willWatch = animeService.willWatch;
  $scope.addToWillWatch = function() {
    $scope.willWatch().success(function() {
      sweetAlert("Done", "You have added this to your will watch list", "success");
    });
  };

});
