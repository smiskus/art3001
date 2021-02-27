$(document).ready( function() { 
    $('.ticket').click(function() {
        $('#bonus').css(
            'display', 'block'
        );
    })
})

$(window).scroll(function () {
    var scrollTop = $(window).scrollTop();
    var imgPos = scrollTop / 2 + 'px';
    $('.background').css(
        'transform', 'translateY(' + imgPos + ')');  
})
