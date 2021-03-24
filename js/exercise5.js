var width;
var height;
var time = 0;
var currentMode = 0;
let introvertedParticles = [];
let extrovertedParticles = [];
let ripples = [];
var textX = 0;
var textY = 0;
var textIndex = 0;
var textSizeDesc;
var textFill;
var currentTextSize = 1;
var particleMode = 0;
var numOfParticleModes = 8;

var introvertText = [
  "Introvert: "
]

var extrovertText = [
  "Extrovert: "
]

var introvertColors = ['blue', 'purple', 'violet', 'aqua', 'dodgerblue'];
var extrovertColors = ['yellow', 'red', 'orange', 'gold', 'lightpink'];

var mouseOffset1 = 0;
var mouseOffset2 = 0;
var offset1 = 1;
var offset2 = 1;
const mouseOffset1Max = 10;
const mouseOffset2Max = 20;

var rippleX;
var rippleY;
var rippleRadius = 1;
var maxRippleRadius = 50;
var lastMouseX = 0;
var lastMouseY = 0;

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
        textX = random(200, width / 2);
        textY = random(200, height - 200);
        textFill = introvertColors[Math.floor(Math.random() * introvertColors.length)];
        textSizeDesc = random(30, 50);
    })

    $(".extrovert").click(function() {        
        currentMode = extroMode;
        $(".introvert").css("display", "none");
        $(".extrovert").css("display", "none");
        $(".type").css("display", "block");
        $(".type").html("EXTROVERT");
        $("#back").css("display", "block");
        $("#home").css("display", "none");
        textX = random(200, width / 2);
        textY = random(200, height - 200);
        textFill = extrovertColors[Math.floor(Math.random() * extrovertColors.length)];
        textSizeDesc = random(30, 50);
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
    maxRippleRadius = width / 20;
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
          extrovert();
          squareCursor();
          break;
      case introMode:
          background("#1b142a");  
          drawParticles(introvertedParticles)          
          introvert();   
          sphereCursor();        
          break;
      default:
          break;
  }
}

function introvert() {
  if (time % 2 == 0 && !(lastMouseX == mouseX && lastMouseY == mouseY)) {
    ripples.push(new Ripple(introvertColors, "circle", mouseX, mouseY));
    lastMouseX = mouseX;
    lastMouseY = mouseY;
  }  
  for(let i = 0;i<ripples.length;i++) {
    ripples[i].ripple();
  }
  trimRipples();
  spawnDescriptors(introvertText, introvertColors);
}

function extrovert() {
  if (time % 2 == 0 && !(lastMouseX == mouseX && lastMouseY == mouseY)) {
    ripples.push(new Ripple(extrovertColors, "square", mouseX - (maxRippleRadius / 2), mouseY - (maxRippleRadius / 2)));
    lastMouseX = mouseX;
    lastMouseY = mouseY;
  }  
  for(let i = 0;i<ripples.length;i++) {
    ripples[i].ripple();
  }
  trimRipples();
  spawnDescriptors(extrovertText, extrovertColors);
}

function squareCursor() {
  noStroke();
  fill('gold');
  square(mouseX - (maxRippleRadius / 2), mouseY - (maxRippleRadius / 2), maxRippleRadius);
}

function sphereCursor() {
  noStroke();
  fill('aqua');
  ellipse(mouseX, mouseY, maxRippleRadius);
}

function drawStartingSymbol() {
    stroke(255);
    strokeWeight(3);
    line(0, height / 2, width, height / 2);
    noFill();
    circle(width / 2, height / 2, height / 4);
}

function spawnDescriptors(list, colors) {
  if (mouseIsPressed) {
    textIndex = (textIndex + 1) % list.length;
    textFill = colors[Math.floor(Math.random() * colors.length)];
    currentTextSize = 1;
    if (list[textIndex].length > 40) {
      textSizeDesc = random(20, 35);
      textX = random(200, width / 2 - (width / 3));
      textY = random(200, height - 200);
    } else {
      textSizeDesc = (30, 50);
      textX = random(200, width / 2);
      textY = random(200, height - 200);
    }
    particleMode = (particleMode + 1) % numOfParticleModes;
  }
  if (currentTextSize < textSizeDesc) {
    currentTextSize++;
    textX-=3;
    textY++;
  }
  fill(textFill);
  stroke(textFill);
  strokeWeight(1);
  textSize(currentTextSize);
  textFont('Montserrat');
  text(list[textIndex] + particleMode, textX, textY);
}

function drawParticles(particles) {
    for(let i = 0;i<particles.length;i++) {
        particles[i].createParticle(color);
        switch (particleMode) {
          case 0:
            particles[i].moveParticle();
            break;
          case 1:
            particles[i].clusterParticles(particles);
            particles[i].moveParticle();
            break;
          case 2:
            particles[i].unclusterParticle();
            particles[i].moveParticle();
            break;
          case 3:
            particles[i].verticalLineParticles();
            break;
          case 4: 
            particles[i].horizontalLineParticles();
            break;
          case 5:
            particles[i].gridParticles();
            break;
          case 6:
            particles[i].scatterParticle();
            break;
          case 7:
            particles[i].unscatterParticles();
            particles[i].moveParticle();
            break;
          case 8:
            particles[i].fallingDown();
          default:
            break;
        }
    }
}

function trimRipples() {
  let tempArray = [];
  for (let i = 0; i < ripples.length; i++) {
    if (ripples[i].active) {
      tempArray.push(ripples[i]);
    }
  }
  ripples = tempArray;
}

class Ripple {
  constructor(colors, shape, x, y) {
    this.shape = shape;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.x = x;
    this.y = y;
    this.r = maxRippleRadius;
    this.active = true;
  }

  ripple() {
    if (this.r > 0) {
      noFill();
      stroke(this.color);
      strokeWeight(2);     
      if (this.shape == "circle") {
        circle(this.x, this.y, this.r);
        circle(this.x, this.y, this.r / 2);
        circle(this.x, this.y, this.r / 4);
      } else if (this.shape == "square") {
        square(this.x, this.y, this.r);
        square(this.x + (this.r / 4), this.y + (this.r/4), this.r / 2);
        square(this.x + (this.r / 4) + (this.r / 8), this.y + (this.r / 4) + (this.r / 8), this.r / 4);
      }
      this.r -= 2;                
    } else {
      this.active = false;
    }
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
    this.cluster = 0;
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

  clusterParticles(particles) {
    for (let i = 0; i < particles.length; i++) {
      if (this.cluster < 6 && (dist(this.x, this.y, particles[i].x, particles[i].y) < 50)) {
        this.xSpeed = particles[i].xSpeed;
        this.ySpeed = particles[i].ySpeed;
        this.cluster++;
      }
    }
  }

  unclusterParticle() {
    if (this.cluster > 0) {
      this.xSpeed = random(-2,2);
      this.ySpeed = random(-1,1.5);
      this.cluster = 0;
    }
  }

  verticalLineParticles() {
    if(this.x < 0 || this.x > width)
    this.xSpeed*=-1;
    if(this.y < 0 || this.y > height)
    this.ySpeed*=-1;
    if (Math.floor(this.x) % 10 == 0) {
      this.y+=this.ySpeed;
    } else {
      this.x+=this.xSpeed;
      this.y+=this.ySpeed;
    }
  }

  horizontalLineParticles() {
    if(this.x < 0 || this.x > width)
    this.xSpeed*=-1;
    if(this.y < 0 || this.y > height)
    this.ySpeed*=-1;
    if (Math.floor(this.y) % 10 == 0) {
      this.x+=this.xSpeed;
    } else {
      this.x+=this.xSpeed;
      this.y+=this.ySpeed;
    }
  }

  gridParticles() {
    if(this.x < 0 || this.x > width)
    this.xSpeed*=-1;
    if(this.y < 0 || this.y > height)
    this.ySpeed*=-1;
    if (Math.floor(this.y) % 10 != 0 || Math.floor(this.x) % 10 != 0) {
      this.x+=this.xSpeed;
      this.y+=this.ySpeed;
    }
  }

  scatterParticle() {
    this.x+=this.xSpeed;
    this.y+=this.ySpeed;
    return (this.x < 0 || this.x > width) && (this.y < 0 && this.y > height);
  }

  unscatterParticles() {
    if (this.x < 0 || this.x > width) {
      this.xSpeed*=-1;
      if (this.x < 0) {
        this.x = 0; 
      } else {
        this.x = width;
      }     
    }
    if(this.y < 0 || this.y > height) {
      this.ySpeed*=-1;
      if (this.y < 0) {
        this.y = 0;
      } else {
        this.y = height;
      }
    }
  }

  fallingDown() {
    if (this.ySpeed < 0) {
      this.ySpeed*= -1;
    }
    if (this.x == 0) {
      this.xSpeed/= 2;
    }
    this.x+=this.xSpeed;
    this.y+=this.ySpeed;
  }
}
    