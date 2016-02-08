var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var http = require('http');
var debug = require('debug')('Cthulhu:server');

var routes = require('./routes/index');
var users = require('./routes/users');
var chats = require('./routes/chats');
var app = express();

var server = http.createServer(app);
var port = normalizePort(process.env.PORT || '4000');
app.set('port', port);
// var server = require('http').Server(app);
var io = require('socket.io').listen(server);
server.listen(port);
server.on('Error:', onError);
server.on('listening', onListening);


function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) { return val; }
  if (port >= 0) { return port; }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') { throw error; }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
  console.log('Your Anime app is gainaxing on port ', port);
}


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var permitCrossDomainRequests = function(req, res, next) {
res.header('Access-Control-Allow-Origin', '*');
res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
res.header('Access-Control-Allow-Headers', 'Content-Type');
// some browsers send a pre-flight OPTIONS request to check if CORS is enabled so you have to also respond to that
if ('OPTIONS' === req.method) {
  res.send(200);
}
else {
  next();
}
};

// uncomment after placing your favicon in /public
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({ extended: false, limit: '5mb' }));
// app.use(bodyParser({limit: '50mb'}))
app.use(cookieParser());
app.use(flash());
app.use(require('express-session')({
  secret: 'cthulu reigns',
  resave: false,
  saveUninitialized: false
}));
app.use(permitCrossDomainRequests);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/chats', chats);

var User = require('./models/user');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//connect to mongo
// mongoose.connect('mongodb://localhost/animenetwork');
// mongoose.connect(process.env.MONGOLAB_URI);
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/animenetwork');

var logout = function(req, res){
  if (req.isAuthenticated()){
    req.logout();
  }
  res.redirect('/');
};
app.get('/logout', logout);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  // res.render('error', {
  //   message: err.message,
  //   error: {}
  // });
});
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('user enter', function(msg) {
    io.emit('user enter', msg);
    console.log("someone\'s entered")
  });
  socket.on('user leave', function(msg) {
    io.emit('user leave', msg);
    console.log('user disconnected');
  });
  socket.on('user typing', function(msg) {
    io.emit('user typing', msg);
    console.log('typing')
  });
});


module.exports = app;
