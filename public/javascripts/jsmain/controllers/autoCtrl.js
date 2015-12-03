app.controller('autoCtrl', function($scope, $state, $http, $rootScope, $location){
  $(document).ready(function() {
    $scope.whichUrl = 'http://localhost:4000';
    // $scope.whichUrl = 'https://animenetwork.herokuapp.com';
    var availableTags = [];

    $('input').keyup(debounce(function(){
        // tempAvailableTags = [];
        // availableTags = [];
        $scope.n = $(".autocomplete").val();
        console.log($scope.n);
        $http.post($scope.whichUrl + '/anime/' + $scope.n).success(function(anime) {
          anime.forEach(function(e) {
            if(e.title !== undefined && availableTags.indexOf(e.title) === -1) {
              availableTags.push(e.title);
            }
          });
        }).then(function() {
          console.log(availableTags);
        });
    },200));
    function debounce(func, wait, immediate) {
    	var timeout;
    	return function() {
    		var context = this, args = arguments;
    		var later = function() {
    			timeout = null;
    			if (!immediate) func.apply(context, args);
    		};
    		var callNow = immediate && !timeout;
    		clearTimeout(timeout);
    		timeout = setTimeout(later, wait);
    		if (callNow) func.apply(context, args);
    	};
    }


    $( "#tags" ).autocomplete({
      // minLength:2,
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
  });
});
