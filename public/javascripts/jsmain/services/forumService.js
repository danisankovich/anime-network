app.service('forumService', function($http, $state) {


  this.getForum = function() {
    var forumStuff = {}
    return $http.get('/showforum/' + $state.params.animeId).success(function(forum) {
      forumStuff.forum = forum;
      $http.get('/topics/' + forum._id).success(function(topics) {
        topics.forEach(function(topic) {
          $http.get('/users/' + topic.creatorId).success(function(user){
            topic.user = user;
            $http.get('/users/' + topic.mostRecentUser).success(function(lastUser) {
              topic.mostRecentUser = lastUser.username;
            });
          });
        });
        forumStuff.topics = topics;
      });
      return forumStuff;
    });
  };

});
