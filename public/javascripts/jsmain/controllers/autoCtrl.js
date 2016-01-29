app.controller('autoCtrl', function($scope, $state, $http, $rootScope, $location, userService){
  $(document).ready(function() {
    $scope.whichUrl = 'http://localhost:4000';
    // $scope.whichUrl = 'https://animenetwork.herokuapp.com';

    $scope.hideGenre = false;
    var availableTags = [];
    userService.getCurrentUser().success(function(data) {
      $rootScope.currentUser = data;
      $rootScope.currentUser.friendList = [];
      $rootScope.currentUser.friendIds.forEach(function(e) {
        $http.get('/user/' + e.friendId).success(function(friend) {
          e.username = friend.username
          $rootScope.currentUser.friendList.push(e)
        })
      })
    });

    $('input').keyup(debounce(function(){
        $scope.n = $(".autocomplete").val();
        $http.post($scope.whichUrl + '/anime/' + $scope.n).success(function(anime) {
          anime.forEach(function(e) {
            if(e.title !== undefined && availableTags.indexOf(e.title) === -1) {
              availableTags.push(e.title);
            }
          });
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
      source: availableTags,
      select: function(event, ui) {
        $(this).val(ui.item.value);
        $scope.anime = $(this).val();
      }
    });
  $scope.searchAnime = function() {
    anime = document.getElementById('tags').value;
    $state.go('animelist', {animename: anime});
    document.getElementById('tags').value = '';
  };
  $(function(){
    var max = 4;
    var checkboxes = $('input[type="checkbox"]');
    checkboxes.change(function(){
      var current = checkboxes.filter(':checked').length;
      checkboxes.filter(':not(:checked)').prop('disabled', current >= max);
    });
  });
  $scope.genres = function(genre) {
    $rootScope.searchGenres = [];
    for(var key in genre) {
      if (genre[key] === true) {
        if(key === 'GenderBender') {
          $rootScope.searchGenres.push('Gender Bender');
        }
        else if(key === 'MahouShoujo') {
          $rootScope.searchGenres.push('Mahou Shoujo');
        }
        else if(key === 'MartialArts') {
          $rootScope.searchGenres.push('Martial Arts');
        }
        else if(key === 'SciFi') {
          $rootScope.searchGenres.push('Sci-Fi');
        }
        else if(key === 'ShounenAi') {
          $rootScope.searchGenres.push('Shounen Ai');
        }
        else if(key === 'MahouShounen') {
          $rootScope.searchGenres.push('Mahou Shounen');
        }
        else if(key === 'ShoujoAi') {
          $rootScope.searchGenres.push('Shoujo Ai');
        }
        else if(key === 'SliceofLife') {
          $rootScope.searchGenres.push('Slice of Life');
        }
        else if(key === 'SuperPower') {
          $rootScope.searchGenres.push('Super Power');
        }
        else {
          $rootScope.searchGenres.push(key);
        }
      }
    }
    $('#myModal').foundation('reveal', 'close');
      if ($location.$$path !== "/animegenre") { $state.go('animegenre'); }
      else { $state.go($state.current, {}, {reload: true}); }
    };
  });
  $scope.mailModal = function() {
    $('#mailModal').foundation('reveal', 'open');
  }
  $scope.message=function(newmessage) {
    console.log(newmessage)
  }
});
