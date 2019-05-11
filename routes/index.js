var express = require('express');
var fs = require('fs');
const testFolder = 'public/lib';
var router = express.Router();

var folders = [];
var thumbnail = '';


fs.readdir(testFolder, (err, files) => {
  files.forEach((file, i) => {
    var obj = {};
    if(file.toLowerCase().indexOf('book')!=-1){
      thumbnail = 'fas fa-book';
    } else if (file.toLowerCase().indexOf('image')!=-1 || file.toLowerCase().indexOf('gallery')!=-1 || file.toLowerCase().indexOf('img')!=-1) {
      thumbnail = 'fas fa-images';
    } else if (file.toLowerCase().indexOf('video')!=-1) {
      thumbnail = 'fas fa-video';
    } else if (file.toLowerCase().indexOf('audio')!=-1) {
      thumbnail = 'fa fa-music';
    } else {
      thumbnail = 'fa fa-folder';
    }
    obj.thumb = thumbnail;
    obj.fileName = file;
    folders.push(obj);
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {  
  res.render('index', { title: 'E-Library', folders });  
});



module.exports = router;
