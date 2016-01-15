app.controller('animeCtrl', function($scope, $state, $http, animeService, userService){
  // $scope.whichUrl = 'http://localhost:4000';
  $scope.whichUrl = 'http://animenetwork.herokuapp.com';

  userService.getCurrentUser().success(function(data) {
    $scope.user = data;
  });

  animeService.getOneAnime().success(function(anime) {
    $scope.anime = anime;
    $http.get($scope.whichUrl + "/reviews/" + anime._id).success(function(reviews){
      $scope.reviews = reviews;
      $scope.reviews.forEach(function(e) {
        if(e.body.length > 300) {
          e.subbody = e.body.substring(0, 300) + "....."
        }
        else {
          e.subbody = e.body
        }
        $http.get($scope.whichUrl + "/user/" + e.user).success(function(user){
          e.user = user;
        })
      })
    })
  });
  $scope.genres = function() {
    console.log('es');
    $http.get($scope.whichUrl + '/genres').success(function(episodes) {
      console.log(episodes);
    });
  };

  $scope.like = animeService.likeAnime;
  $scope.likeAnime = function(anime) {
    if($scope.user.likes.indexOf(anime._id) === -1) {
      $scope.like().success(function(anime) {
        sweetAlert("Done", "You have Liked " + anime.title, "success");
        userService.getCurrentUser().success(function(data) {
          $scope.user = data;
        });
      });
    }
  };
  $scope.completeAnime = animeService.completeAnime;
  $scope.addToCompleted = function(anime) {
    var myWatching = []
    $scope.user.watchingAnime.forEach(function(a) {
      myWatching.push(a.animeId)
    })
    if(myWatching.indexOf(anime._id) > -1){
      var idx = myWatching.indexOf(anime._id)
      swal({
        title: "Are you sure?",
        text: "This Anime is currently in your Currently Watching section. Would you like to move it to your Completed Anime section?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel plx!",
        closeOnConfirm: false,
        closeOnCancel: false
      }, function(isConfirm){
        if (isConfirm) {
          //here you will splice that title
          // $scope.completeAnime().success(function(anime) {
          //   sweetAlert("Done", "You have added  " + anime.title + " to your completed list", "success");
          //   userService.getCurrentUser().success(function(data) {
          //     $scope.user = data;
          //   });
          // });
          $scope.a = {anime: anime, a: 'message'}
          $http.post($scope.whichUrl + '/transtocompleted', $scope.a).success(function(anime) {
            console.log(anime)
          })
        } else {
          swal("Cancelled", "OK. Nothing Will Change", "error");
        }
      });
    }
    // if($scope.user.completedAnime.indexOf(anime._id) === -1) {
    //   $scope.completeAnime().success(function(anime) {
    //     sweetAlert("Done", "You have added  " + anime.title + " to your completed list", "success");
    //     userService.getCurrentUser().success(function(data) {
    //       $scope.user = data;
    //     });
    //   });
    // };
  };
  $scope.watchingAnime = animeService.watchingAnime;
  $scope.addToWatching = function(anime) {
    var myWatching = []
    $scope.user.watchingAnime.forEach(function(a) {
      myWatching.push(a.animeId)
    })
    if(myWatching.indexOf(anime._id) === -1) {
      $scope.watchingAnime().success(function(anime) {
        sweetAlert("Done", "You have added " + anime.title + " to your watching list", "success");
        userService.getCurrentUser().success(function(data) {
          $scope.user = data;
        });
      });
    }
  };
  $scope.willWatch = animeService.willWatch;
  $scope.addToWillWatch = function(anime) {
    if($scope.user.willWatch.indexOf(anime._id) === -1) {
      $scope.willWatch().success(function() {
        sweetAlert("Done", "You have added this to your will watch list", "success");
        userService.getCurrentUser().success(function(data) {
          $scope.user = data;
        });
      });
    }
  };
  $scope.writeReview = function(review) {
    review.show = $scope.anime._id;
    review.user = $scope.user._id;
    $http.post($scope.whichUrl + "/animereview/" + $scope.anime._id, review).success(function(response) {
      console.log(response)
    })
  }

});
