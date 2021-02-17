$(document).ready( function() {
    setInterval(flashingLights, 1000);   
    $("#home").fadeIn(3000);

    $(".blog").css({"background-color": "rgb(49, 49, 49)", "border-style": "solid", "border-color": "white"});
    $(".blog").hover(function() {
        $(this).css({"background-color": "black"});
    }, function() {
        $(this).css({"background-color": "rgb(49, 49, 49)"});
    })    
})

$(window).scroll(function () {
    var scrollTop = $(window).scrollTop();
    console.log(scrollTop);
    if ($(window).scrollTop() < 1100) {
        var imgPos = scrollTop / 2 + 'px';
        $('.film-strip-background').css(
            'transform', 'translateY(' + imgPos + ')');
    }
    
})

function flashingLights() {
    var nightSection = document.getElementById("night");
    nightSection.style.borderColor = (nightSection.style.borderColor == 'rgb(255, 182, 23)') ? 'white' : 'rgb(255, 182, 23)';
}



