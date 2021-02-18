var index = 0;

$(document).ready( function() {    
    $("#influence-img").attr("src", "img/soundofmusic.jpg");
    $(".quote").html("<p>&quotI've always longed for adventure, To do the things I've never dared, Now here I'm facing adventure, Then why am I so scared?&quot <br>-Maria von Trapp from <i>The Sound of Music</i></p>");  

    setInterval(flashingLights, 1000);   
    setInterval(influences, 7000);
    $("#home").fadeIn(3000);

    $(".blog").css({"background-color": "rgb(49, 49, 49)", "border-style": "solid", "border-color": "white"});
    $(".blog").hover(function() {
        $(this).css({"background-color": "black"});
    }, function() {
        $(this).css({"background-color": "rgb(49, 49, 49)"});
    }) 
    
    $(".img-container").hover(function() {
        $(this).children(".img-title").fadeIn();
        $(this).children(".img-title").css({"background-color": $(this).attr("color-id")})
    }, function() {
        $(this).children(".img-title").fadeOut();
    })
})

$(window).scroll(function () {
    var scrollTop = $(window).scrollTop();
    if ($(window).scrollTop() < 1100) {
        var imgPos = scrollTop / 2 + 'px';
        $('.film-strip-background').css(
            'transform', 'translateY(' + imgPos + ')');
    }    
})

function influences() {
    if (index % 3 == 0) {
        $("#influence-img").attr("src", "img/wizardofoz.jpg");
        $(".quote").html("<p>&quotIf I ever go looking for my heart's desire again, I won't look any further than my own backyard. Because if it isn't there, I never really lost it to begin with!&quot <br>-Dorothy Gale from <i>The Wizard of Oz</i></p>");
    } else if (index % 3 == 1) {
        $("#influence-img").attr("src", "img/pooh.png");
        $(".quote").html("<p>&quotPromise me you'll always remember: You're braver than you believe, and stronger than you seem, and smarter than you think.&quot <br>-Chrisopher Robin from <i>Winnie the Pooh</i></p>");    
    } else {
        $("#influence-img").attr("src", "img/soundofmusic.jpg");
        $(".quote").html("<p>&quotI've always longed for adventure, To do the things I've never dared, Now here I'm facing adventure, Then why am I so scared?&quot <br>-Maria von Trapp from <i>The Sound of Music</i></p>");
    }
    index++;
}

function flashingLights() {
    var nightSection = document.getElementById("night");
    nightSection.style.borderColor = (nightSection.style.borderColor == 'rgb(255, 182, 23)') ? 'white' : 'rgb(255, 182, 23)';
}



