app.controller('mainCtrl', function($scope, $state, $http, $rootScope, animeService, userService){
  $scope.results1 = [];

  var init = function() {
    console.log('i fired');
    animeService.getRandAnime().success(function(randAnime) {
      $scope.frontAnime = randAnime;
    }).error(function(err) {
      console.log(err);
    });
  };
  init();
  $scope.toShow = animeService.showOneRandAnime;


  //
  // // var unirest = require('unirest');
  // // $scope.searchAnime = function(anime) {
  // //   anime = anime.toLowerCase().split(' ').join("-");
  // // console.log(anime);
  // // for(var i = 0; i <= 0; i++) {
  // //   $http.get('http://hummingbird.me/api/v1/anime/' + i).then(function(anime) {
  // //     console.log(anime.data);
  // // $http.post('/', anime.data).then(function(err, response){
  // //   console.log("err", err);
  // //   console.log("response", response);
  // // });
  // //       $http.get('https://hummingbird.me/api/v1/anime/1').success(function(anime) {
  // //         $scope.anime = anime;
  // //         console.log($scope.anime);
  // //     });
  // // };

    // for(var i = 11600; i < 11700; i++) {
    // $http.get("https://animenetwork.herokuapp.com/anime").success(function(err, result) {
      // for(var i = 1; i < 11570; i++) {
      // for(var i = 1; i < 4; i++) {
      //   $http.get("/animeget/" + i.toString()).success(function(err, result) {
      //     console.log(result);
      //     console.log(err);
      //   });
      // }
    // });
  //
    // $http.get("/makeforum").success(function(anime) {
    //   console.log(anime)
    // })
    $scope.login = function(user) {
      $http.post('/login', user).success(function(user){
        userService.getCurrentUser().success(function(data) {
          $rootScope.currentUser = data;
          $scope.user = $rootScope.currentUser
          $scope.friendList = [];
          $rootScope.currentUser.friendIds.forEach(function(e) {
            $http.get('/users/' + e.friendId).success(function(friend) {
              e.username = friend.username
              $scope.friendList.push(e)
            })
          })
        });
      })
    }
  $scope.register = function(newUser) {
    $scope.newUser = newUser;
    $http.post('/register', $scope.newUser).success(function(err, data) {
      if(err.hasOwnProperty('name') === true) {
        sweetAlert("Uh Oh  ", err.message, "error");
        return;
      }
      else if(err.hasOwnProperty('errmsg')) {
        sweetAlert("Uh Oh ", newUser.email + " is already registered", "error");
        return;
      }
      else {
        $scope.user = $scope.newUser;
        $state.go('/').then(function() {
          location.reload();
        });
      }
    });
  };
});
