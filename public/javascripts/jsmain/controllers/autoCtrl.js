app.controller('autoCtrl', function($scope, $state, $http){
  $(document).ready(function() {
    console.log('yes');
    var availableTags = [];
    $http.get('http://localhost:4000/anime').success(function(anime) {
      anime.forEach(function(e) {
        if(e.title !== undefined) {
          availableTags.push(e.title);
        }
      });
    });
    $( "#tags" ).autocomplete({
      minLength:2,
      source: availableTags,
      select: function(event, ui) {
        $(this).val(ui.item.value);
        console.log("hi", $(this).val());
        $scope.anime = $(this).val().toLowerCase().split(" ").join("-");
      }
    });

  $scope.searchAnime = function() {
    anime = $scope.anime;
    // console.log(this);
    $state.go('anime', {animename: anime});
  };
  $http.get('http://localhost:4000/user').success(function(user) {
    if(user) {
      console.log("user", user);
      $scope.currentUser = user.username;
    }
  });
  });

});
