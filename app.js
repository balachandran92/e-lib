var createError = require('http-errors');
var express = require('express');
var fs = require('fs');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var childRouter = require('./routes/child');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.get('/:id', childRouter);


/* Search Api */
var response = []; 
var dataChunk = [];
app.get('/api/search', function(req, res){

  function walkSync (dir, filelist = []) {
      fs.readdirSync(dir).forEach(file => {
          const dirFile = path.join(dir, file);
          try {
              filelist = walkSync(dirFile, filelist);
          }
          catch (err) {
              if (err.code === 'ENOTDIR' || err.code === 'EBUSY') filelist = [...filelist, dirFile];
              else throw err;
          }
      });
      return filelist;
  }  

  dataChunk = walkSync("public/lib");

  var query = req.query.s;

  response = dataChunk.filter(function(quel){
    return quel.toLowerCase().indexOf(query.toLowerCase()) !== -1;
  });

  res.json(response);

});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
