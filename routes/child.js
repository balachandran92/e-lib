var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var parentFolder = 'public/lib/';

/*isEmptyObject function*/
Object.prototype.isEmpty = function() {
  for(var key in this) {
      if(this.hasOwnProperty(key))
          return false;
  }
  return true;
}

/* GET Folder listing. */
router.get('/:id', function(req, res, next) {
  console.log(req.query);
  var data = [];
  /* First child folder */
  if(req.query.isEmpty()){
    fs.readdirSync(parentFolder+req.params.id).forEach(file => {
      var obj = {};
      obj.name = file;
      obj.absPath ='/lib/'+req.params.id+"/"+file;
      obj.isDir = fs.lstatSync("E:/e-lib/"+parentFolder+req.params.id+"/"+file).isDirectory();
      data.push(obj);
    });
  } /* inner child folders */
  else{
    var currentFolder = req.query.fol;
    currentFolder = currentFolder.split(',').join('/');
    var innerPath = parentFolder+req.params.id+"/"+currentFolder;
    var breadCrumb = req.params.id+"/"+ currentFolder;
    var breadCrumbArr = breadCrumb.split('/');
    var bdBuilder = [];
    var url = "?fol=";

    for(var i=1; i<breadCrumbArr.length; i++) {
      var chunk = {};
      chunk.name = breadCrumbArr[i];
      if(url[url.length-1] != '='){
        url+=',';
      }
      url += chunk.name;
      chunk.url = url;
      bdBuilder.push(chunk);
    }

    fs.readdirSync(innerPath).forEach(file => {
      var obj = {};
      obj.name = file;
      obj.absPath ='/lib/'+req.params.id+"/"+currentFolder+"/"+file;
      obj.isDir = fs.lstatSync("E:/e-lib/"+innerPath+"/"+file).isDirectory();      
      data.push(obj);
    });
  }  

  res.render('child', {title: 'E-library', currentFolder: req.params.id, data, bdBuilder});
});

module.exports = router;
