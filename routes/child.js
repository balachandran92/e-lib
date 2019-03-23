var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var parentFolder = 'public/Resources/';
var absPath = path.resolve(parentFolder);

/* GET Folder listing. */
router.get('/:id', function(req, res, next) {
  var data = [];
  fs.readdirSync(parentFolder+req.params.id).forEach(file => {
    var obj = {};
    obj.name = file;
    obj.absPath ='/Resources/'+req.params.id+"/"+file;
    data.push(obj);
    console.log(data);
  });
  res.render('child', {title: 'E-library', currentFolder: req.params.id, data});
});

module.exports = router;
