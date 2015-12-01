app.controller('autoCtrl', function($scope, $state, $http, $rootScope, $location){
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
        $scope.anime = $(this).val();
        console.log($scope.anime);

      }
    });

  $scope.searchAnime = function() {
    anime = document.getElementById('tags').value;
    // console.log(this);
    $state.go('anime', {animename: anime});
  };

  $http.get('http://localhost:4000/user').success(function(user) {
    if(user) {
      console.log("user", user);
      $scope.currentUser = user.username;
    }
  });

  jQuery(function(){
    var max = 4;
    var checkboxes = $('input[type="checkbox"]');

    checkboxes.change(function(){
        var current = checkboxes.filter(':checked').length;
        checkboxes.filter(':not(:checked)').prop('disabled', current >= max);
    });
  });
  $scope.hideGenre = false;
  $scope.genres = function(genre) {
    console.log($location.$$path === "/animegenre");
    $rootScope.searchGenres = [];
    console.log('itworked');
    for(var key in genre) {
      if (genre[key] === true) {
        $rootScope.searchGenres.push(key);
      }
    }
    $('#myModal').foundation('reveal', 'close');
    if ($location.$$path !== "/animegenre") {
      $state.go('animegenre');
    }
    else {
      $state.go($state.current, {}, {reload: true});
    }
  };
  // $scope.showGenre = function() {
  //   $scope.hideGenre = ($scope.hideGenre === true) ? false : true;
  //   return $scope.hideGenre;
  // };

  });
});
