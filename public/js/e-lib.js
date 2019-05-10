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
        var fileData = [];
        var searchKey = $(this).val();
        var key = e.which;
        // the enter key code
        if(key == 13){
            $.ajax({
                url: "/api/search?s="+searchKey,
                type: 'GET',
                dataType: 'json', 
                success: function(res) {
                    $('.modal-body .innerList').html("");                    
                    for(var i=0; i<res.length; i++){
                        var obj = {};
                        var flask = res[i].split('\\');
                        var fileNameFlask = flask[flask.length-1];
                        flask.shift();
                        flask = flask.join('\\');
                        obj.fileName = fileNameFlask;
                        obj.fileUrl = flask;
                        fileData.push(obj);
                    }
                    fileData = fileData.filter(function(obj){
                        return obj.fileName.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1;
                    });
                    if(fileData.length > 0) {
                        for(var j=0; j<fileData.length; j++){
                            htmlRes+="<li><a target='_blank' rel='noopener noreferrer' href='"+fileData[j].fileUrl+"'>"+fileData[j].fileName+"</a></li>"               
                        }                   
                        $('.modal-body .innerList').append(htmlRes); 
                    } else {
                        $('.modal-body .innerList').append("<li class='msg'>NO data found</li>");
                    }
                   
                }
            });
        }  
        
    });

})();