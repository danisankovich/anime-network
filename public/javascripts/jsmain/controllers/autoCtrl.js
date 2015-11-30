app.controller('autoCtrl', function($scope, $state, $http){
  // $(document).ready(function() {
  //   console.log('yes');
  //   var availableTags = [];
  //   $http.get('http://localhost:4000/anime').success(function(anime) {
  //     anime.forEach(function(e) {
  //       if(e.title !== undefined) {
  //         availableTags.push(e.title);
  //       }
  //     });
  //   });
  //   $( "#tags" ).autocomplete({
  //     minLength:2,
  //     source: availableTags
  //   });

  $scope.searchAnime = function(anime) {
    anime = this.anime.toLowerCase().split(" ").join("-");
    $state.go('anime', {animename: anime});
  };
  // });
});
