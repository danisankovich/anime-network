app.controller('animeCtrl', function($scope, $state, $http, animeService, userService, $rootScope){

  animeService.getOneAnime().success(function(anime) {
    $scope.anime = anime;
    $http.get( "/reviews/" + anime._id).success(function(reviews){
      $http.get("/showforum/" + anime._id).success(function(forum) {
        $scope.forum = forum
      })
      $scope.reviews = reviews;
      $scope.reviews.forEach(function(e) {
        if(e.body.length > 300) {
          e.subbody = e.body.substring(0, 300) + "....."
        }
        else {
          e.subbody = e.body
        }
        $http.get( "/users/" + e.user).success(function(user){
          e.user = user;
        })
      })
    })
  });
  $scope.genres = function() {
    console.log('es');
    $http.get( '/genres').success(function(episodes) {
      console.log(episodes);
    });
  };

  $scope.like = animeService.likeAnime;
  $scope.likeAnime = function(anime) {
    if($rootScope.currentUser.likes.indexOf(anime._id) === -1) {
      $scope.like().success(function(anime) {
        sweetAlert("Done", "You have Liked " + anime.title, "success");
        userService.getCurrentUser().success(function(data) {
          $rootScope.currentUser = data;
        });
      });
    }
  };

  $scope.completeAnime = animeService.completeAnime;
  $scope.addToCompleted = function(anime) {
    var myWatching = []
    var myWillWatch = []
    $rootScope.currentUser.watchingAnime.forEach(function(a) {
      myWatching.push(a.animeId)
    })
    $rootScope.currentUser.willWatch.forEach(function(w) {
      myWillWatch.push(w)
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
          $http.post( '/users/transtocompleted', $scope.a).success(function(anime) {
            sweetAlert("Done", "You have added  " + anime.title + " to your completed list", "success");
            animeService.getOneAnime().success(function(anime) {
              $scope.anime = anime;
              $http.get( "/reviews/" + anime._id).success(function(reviews){
                $scope.reviews = reviews;
                $scope.reviews.forEach(function(e) {
                  if(e.body.length > 300) {
                    e.subbody = e.body.substring(0, 300) + "....."
                  }
                  else {
                    e.subbody = e.body
                  }
                  $http.get( "/users/" + e.user).success(function(user){
                    e.user = user;
                  })
                })
              })
            });
            userService.getCurrentUser().success(function(data) {
              $rootScope.currentUser = data;
            });
          })
        } else {
          swal("Cancelled", "OK. Nothing Will Change", "error");
        }
      });
    }


    if(myWillWatch.indexOf(anime._id) > -1){
      var idx = myWillWatch.indexOf(anime._id)
      swal({
        title: "Are you sure?",
        text: "This Anime is currently in your Will Watch section. Would you like to move it to your Completed Anime section?",
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
          $http.post( '/users/transfromtowatch/' + anime._id).success(function(anime) {
            sweetAlert("Done", "You have added  " + anime.title + " to your completed list", "success");
            animeService.getOneAnime().success(function(anime) {
              $scope.anime = anime;
              $http.get( "/reviews/" + anime._id).success(function(reviews){
                $scope.reviews = reviews;
                $scope.reviews.forEach(function(e) {
                  if(e.body.length > 300) {
                    e.subbody = e.body.substring(0, 300) + "....."
                  }
                  else {
                    e.subbody = e.body
                  }
                  $http.get( "/users/" + e.user).success(function(user){
                    e.user = user;
                  })
                })
              })
            });
            userService.getCurrentUser().success(function(data) {
              $rootScope.currentUser = data;
            });
          })
        } else {
          swal("Cancelled", "OK. Nothing Will Change", "error");
        }
      });
    }
    if($rootScope.currentUser.completedAnime.indexOf(anime._id) === -1 && myWatching.indexOf(anime._id) === -1 && myWillWatch.indexOf(anime._id) === -1) {
      $scope.completeAnime().success(function(anime) {
        sweetAlert("Done", "You have added  " + anime.title + " to your completed list", "success");
        userService.getCurrentUser().success(function(data) {
          $rootScope.currentUser = data;
        });
      });
    };
  };
  $scope.watchingAnime = animeService.watchingAnime;
  $scope.addToWatching = function(anime) {
    var myWatching = []
    $rootScope.currentUser.watchingAnime.forEach(function(a) {
      myWatching.push(a.animeId)
    })
    if(myWatching.indexOf(anime._id) === -1 && $rootScope.currentUser.completedAnime.indexOf(anime._id) === -1) {
      if($rootScope.currentUser.willWatch.indexOf(anime._id) > -1) {
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
          $http.post( '/users/transtowatching/' + $scope.anime._id).success(function(anime) {
            animeService.getOneAnime().success(function(anime) {
              $scope.anime = anime;
              $http.get( "/reviews/" + anime._id).success(function(reviews){
                $scope.reviews = reviews;
                $scope.reviews.forEach(function(e) {
                  if(e.body.length > 300) {
                    e.subbody = e.body.substring(0, 300) + "....."
                  }
                  else {
                    e.subbody = e.body
                  }
                  $http.get( "/users/" + e.user).success(function(user){
                    e.user = user;
                  })
                })
              })
            });
            userService.getCurrentUser().success(function(data) {
              $rootScope.currentUser = data;
            });
            sweetAlert("Done", "Success", "success");
          });
        })
      }
      else {
        $scope.watchingAnime().success(function(anime) {
          sweetAlert("Done", "You have added " + anime.title + " to your watching list", "success");
          userService.getCurrentUser().success(function(data) {
            $rootScope.currentUser = data;
          });
        });
      }
    }
  }
  $scope.willWatch = animeService.willWatch;
  $scope.addToWillWatch = function(anime) {
    if($rootScope.currentUser.willWatch.indexOf(anime._id) === -1
    && $scope.anime.usersWatching.indexOf($rootScope.currentUser._id) === -1
    && $rootScope.currentUser.completedAnime.indexOf(anime._id) === -1) {
      $scope.willWatch().success(function() {
        sweetAlert("Done", "You have added this to your will watch list", "success");
        userService.getCurrentUser().success(function(data) {
          $rootScope.currentUser = data;
        });
      });
    }
  };
  $scope.writeReview = function(review) {
    review.show = $scope.anime._id;
    review.user = $rootScope.currentUser._id;
    var reviewIds = $scope.reviews.map(function(r) {
      return r.user._id
    })
    console.log(reviewIds)
    if(reviewIds.indexOf($rootScope.currentUser._id) === -1) {
      $http.post( "/animereview/" + $scope.anime._id, review).success(function(response) {
        animeService.getOneAnime().success(function(anime) {
          $scope.anime = anime;
          $http.get( "/reviews/" + anime._id).success(function(reviews){
            $scope.reviews = reviews;
            $scope.reviews.forEach(function(e) {
              if(e.body.length > 300) {
                e.subbody = e.body.substring(0, 300) + "....."
              }
              else {
                e.subbody = e.body
              }
              $http.get( "/users/" + e.user).success(function(user){
                e.user = user;
              })
            })
          })
        });
        userService.getCurrentUser().success(function(data) {
          $rootScope.currentUser = data;
        });
        sweetAlert("Done", "Your Review Has been submitted", "success");
        $('#reviewModal').foundation('reveal', 'close');
      })
    }
    else {
      sweetAlert("Hold it!", "You Have Already submitted a review", "error");
    }
  }
  $scope.rateAnime = function(rating) {
    var ratingIds = $scope.anime.ratings.map(function(r) {
      return r.user
    })
    console.log(ratingIds)
    if(ratingIds.indexOf($rootScope.currentUser._id) === -1) {
      var ratingObject = {}
      ratingObject.rating = rating
      ratingObject.anime = $scope.anime._id
      $http.post( '/ratings', ratingObject).success(function(anime) {
        sweetAlert("Success!", "You Have Submitted A Review", "success");
        $scope.anime = anime
      })
    }
    sweetAlert("Hold it!", "You Have Already submitted a rating", "error");
  }
  $scope.toForum = function(anime) {
    $state.go('forum', {animeId: anime._id})
  }
  $scope.toUser = function(review) {
    $state.go('user', {userId: review.user._id})
  }
});
