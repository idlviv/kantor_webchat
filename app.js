var express = require('express');
var http = require('http');
var path = require('path');
var config = require('config');

var app = express();
app.set('port', config.get('port'));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + config.get('port'));
});

app.use(function(req, res, next) {
  if (req.url === '/') {
    res.end('root');
  } else {
    next();
  }
});

app.use(function(req, res, next) {
  if (req.url === '/test') {
    res.end('test');
  } else {
    next();
  }
});

app.use(function(req, res, next) {
  if (req.url === '/forbidden') {
    // передає на обробчик помилок
    next(new Error('denied'));
  } else {
    next();
  }
});

//якщо десь помилка або throw то керування зразу сюда
// знає, що це обробчик помилок, бо передається 4 аргумента
app.use(function(err, req, res, next) {
  // якщо NODE_ENV немаэ, то по замовч development
  // при development видає стек помилки
  // для цього є вбудований app.use(express.errorHandler()
  // при production те що має побачити користувач
  if (app.get('env') === 'development') {
    var errorHandler = express.errorHandler();
    errorHandler(err, req, res, next);
  } else {
    res.send(500, 'error');
  }
});

app.use(function(req, res) {
    res.send(404, '--page not found--');
});
// var routes = require('./routes');
// var user = require('./routes/user');
//
//
//
// // all environments
// app.set('port', process.env.PORT || 3000);
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
// app.use(express.favicon());
// app.use(express.logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded());
// app.use(express.methodOverride());
// app.use(express.session({ secret: 'your secret here' }));
// app.use(app.router);
// app.use(express.static(path.join(__dirname, 'public')));
//
// // development only
// if ('development' == app.get('env')) {
//   app.use(express.errorHandler());
// }
//
// app.get('/', routes.index);
// app.get('/users', user.list);
