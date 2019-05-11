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
                    if(res.length > 0) {
                        for(var i=0; i<res.length; i++){
                            var flask = res[i].split('\\');
                            var fileNameFlask = flask[flask.length-1];
                            flask.shift();
                            flask = flask.join('\\');
                            htmlRes+="<a target='_blank' rel='noopener noreferrer' href='"+flask+"'><li><span>"+fileNameFlask+"</span></li></a>"               
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