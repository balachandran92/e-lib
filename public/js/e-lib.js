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
            $.ajax({
                url: "/api/search?s="+searchKey,
                type: 'GET',
                dataType: 'json', 
                success: function(res) {
                    var overlayStr = '<div class="search-overlay"><img class="loader" src="/images/loader.gif" alt="Loading..."></div>';                  
                    $('.modal-body .innerList').html("");
                    $('.modal-body').prepend(overlayStr);
                    if(res.length > 0) {
                        for(var i=0; i<res.length; i++){
                            var flask = res[i].split('\\');
                            var fileNameFlask = flask[flask.length-1];
                            var fileType = fileNameFlask.split('.').pop().toLowerCase();
                            var imgFormats = 'png,jpg,jpeg,iix,tiff,gif';
                            var videoFormats = 'mp4,3gp,mkv,wmv,ogg,webm,flv,avi,vob';                           
                            flask.shift();
                            flask = flask.join('\\');
                            
                            if(imgFormats.indexOf(fileType) != -1){
                                thumb = "<img class='img-thumbnail e-thumb' src='"+flask+"' alt='"+fileNameFlask+"' title='"+fileNameFlask+"'/>";
                            } else if (videoFormats.indexOf(fileType) != -1) {
                                thumb = "<video class='vidHolder' width='190' height='114' controls='controls' preload='metadata'><source src='"+flask+"' type='video/mp4'/></video>";
                            } else if (fileType == 'pdf') {
                                thumb = "<span class='fas fa-file-pdf font-icon'></span>";
                            } else {
                                thumb = "<span class='fas fa-file-alt font-icon'></span>";
                            }
                            htmlRes+="<a target='_blank' class='query' rel='noopener noreferrer' href='"+flask+"'><li>"+thumb+"<span class='textCon'>"+fileNameFlask+"</span></li></a>"               
                        }
                        $('.search-overlay').remove();
                        $('.modal-body .innerList').append(htmlRes); 
                    } else {
                        $('.search-overlay').remove();
                        $('.modal-body .innerList').append("<li class='msg'>NO data found</li>");
                    }                   
                }
            });
        }  
        
    });

})();