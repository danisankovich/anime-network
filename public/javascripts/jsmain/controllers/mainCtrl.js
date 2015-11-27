app.controller('mainCtrl', function($scope, $state, $http){
  // $http.get('http://localhost:4000/user').success(function(user) {
  //   if(user) {
  //     console.log("user", user);
  //     $scope.currentUser = user.username;
  //   }
  // });

  // var unirest = require('unirest');
  $scope.searchAnime = function(anime) {
    // anime = anime.toLowerCase().split(' ').join("-");
    // console.log(anime);
    // // $http.get('https://hummingbird.me/api/v1/anime/' + anime).success(function(anime) {
    // //   $scope.anime = anime;
    // //   console.log($scope.anime.title);
    // // });
    // unirest.get("https://hummingbirdv1.p.mashape.com/anime/steins-gate")
    // .header("X-Mashape-Key", "fL30UnxVmgmsh80IDMvD28obwFSup1Fv6mNjsnjhuV3M9VbB2R")
    // .header("Accept", "application/json")
    // .end(function (result) {
    //   console.log(result.status, result.headers, result.body);
    // });
    console.log('okay');
    // $http.get("http://localhost:4000/anime").success(function() {
    $http.get("https://animenetwork.herokuapp.com/anime").success(function() {
      console.log("yes");
    });
  };

  $scope.register = function(newUser) {
    $scope.newUser = newUser;
    $http.post('http://localhost:4000/register', $scope.newUser).success(function(err, data) {
      if(err.hasOwnProperty('name') === true) {
        sweetAlert("Uh Oh  ", err.message, "error");
        return;
      }
      else if(err.hasOwnProperty('errmsg')) {
        console.log(err);
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
