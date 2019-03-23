var express = require('express');
var fs = require('fs');
const testFolder = 'public/Resources';
var router = express.Router();

var folders = [];


fs.readdir(testFolder, (err, files) => {
  files.forEach(file => {
    folders.push(file);
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(folders);
  res.render('index', { title: 'E-Library' ,folders });  
});



module.exports = router;
