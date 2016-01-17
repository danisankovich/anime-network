app.controller('animeCtrl', function($scope, $state, $http, animeService, userService){
  $scope.whichUrl = 'http://localhost:4000';
  // $scope.whichUrl = 'http://animenetwork.herokuapp.com';

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
        confirmButtonText: "Yes, Move It!",
        cancelButtonText: "No, cancel plx!",
        closeOnConfirm: true,
        closeOnCancel: true
      }, function(isConfirm){
        if (isConfirm) {
          $scope.a = {anime: anime, a: 'message'}
          $http.post($scope.whichUrl + '/transtocompleted', $scope.a).success(function(anime) {
            sweetAlert("Done", "You have added  " + anime.title + " to your completed list", "success");
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
            userService.getCurrentUser().success(function(data) {
              $scope.user = data;
            });
          })
        } else {
          swal("Cancelled", "OK. Nothing Will Change", "error");
        }
      });
    }
    if($scope.user.completedAnime.indexOf(anime._id) === -1 && myWatching.indexOf(anime._id) === -1) {
      $scope.completeAnime().success(function(anime) {
        sweetAlert("Done", "You have added  " + anime.title + " to your completed list", "success");
        userService.getCurrentUser().success(function(data) {
          $scope.user = data;
        });
      });
    };
  };
  $scope.watchingAnime = animeService.watchingAnime;
  $scope.addToWatching = function(anime) {
    var myWatching = []
    $scope.user.watchingAnime.forEach(function(a) {
      myWatching.push(a.animeId)
    })
    if(myWatching.indexOf(anime._id) === -1 && $scope.user.completedAnime.indexOf(anime._id) === -1) {
      if($scope.user.willWatch.indexOf(anime._id) > -1) {
        swal({
          title: "Are you sure?",
          text: "This Anime is currently in your Will Watch section. Would you like to move it to your Currently Watching Anime section?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes, Move It!",
          cancelButtonText: "No, cancel plx!",
          closeOnConfirm: true,
          closeOnCancel: true
        }, function(isConfirm){
          $http.post($scope.whichUrl + '/transtowatching/' + $scope.anime._id).success(function(anime) {
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
            userService.getCurrentUser().success(function(data) {
              $scope.user = data;
            });
            sweetAlert("Done", "Success", "success");
          });
        })
      }
      else {
        $scope.watchingAnime().success(function(anime) {
          sweetAlert("Done", "You have added " + anime.title + " to your watching list", "success");
          userService.getCurrentUser().success(function(data) {
            $scope.user = data;
          });
        });
      }
    }
  }
  $scope.willWatch = animeService.willWatch;
  $scope.addToWillWatch = function(anime) {
    if($scope.user.willWatch.indexOf(anime._id) === -1 && $scope.anime.usersWatching.indexOf($scope.user._id) === -1 && $scope.anime.usersCompleted.indexOf($scope.user._id) === -1) {
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
    var reviewIds = $scope.reviews.map(function(r) {
      return r.user._id
    })
    console.log(reviewIds)
    if(reviewIds.indexOf($scope.user._id) === -1) {
      $http.post($scope.whichUrl + "/animereview/" + $scope.anime._id, review).success(function(response) {
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
        userService.getCurrentUser().success(function(data) {
          $scope.user = data;
        });
        sweetAlert("Done", "Your Review Has been submitted", "success");
        $('#reviewModal').foundation('reveal', 'close');
      })
    }
    else {
      sweetAlert("Hold it!", "You Have Already submitted a review", "error");

    }
  }

});
