var express = require('express');
var router = express.Router();
var passport = require('passport');
var logout = require('express-passport-logout');
var User = require('../models/user');
var Anime = require('../models/anime');
var unirest = require('unirest');
var mongoose = require('mongoose');
var fs = require('fs');

router.get('/', function(req, res, next) {
  res.render('index', { user: req.user });
  res.send();
});

router.get('/user', function(req, res, next) {
  User.findById(req.user.id, function(err, user) {
    if (err) {
      console.error(err);
    }
    else {
      res.json(req.user);
    }
  });
});


router.get('/anime', function(req, res) {
  Anime.find({}, function(err, anime) {
    if(err) {res.send(err);}
    res.send(anime);
  });
});

router.get('/animesearch/:id', function(req, res) {
  console.log("everything", req.params.id.split("%20").join(" "));
  var x = req.params.id.split("%20").join(" ");
  Anime.find({title: x}, function(err, anime) {
    if(err) { res.send(err); }
    console.log(anime);
    res.send(anime[0]);
  });
});
router.get('/genres', function(req, res) {
  var x = [1, 2, 3, 4];
  if(x.length === 1) {
    Anime.find(
        {genres: {$elemMatch: {name:'Action'}}}, function(err, anime) {
      if(err) { res.send(err); }
      console.log(anime);
      res.send(anime);
    });
  }
  if(x.length === 2) {
    Anime.find(
      {$and: [
        {genres: {$elemMatch: {name:'Action'}}},
        {genres: {$elemMatch: {name:'Demons'}}},
      ]}, function(err, anime) {
      if(err) { res.send(err); }
      console.log(anime);
      res.send(anime);
    });
  }
  if(x.length === 3) {
    Anime.find(
      {$and: [
        {genres: {$elemMatch: {name:'Action'}}},
        {genres: {$elemMatch: {name:'Demons'}}},
        {genres: {$elemMatch: {name:'Action'}}},
      ]}, function(err, anime) {
      if(err) { res.send(err); }
      console.log(anime);
      res.send(anime);
    });
  }
  if(x.length === 4) {
    Anime.find(
      {$and: [
        {genres: {$elemMatch: {name:'Action'}}},
        {genres: {$elemMatch: {name:'Demons'}}},
        {genres: {$elemMatch: {name:'Action'}}},
        {genres: {$elemMatch: {name:'Mystery'}}},
      ]}, function(err, anime) {
      if(err) { res.send(err); }
      console.log(anime);
      res.send(anime);
    });
  }
});

// router.get('/episodes', function(req, res){
//   console.log('hit');
//   unirest.get("https://vikhyat-hummingbird-v2.p.mashape.com/anime/50")
//   .header("X-Mashape-Key", "fL30UnxVmgmsh80IDMvD28obwFSup1Fv6mNjsnjhuV3M9VbB2R")
//   .header("Accept", "text/plain")
//   .end(function (result) {
//     console.log(result.status, result.headers, result.body);
//     res.send();
//   });
// });

// router.get('/anime/:id', function(req, res) {  //for getting from api
//   console.log("req.body", req.params.id);
//   unirest.get("https://hummingbirdv1.p.mashape.com/anime/" + req.params.id)
//   .header("X-Mashape-Key", "fL30UnxVmgmsh80IDMvD28obwFSup1Fv6mNjsnjhuV3M9VbB2R")
//   .header("Accept", "application/json")
//   .end(function (result) {
//     console.log('Bodydajgsdlgjsdlgj', result.body);
//     Anime.create(result.body, function(err, anime) {
//       console.log('asdfasdfasdf', err);
//       console.log("animeasdfsadfasd", anime);
//       res.send();
//     });
//     // res.send(result.body);
//   });
// });


// router.get('/anime/:id', function(req, res) {  //for getting from api
//   console.log("req.body", req.params.id);
//   unirest.get("https://hummingbirdv1.p.mashape.com/anime/" + req.params.id)
//   .header("X-Mashape-Key", "fL30UnxVmgmsh80IDMvD28obwFSup1Fv6mNjsnjhuV3M9VbB2R")
//   .header("Accept", "application/json")
//   .end(function (result) {
//     console.log('Bodydajgsdlgjsdlgj', result.body);
//     Anime.create(result.body, function(err, anime) {
//       console.log('asdfasdfasdf', err);
//       console.log("animeasdfsadfasd", anime);
//       res.send();
//     });
//     // res.send(result.body);
//   });
// });
//
// router.post('/', function(req, res) {
//   console.log(req.body);
//   Anime.create("yes", function(err, anime) {
//     if (err) {
//       res.send(err);
//     }
//     console.log("animeasdfsadfasd", anime);
//     res.send(anime);
//   });
// });

router.get('/register', function(req, res) {

});

router.post('/register', function(req, res) {
  User.register(new User({
    username: req.body.username, email: req.body.email}),
    req.body.password, function(err, user) {
      if (err) {
        res.send(err);
      }
      passport.authenticate('local')(req, res, function() {
        res.redirect('/#/');
      });
  });
});

router.get('/login', function(req, res) {

});

// router.post('/login', passport.authenticate('local'), function(req, res) {
//   res.redirect('/');
// });
router.post('/login', passport.authenticate('local', { failureRedirect: '/#/login2' }), function(req, res, next) {
  req.session.save(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

module.exports = router;
