var width;
var height;
var time = 0;
var currentMode = 0;
let introvertedParticles = [];
let extrovertedParticles = [];
var introvertColors = ['blue', 'purple', 'green', 'aqua', 'dodgerblue'];
var extrovertColors = ['yellow', 'red', 'orange', 'gold', 'lightpink'];
const defaultMode = 0;
const hoverIntro = 1;
const hoverExtro = 2;
const introMode = 3;
const extroMode = 4;

$(document).ready( function() {   
    $(".introvert").hover(function() {    
      if (currentMode < 3) {
        currentMode = hoverIntro;
      }        
    }, function() {
      if (currentMode < 3) {
        currentMode = defaultMode;
      }
    })

    $(".extrovert").hover(function() {  
      if (currentMode < 3) {      
        currentMode = hoverExtro;
      }
    }, function() {
      if (currentMode < 3) {
        currentMode = defaultMode;
      }
    })

    $(".introvert").click(function() {        
        currentMode = introMode;
        $(".introvert").css("display", "none");
        $(".extrovert").css("display", "none");
        $(".type").css("display", "block");
        $(".type").html("INTROVERT");
        $("#back").css("display", "block");
        $("#home").css("display", "none");
    })

    $(".extrovert").click(function() {        
        currentMode = extroMode;
        $(".introvert").css("display", "none");
        $(".extrovert").css("display", "none");
        $(".type").css("display", "block");
        $(".type").html("EXTROVERT");
        $("#back").css("display", "block");
        $("#home").css("display", "none");
    })
})

function setup() {
    var canvas = createCanvas(windowWidth, windowHeight);
    width = windowWidth;
    height = windowHeight;
    canvas.parent('canvas');
    background("#1b142a");   
    for(let i = 0;i<width/10;i++){
        introvertedParticles.push(new Particle(introvertColors, "circle"));
        extrovertedParticles.push(new Particle(extrovertColors, "square"));
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    width = windowWidth;
    height = windowHeight;
    background("#1b142a");  
}

function draw() { 
  time++; 
  switch(currentMode) {
      case defaultMode:
          background("#1b142a");    
          drawStartingSymbol();                     
          break;
      case hoverExtro:
          background("#1b142a"); 
          drawParticles(extrovertedParticles)   
          drawStartingSymbol();        
          break;
      case hoverIntro:
          background("#1b142a");   
          drawParticles(introvertedParticles)
          drawStartingSymbol();
          break;
      case extroMode:          
          background("#1b142a");  
          drawParticles(extrovertedParticles)   
          squareCursor();
          break;
      case introMode:
          background("#1b142a");  
          drawParticles(introvertedParticles)
          sphereCursor(); 
          break;
      default:
          break;
  }
}

function squareCursor() {
  noStroke();
  fill('gold');
  square(mouseX, mouseY, 50);
  fill('orange');
  square(mouseX - 35, mouseY + 35, 40);
  fill('red');
  square(mouseX - 55, mouseY + 45, 20);
}

function sphereCursor() {
  noStroke();
  fill('aqua');
  ellipse(mouseX, mouseY, 50, 50);
  fill('purple');
  ellipse(mouseX - 35, mouseY + 35, 40, 40);
  fill('limegreen');
  ellipse(mouseX - 55, mouseY + 45, 20, 20);
}

function drawStartingSymbol() {
    stroke(255);
    strokeWeight(3);
    line(0, height / 2, width, height / 2);
    noFill();
    circle(width / 2, height / 2, height / 4);
}

function drawParticles(particles) {
    for(let i = 0;i<particles.length;i++) {
        particles[i].createParticle(color);
        particles[i].moveParticle();
    }
}

// this class describes the properties of a single particle.
class Particle {
  // setting the co-ordinates, radius and the
  // speed of a particle in both the co-ordinates axes.
  constructor(colors, shape){
    this.x = random(0,width);
    this.y = random(0,height);
    this.r = random(5,20);
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.shape = shape;
    this.xSpeed = random(-2,2);
    this.ySpeed = random(-1,1.5);
  }

// creation of a particle.
  createParticle() {
    noStroke();
    fill(this.color);
    if (this.shape == "circle") {
      circle(this.x,this.y,this.r);
    } else {
      square(this.x, this.y, this.r);
    }
  }

// setting the particle in motion.
  moveParticle() {
    if(this.x < 0 || this.x > width)
      this.xSpeed*=-1;
    if(this.y < 0 || this.y > height)
      this.ySpeed*=-1;
    this.x+=this.xSpeed;
    this.y+=this.ySpeed;
  }
}
    