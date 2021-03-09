var books = ['Six of Crows',
 'The Priory of the Orange Tree',
 'The Eight',
'Harry Potter', 
'Lord of the Rings', 
'Mistborn',
'Ender\'s Game',
'The Hunger Games',
'Throne of Glass', 
'The Girl Who Fell From the Sky', 
'All the Light We Cannot See',
'Four Winds',
'Nineteen Eighty-Four',
'The Handmaid\'s Tale',
'Jane Eyre',
'The Great Gatsby',
'Pride and Prejudice',
'Catcher in the Rye',
'Catch 22', 
'The Book Thief',
'Animal Farm',
'Anna Karenina',
'The Golden Compass',
'Fahrenheit 451',
'Invisible Man',
'The Grapes of Wrath',
'Lord of the Flies',
'The Goldfinch',
'The Girl With the Dragon Tattoo',
'The Lovely Bones',
'The Hobbit',
'It',
'The Way of Kings',
'The Lion, the Witch, and the Wardrobe',
'Children of Blood and Bone',
'The Wheel of Time',
'Game of Thrones',
'The Poppy War',
'Don Quixote',
'One Hundred Years of Solitude',
'Moby Dick',
'War and Peace',
'The Odyssey',
'Lolita',
'Crime and Punishment',
'Wuthering Heights',
'The Adventures of Huckleberry Finn',
'Alice in Wonderland',
'To the Lighthouse',
'Great Expectations'];
var currentBooks = [];
var transparency = [210, 155, 255, 255, 255, 230, 220, 200, 210, 175, 100];
var index = 0;
var drawCalled = 0;
var timeDelay = 0;

$(window).scroll(function () {
    var scrollTop = $(window).scrollTop();
    var imgPos = scrollTop / 2 + 'px';
    $('#canvas').css(
        'transform', 'translateY(' + imgPos + ')');
    
})

function setup() {
    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('canvas');
    background("#ffe09f");   
    textFont('Georgia'); 
}

function draw() {
    timeDelay++;
    if (drawCalled < 300 && timeDelay % 5 == 0){
        drawCalled++;     
        textSize(random(12, 30));
        fill(0, 0, 0, random(transparency));
        text(random(books), random(-100, innerWidth), random(0, innerHeight));        
    }
}