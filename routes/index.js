var express = require('express');
var fs = require('fs');
const testFolder = 'public/lib';
var router = express.Router();

var folders = [];
var thumbnail = ['fas fa-book', 'fas fa-images', 'fas fa-video'];


fs.readdir(testFolder, (err, files) => {
  files.forEach((file, i) => {
    var obj = {};
    obj.thumb = thumbnail[i];
    obj.fileName = file;
    folders.push(obj);
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {  
  res.render('index', { title: 'E-Library', folders });  
});



module.exports = router;
