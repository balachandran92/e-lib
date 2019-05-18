var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var parentFolder = 'public/lib/';

var baseFolder = __dirname.split('\\');
baseFolder.pop();
baseFolder = baseFolder.join('\\');

/*isEmptyObject function*/
Object.prototype.isEmpty = function() {
  for(var key in this) {
      if(this.hasOwnProperty(key))
          return false;
  }
  return true;
}

var fileType = function (file){
  var extName = path.extname(file).toLowerCase();
  var imgFormats = '.png.jpg.jpeg.iix.tiff.gif';
  var videoFormats = '.mp4.ogg.webm';
  var unsupportedVideos = '.3gp.wmv.flv.avi.vob.mkv.mov';
  if(imgFormats.indexOf(extName) != -1){
    return 'img';
  } else if (videoFormats.indexOf(extName) != -1) {
      return 'vids';
  } else if (unsupportedVideos.indexOf(extName) != -1) {
      return 'unsupportedVids';
  } else if (extName == '.pdf') {
      return 'pdf';
  } else {
      return 'others';
  }
};

/* GET Folder listing. */
router.get('/:id', function(req, res, next) {
  var data = [];
  /* First child folder */
  if(req.query.isEmpty()){
    fs.readdirSync(parentFolder+req.params.id).forEach(file => {
      var obj = {};
      obj.name = file;
      obj.absPath ='/lib/'+req.params.id+"/"+file;
      obj.isDir = fs.lstatSync(baseFolder+"/"+parentFolder+req.params.id+"/"+file).isDirectory();
      obj.fileType = fileType(baseFolder+"/"+parentFolder+req.params.id+"/"+file);
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
      obj.isDir = fs.lstatSync(baseFolder+"/"+innerPath+"/"+file).isDirectory();
      obj.fileType = fileType(baseFolder+"/"+parentFolder+req.params.id+"/"+file);      
      data.push(obj);
    });
  }  

  res.render('child', {title: 'நூலகம்', currentFolder: req.params.id, data, bdBuilder});
});

module.exports = router;
