var app = angular.module('Anime', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
  .state('/', { url: '/', templateUrl: 'views/home.ejs', controller: 'mainCtrl' })
  .state('login', { url: '/login', templateUrl: 'views/login.ejs', controller: 'mainCtrl' })
  .state('login2', { url: '/loginerror', templateUrl: 'views/login2.ejs', controller: 'mainCtrl' })
  .state('register', { url: '/register', templateUrl: 'views/register.ejs', controller: 'registerCtrl' })
  .state('profile', { url: '/profile', templateUrl: 'views/profile.ejs', controller: 'profileCtrl' })
  .state('messages', { url: '/messages', templateUrl: 'views/messages.ejs', controller: 'messageCtrl' })
  .state('chatroom', { url: '/chatroom', templateUrl: 'views/chatroom.ejs', controller: 'chatroomCtrl' })
  .state('user', { url: '/user/{userId}', templateUrl: 'views/user.ejs', controller: 'userCtrl' })
  .state('myComplete', { url: '/profile/completed', templateUrl: 'views/mycompleted.ejs', controller: 'mycompletedCtrl' })
  .state('willWatch', { url: '/profile/willwatch', templateUrl: 'views/myWillWatch.ejs', controller: 'willwatchCtrl' })
  .state('favorited', { url: '/profile/favorited', templateUrl: 'views/myFavorited.ejs', controller: 'myFavoritedCtrl' })
  .state('anime', { url: '/anime/{animename}', templateUrl: 'views/anime.ejs', controller: 'animeCtrl' })
  .state('forum', { url: '/forum/{animeId}', templateUrl: 'views/forum.ejs', controller: 'forumCtrl' })
  .state('onetopic', { url: '/onetopic/{topicId}', templateUrl: 'views/topic.ejs', controller: 'topicCtrl' })
  .state('animelist', { url: '/animelist/{animename}', templateUrl: 'views/animeGenre.ejs', controller: 'animeListCtrl' })
  .state('animegenre', { url: '/animegenre', templateUrl: 'views/animeGenre.ejs', controller: 'genreCtrl' });
}]);
