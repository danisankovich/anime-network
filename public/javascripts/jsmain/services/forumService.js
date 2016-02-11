app.service('forumService', function($http, $state) {


  this.getForum = function() {
    return $http.get('/showforum/' + $state.params.animeId).success(function(forum) {
      $http.get('/topics/' + forum._id).success(function(topics) {
        topics.forEach(function(topic) {
          $http.get('/users/' + topic.creatorId).success(function(user){
            topic.user = user;
            $http.get('/users/' + topic.mostRecentUser).success(function(lastUser) {
              topic.mostRecentUser = lastUser;
            });
          });
        });
        forum.topicsList = topics;
      });
      return forum;
    });
  };
  this.topicResponse = function(topic) {
    // console.log(topic)
    return $http.post('/respondtopic', topic).success(function(topic) {
      return topic;
    })
  }
});
