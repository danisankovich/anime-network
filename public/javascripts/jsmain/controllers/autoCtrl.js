app.controller('autoCtrl', function($scope, $state, $http, $rootScope, $location){
  $(document).ready(function() {
    // $scope.whichUrl = 'http://localhost:4000';
    $scope.whichUrl = 'https://animenetwork.herokuapp.com';
    var availableTags = [];
    $http.get($scope.whichUrl + '/anime').success(function(anime) {
      anime.forEach(function(e) {
        if (e.title !== undefined) {
          availableTags.push(e.title);
        }
      });
    });
    $( "#tags" ).autocomplete({
      minLength:2,
      source: availableTags,
      select: function(event, ui) {
        $(this).val(ui.item.value);
        $scope.anime = $(this).val();
      }
    });

  $scope.searchAnime = function() {
    anime = document.getElementById('tags').value;
    $state.go('anime', {animename: anime});
    document.getElementById('tags').value = '';
  };

  $http.get($scope.whichUrl + '/user').success(function(user) {
    if(user) {
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
    $rootScope.searchGenres = [];
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
