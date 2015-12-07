var express = require('express');
var router = express.Router();
var passport = require('passport');
var logout = require('express-passport-logout');
var User = require('../models/user');
var Anime = require('../models/anime');
// var unirest = require('unirest');
var mongoose = require('mongoose');

router.get('/', function(req, res, next) {
  res.render('index', { user: req.user });
  res.send();
});

router.post('/', function(req, res) {
  var randAnime = [];
  for(var i = 0; i < 6; i++) {
    var genres = [];
    Anime.random(function(err, anime) {
      anime.genres.forEach(function(e) {
        genres.push(e.name);
      });
      if(randAnime.indexOf(anime) === -1 && genres.indexOf("Hentai") === -1 && anime.rating !== "R18+") {
        randAnime.push(anime);
        i++;
        if(randAnime.length === 6) {
          res.send(randAnime);
        }
      }
    });
  }
});

router.get('/user', function(req, res, next) {
  User.findById(req.user.id, function(err, user) {
    if (err) { res.send(err);}
    else { res.json(req.user);}
  });
});


router.post('/anime/:id', function(req, res) {
  var y = req.params.id.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  Anime.find({title: {$regex: y}}, function(err, anime) {
    if(err) {res.send(err);}
    res.send(anime);
  });
});
router.post('/animelist/:id', function(req, res) {
  var y = req.params.id.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  Anime.find({title: { $regex: new RegExp("^" + y, "i") }}, function(err, anime) {
    if(err) {res.send(err);}
    res.send(anime);
  });
});

router.get('/animesearch/:id', function(req, res) {
  var x = req.params.id.split("%20").join(" ");
  var y = x.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  Anime.find({title: { $regex: new RegExp("^" + y, "i") }}, function(err, anime) {
    if(err) { res.send(err); }
    res.send(anime[0]);
  });
});
router.post('/genres', function(req, res) {
  var x = req.body;
  if(x.length === 1) {
    Anime.find( {genres: {$elemMatch: {name:req.body[0]}}}, function(err, anime) {
      if(err) { res.send(err); }
      res.send(anime);
    });
  }
  if(x.length === 2) { Anime.find( {$and: [
    {genres: {$elemMatch: {name:req.body[0]}}},
    {genres: {$elemMatch: {name:req.body[1]}}},
  ]}, function(err, anime) {
    if(err) { res.send(err); }
    res.send(anime); });
  }
  if(x.length === 3) { Anime.find({$and: [
    {genres: {$elemMatch: {name:req.body[0]}}},
    {genres: {$elemMatch: {name:req.body[1]}}},
    {genres: {$elemMatch: {name:req.body[2]}}},
  ]}, function(err, anime) {
    if(err) { res.send(err); }
    res.send(anime); });
  }
  if(x.length === 4) { Anime.find( {$and: [
    {genres: {$elemMatch: {name:req.body[0]}}},
    {genres: {$elemMatch: {name:req.body[1]}}},
    {genres: {$elemMatch: {name:req.body[2]}}},
    {genres: {$elemMatch: {name:req.body[3]}}},
  ]}, function(err, anime) {
    if(err) { res.send(err); }
    res.send(anime); });
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

router.get('/register', function(req, res) { });

router.post('/register', function(req, res) {
  User.register(new User({ username: req.body.username, email: req.body.email}),
  req.body.password, function(err, user) {
    if (err) { res.send(err); }
    passport.authenticate('local')(req, res, function() { res.redirect('/#/'); });
  });
});

router.get('/login', function(req, res) {
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/#/loginerror' }), function(req, res, next) {
  req.session.save(function (err) {
    if (err) { return next(err); }
    res.redirect('/#');
  });
});

module.exports = router;
