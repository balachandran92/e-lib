(function(){
    $('.query').click(function(e){
        e.preventDefault();
        var query = this.text;
        var oldUrl = window.location.href;
        var newUrl = "";
        if(oldUrl.indexOf('?')== -1){
            newUrl = oldUrl+"?fol="+query;
        } else {
            newUrl = oldUrl+","+query;
        }        
        window.location = newUrl;
    });    

    
    /* Search Function*/
    $('#search').keypress(function(e){
        htmlRes = "";
        thumb = "";
        var searchKey = $(this).val();
        var key = e.which;
        // the enter key code
        if(key == 13){                  
            $('.modal-body .innerList').html("");
            $('.modal-body .search-overlay').show();
            $.ajax({
                url: "/api/search?s="+searchKey,
                type: 'GET',
                dataType: 'json', 
                success: function(res) {
                    $('.modal-body .innerList').html("");
                    if(res.length > 0) {
                        for(var i=0; i<res.length; i++){
                            var flask = res[i].split('\\');
                            var fileNameFlask = flask[flask.length-1];
                            var fileType = fileNameFlask.split('.').pop().toLowerCase();
                            var imgFormats = 'png,jpg,jpeg,iix,tiff,gif';
                            var videoFormats = 'mp4,ogg,webm';                            
                            var unsupportedVideos = '3gp,wmv,flv,avi,vob,mkv,mov';                           
                            flask.shift();
                            flask = flask.join('\\');
                            
                            if(imgFormats.indexOf(fileType) != -1){
                                thumb = "<img class='img-thumbnail e-thumb' src='"+flask+"' alt='"+fileNameFlask+"' title='"+fileNameFlask+"'/>";
                            } else if (videoFormats.indexOf(fileType) != -1) {
                                thumb = "<video class='vidHolder' width='190' height='114' controls='controls' preload='metadata'><source src='"+flask+"' type='video/mp4'/></video>";
                            } else if (unsupportedVideos.indexOf(fileType) != -1) {
                                thumb = "<span class='fa fa-video font-icon'></span>";
                            } else if (fileType == 'pdf') {
                                thumb = "<span class='fas fa-file-pdf font-icon'></span>";
                            } else {
                                thumb = "<span class='fas fa-file-alt font-icon'></span>";
                            }
                            htmlRes+="<a target='_blank' class='query' rel='noopener noreferrer' href='"+flask+"'><li>"+thumb+"<span class='textCon'>"+fileNameFlask+"</span></li></a>"               
                        }
                        $('.modal-body .search-overlay').hide();
                        $('.modal-body .innerList').append(htmlRes); 
                    } else {
                        $('.modal-body .search-overlay').hide();
                        $('.modal-body .innerList').append("<li class='msg'>NO data found</li>");
                    }                   
                }
            });
        }  
        
    });

})();