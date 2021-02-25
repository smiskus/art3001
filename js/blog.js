$(document).ready( function() { 
    $(".blog-post").hover(function() {
        $(this).css({"background-color": $(this).attr("background")});
    }, function() {
        $(this).css({"background-color": "transparent"});
    }) 
})