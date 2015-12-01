app.controller('mainCtrl', function($scope, $state, $http){
  $scope.results1 = [];
  // $scope.whichUrl = 'http://localhost:4000';
  $scope.whichUrl = 'https://animenetwork.herokuapp.com';


  $http.get($scope.whichUrl + '/user').success(function(err, user) {
      $scope.currentUser = user.username;
    }).error(function(err) {
      // console.log('error', err);
      // $state.go('login2');
    });



  // var unirest = require('unirest');
  // $scope.searchAnime = function(anime) {
  //   anime = anime.toLowerCase().split(' ').join("-");
    // console.log(anime);
    // for(var i = 0; i <= 0; i++) {
    //   $http.get('http://hummingbird.me/api/v1/anime/' + i).then(function(anime) {
    //     console.log(anime.data);
        // $http.post($scope.whichUrl + '/', anime.data).then(function(err, response){
        //   console.log("err", err);
        //   console.log("response", response);
        // });
//       $http.get('https://hummingbird.me/api/v1/anime/1').success(function(anime) {
//         $scope.anime = anime;
//         console.log($scope.anime);
//     });
// };
  //   for(var i = 10000; i < 11564; i++) {
  //     $http.get("http://localhost:4000/anime/" + i.toString()).success(function(err, result) {
  //     // $http.get("https://animenetwork.herokuapp.com/anime").success(function(err, result) {
  //       console.log(result);
  //       console.log(err);
  //     });
  // }
// };

  $scope.register = function(newUser) {
    $scope.newUser = newUser;
    $http.post($scope.whichUrl + '/register', $scope.newUser).success(function(err, data) {
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
