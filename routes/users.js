var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Anime = require('../models/anime');
var Review = require('../models/review');
var passport = require('passport');

router.get('/', function(req, res, next) {
  User.findById(req.user.id, function(err, user) {
    if (err) { res.send(err);}
    else {
      user.isLoggedIn = true;
      user.save()
      res.json(req.user);
    }
  });
});

router.get('/:id', function(req, res, next) {
  User.findById(req.params.id, function(err, user) {
    if (err) { res.send(err);}
    else { res.json(user);}
  });
});

router.post('/edituser', function(req, res) {
  User.findById(req.user.id, function(err, user) {
    if (err) { res.send(err);}
    else {
      user.signature = req.body.signature
      user.save()
    }
  })
})

router.get('/username/:id', function(req, res, next) {
  User.find({username: req.params.id}, function(err, user) {
    if (err) { res.send(err);}
    else {
      var newUser = {}
      newUser.username = user[0].username
      newUser._id = user[0]._id
      res.send(newUser);
    }
  });
});
router.post('/reviews', function(req, res) {
  var reviewIds = req.body
  var reviews = []
  reviewIds.forEach(function(e) {
    Review.findById(e, function(err, review) {
      reviews.push(review)
      if(reviews.length === reviewIds.length) {
        res.send(reviews)
      }
    })
  })
});
router.get('/anime/:id', function(req, res) {
  console.log(req.params.id)
  Anime.findById(req.params.id, function(err, anime) {
    console.log(anime)
    res.send(anime)
  })
});

router.post('/newavatar', function(req, res) {
  console.log(req.body[0])
  User.findById(req.user.id, function(err, user) {
    user.avatar = req.body[0]
    user.save()
    res.send(user)
  })
})

router.post('/addToWatching/:id', function(req, res) {
  Anime.findByIdAndUpdate(req.params.id, {$push: {usersWatching: req.user._id}}, function(err, anime) {
    User.findByIdAndUpdate(req.user.id, {$push: {watchingAnime: {animeId: req.params.id, episodesWatched: 0}}}, function(err, user) {
      res.send(anime);
    });
  });
});

router.post('/addToWillWatch/:id', function(req, res) {
  User.findByIdAndUpdate(req.user.id, {$push: {willWatch: req.params.id}}, function(err, user) {
    res.send(user);
  });
});

router.post('/addLike/:id', function(req, res) {
  Anime.findByIdAndUpdate(req.params.id, {$push: {favorites: req.user._id}}, function(err, anime) {
    User.findByIdAndUpdate(req.user._id, {$push: {likes: req.params.id}}, function(err, user) {
      res.send(anime);
    });
  });
});

router.post('/addToCompleted/:id', function(req, res) {
  Anime.findByIdAndUpdate(req.params.id, {$push: {usersCompleted: req.user._id}}, function(err, anime) {
    User.findByIdAndUpdate(req.user.id, {$push: {completedAnime: req.params.id}}, function(err, user) {
      res.send(anime);
    });
  });
});
router.post('/transtocompleted', function(req, res) {
  Anime.findById(req.body.anime._id, function(err, anime) {
    var idx = anime.usersWatching.indexOf(req.user.id)
    anime.usersWatching.splice(idx, 1)
    anime.usersCompleted.push(req.user.id)
      anime.save()
      User.findById(req.user.id, function(err, user) {
        user.watchingAnime.forEach(function(e, i) {
          if(e.animeId === req.body.anime._id) {
            user.watchingAnime.splice(i, 1)
            user.completedAnime.push(req.body.anime._id)
            user.save()
          }
        })
        res.send(anime);
      });
    });
});
router.post('/transtowatching/:id', function(req, res) {
  User.findById(req.user.id, function(err, user) {
    var idx = user.willWatch.indexOf(req.params.id)
    user.willWatch.splice(idx, 1)
    user.watchingAnime.push({animeId: req.params.id, episodesWatched: 0})
    user.save()
    Anime.findById(req.params.id, function(err, anime) {
      anime.usersWatching.push(req.user.id)
      anime.save()
      res.send(anime)
    })
  })
})
router.post('/transfromtowatch/:id', function(req, res) {
  User.findById(req.user.id, function(err, user) {
    var idx = user.willWatch.indexOf(req.params.id)
    user.willWatch.splice(idx, 1)
    user.completedAnime.push(req.params.id)
    user.save()
    Anime.findById(req.params.id, function(err, anime) {
      anime.usersCompleted.push(req.user.id)
      anime.save()
      res.send(anime)
    })
  })
})

router.post('/friendrequest/:id', function(req, res) {
  User.findById(req.params.id, function(err, user) {
    user.friendIds.push({friendId: req.user._id, pending: true, initiator: false})
    user.save()
    User.findById(req.user.id, function(err, currentUser) {
      currentUser.friendIds.push({friendId: user._id, pending: true, initiator: true})
      currentUser.save()
      res.send()
    })
  })
})
router.post('/acceptfriend/:id', function(req, res) {
  User.findById(req.params.id, function(err, user) {
    user.friendIds.forEach(function(e) {
      if(e.friendId === req.user.id) {
        e.pending = false
        user.save()
      }
    })
    User.findById(req.user.id, function(err, currentUser) {
      currentUser.friendIds.forEach(function(f) {
        if(f.friendId === req.params.id) {
          f.pending = false
          currentUser.save()
        }
      })
    })
  })
})

router.get('/register', function(req, res) { });

router.post('/register', function(req, res) {
  User.register(new User({ username: req.body.username, email: req.body.email}),
  req.body.password, function(err, user) {
    if (err) { res.send(err); }
    passport.authenticate('local')(req, res, function() {
      console.log(req.user)
      res.send(req.user);
    });
  });
});

router.post('/login', passport.authenticate('local'), function(req, res, next) {
  req.session.save(function (err, user) {
    if (err) { res.send(err); }
    console.log(req.user)
    res.send(req.user)
  });
});
router.get('/userleave/:id', function(req, res, next) {
  User.findById(req.params.id, function(err, user) {
    if (err) { res.send(err);}
    else {
      user.isLoggedIn = false;
      user.save()
      console.log('userleft', {user: user.username, loggedin: user.isLoggedIn})
      res.json(req.user);
    }
  });
});

module.exports = router;
