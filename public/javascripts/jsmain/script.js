var app = angular.module('Anime', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
  .state('/', { url: '/', templateUrl: 'views/home.ejs', controller: 'mainCtrl' })
  .state('login', { url: '/login', templateUrl: 'views/login.ejs', controller: 'mainCtrl' })
  .state('login2', { url: '/loginerror', templateUrl: 'views/login2.ejs', controller: 'mainCtrl' })
  .state('register', { url: '/register', templateUrl: 'views/register.ejs', controller: 'registerCtrl' })
  .state('profile', { url: '/profile', templateUrl: 'views/profile.ejs', controller: 'profileCtrl' })
  .state('myComplete', { url: '/profile/completed', templateUrl: 'views/mycompleted.ejs', controller: 'mycompletedCtrl' })
  .state('willWatch', { url: '/profile/willwatch', templateUrl: 'views/myWillWatch.ejs', controller: 'willwatchCtrl' })
  .state('anime', { url: '/anime/{animename}', templateUrl: 'views/anime.ejs', controller: 'animeCtrl' })
  .state('animelist', { url: '/animelist/{animename}', templateUrl: 'views/animeGenre.ejs', controller: 'animeListCtrl' })
  .state('animegenre', { url: '/animegenre', templateUrl: 'views/animeGenre.ejs', controller: 'genreCtrl' });
}]);
