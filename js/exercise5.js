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
var numOfParticleModes = 9;
var powerupRadius;
var powerUp;
var maxFallingSpeed = 1;
var maxFallingRadius = 300;
var currentText;
var collidingWithSquare = false;
let introvertSong;
let extrovertSong;
let song;

var minimumFallingSpeed = 5;
var energy = 100;

var introvertText = [
  "Click on the pulsing circle to get started",
  "Hello there!",
  "Keep clicking on the pulsing circles to increase your score",
  "You'll see your score at the bottom",
  "And your energy below that",
  "When you reach zero energy, the game is over!",
  "Keep your energy up by avoiding the falling circles",
  "Being around one too close will drain your energy",
  "Every twenty-five points, your energy will be restored!",
  "Good luck!"
]

var extrovertText = [
  "Click on the pulsing square to get started",
  "Hi there!",
  "Keep clicking on the pulsing square to increase your score",
  "You'll see your score at the bottom",
  "And your energy below that",
  "When you reach zero energy, the game is over!",
  "Keep your energy up by catching falling squares by hovering over them",
  "Whenever a square falls off the screen, you lose energy",
  "Every twenty-five points, your energy will be restored!",
  "Have fun!"
]

var awesomeText = [
  "Awesome job!",
  "Great work!",
  "Amazing!",
  "Splendid!",
  "Wonderfull!",
  "Superb!",
  "Most magnificent!",
  "Excellent!",
  "You're doing great!",
  "Keep it up!",
  "Absolutely wonderful!"
]

var introvertTextColors = ['white', 'aqua', 'violet'];
var extrovertTextColors = ['white', 'yellow', 'orange', 'lightpink'];

var introvertColors = ['blue', 'purple', 'violet', 'aqua', 'dodgerblue'];
var extrovertColors = ['yellow', 'red', 'orange', 'gold', 'lightpink'];

var fallingShapes = [];

var mouseOffset1 = 0;
var mouseOffset2 = 0;
var offset1 = 1;
var offset2 = 1;
const mouseOffset1Max = 10;
const mouseOffset2Max = 20;

var rippleX;
var rippleY;
var rippleRadius = 1;
var maxRippleRadius = 20;
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
        $(".play").css("display", "none");
        $(".score").css("display", "block");
        $(".score").html("score: 0");
        $(".energy").css("display", "block");
        $(".energy").html("energy: 100");
        $("#back").css("display", "block");
        $("#home").css("display", "none");
        textX = random(200, width / 2);
        textY = random(200, height - 200);
        textFill = introvertTextColors[Math.floor(Math.random() * introvertTextColors.length)];
        textSizeDesc = random(30, 50);
        powerupRadius = random(50, 100);
        currentText = introvertText[0];
        song = introvertSong;
        song.play();
        powerUp = new PowerUp(introvertColors, "circle");
    })

    $(".extrovert").click(function() {        
        currentMode = extroMode;
        $(".introvert").css("display", "none");
        $(".extrovert").css("display", "none");
        $(".play").css("display", "none");
        $(".score").css("display", "block");
        $(".score").html("score: 0");
        $(".energy").css("display", "block");
        $(".energy").html("energy: 100");
        $("#back").css("display", "block");
        $("#home").css("display", "none");
        textX = random(200, width / 2);
        textY = random(200, height - 200);
        textFill = extrovertTextColors[Math.floor(Math.random() * extrovertTextColors.length)];
        textSizeDesc = random(30, 50);
        powerupRadius = random(50, 100);
        song = extrovertSong;
        song.play();
        currentText = extrovertText[0];
        maxFallingSpeed = 5;
        powerUp = new PowerUp(extrovertColors, "square");
    })
})

function preload() {
  introvertSong = loadSound("../assets/introvertJam.mp3");
  extrovertSong = loadSound("../assets/extrovertJam.mp3");
}

function setup() {
    var canvas = createCanvas(windowWidth, windowHeight);
    width = windowWidth;
    height = windowHeight;
    canvas.parent('canvas');
    background("#1b142a");   
    var maxNumberOfParticles = width / 10;
    if (maxNumberOfParticles > 300) {
      maxNumberOfParticles = 300;
    }
    for(let i = 0;i < maxNumberOfParticles;i++){
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

function soundManager() {
  if (!song.isPlaying()) {
    song.play();
  }
}

function introvert() {
  for(let i = 0;i<ripples.length;i++) {
    ripples[i].ripple();
  }
  trimRipples();

  if (energy > 0) {
    if (time % 2 == 0 && !(lastMouseX == mouseX && lastMouseY == mouseY)) {
      ripples.push(new Ripple(introvertColors, "circle", mouseX, mouseY));
      lastMouseX = mouseX;
      lastMouseY = mouseY;
    }  
    powerUp.drawPowerUp();
    powerUp.checkHasBeenClicked();
    updateDescriptors();
  
    if (powerUp.numberTimesClicked >= 8) {
      for (let j = 0; j < fallingShapes.length; j++) {
        fallingShapes[j].fall();
        fallingShapes[j].checkCollision();
      }      
    }
  } else {
    currentText = "You have run out of energy!";
    updateDescriptors();
  }
  soundManager();
}

function extrovert() {
  for(let i = 0;i<ripples.length;i++) {
    ripples[i].ripple();
  }
  trimRipples();
  updateDescriptors();

  if (energy > 0) {
    if (time % 2 == 0 && !(lastMouseX == mouseX && lastMouseY == mouseY)) {
      ripples.push(new Ripple(extrovertColors, "square", mouseX - (maxRippleRadius / 2), mouseY - (maxRippleRadius / 2)));
      lastMouseX = mouseX;
      lastMouseY = mouseY;
    }  
    powerUp.drawPowerUp();
    powerUp.checkHasBeenClicked();
    if (powerUp.numberTimesClicked >= 8) {
      for (let j = 0; j < fallingShapes.length; j++) {
        fallingShapes[j].fall();
        fallingShapes[j].checkCollision();
      } 
      trimFallingSquares();
    }
  } else {
    currentText = "You have run out of energy!";
  }
  soundManager();
}

function squareCursor() {
  noStroke();
  fill('gold');
  square(mouseX - (maxRippleRadius / 2), mouseY - (maxRippleRadius / 2), maxRippleRadius);
}

function sphereCursor() {
  noStroke();
  fill('aqua');
  ellipse(mouseX, mouseY, (maxRippleRadius / 3) * 2);
}

function drawStartingSymbol() {
    stroke(255);
    strokeWeight(3);
    line(0, height / 2, width, height / 2);
    noFill();
    circle(width / 2, height / 2, height / 4);
}

function updateDescriptors() {
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
  text(currentText, textX, textY);  
}

function spawnNewDescriptor(list, colors) {
  textIndex++;
  textFill = colors[Math.floor(Math.random() * colors.length)];
  currentTextSize = 1;
  if (textIndex < list.length) {
    if (list[textIndex].length > 40) {
      textSizeDesc = random(20, 35);
      textX = random(200, width / 2 - (width / 3));
      textY = random(200, height - 200);
    } else {
      textSizeDesc = (30, 50);
      textX = random(200, width / 2);
      textY = random(200, height - 200);
    }
    currentText = list[textIndex];
  } else {
    currentText = "";
  }
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

function trimFallingSquares() {
  let temp = [];
  for (let i = 0; i < fallingShapes.length; i++) {
    if (fallingShapes[i].y > height) {
      energy-=5;
      $(".energy").html("energy: " + energy);
      temp.push(new FallingSquare());
    } else {
      temp.push(fallingShapes[i]);
    }
  }
  fallingShapes = temp;
}

class FallingCircle {
  constructor() {
    this.r = random(50, 200);
    this.x = random(this.r, width - this.r);
    this.y = 0;
    this.color = introvertColors[Math.floor(Math.random() * introvertColors.length)];
    this.speed = random(1, maxFallingSpeed);
    this.weight = random(2, 5);
  }

  fall() {
    if (this.y > height || this.y < 0) {
      this.speed*=-1;
    } 
    stroke(this.color);
    strokeWeight(this.weight);
    noFill();
    circle(this.x, this.y, this.r);
    this.y += this.speed;
  }

  checkCollision() {
    if (dist(mouseX, mouseY, this.x, this.y) < this.r) {
      energy--;
      $(".energy").html("energy: " + energy);
    }
  }
}

class FallingSquare {
  constructor() {
    this.r = random(75, 200);
    this.x = random(this.r, width - this.r);
    this.y = 0;
    this.color = extrovertColors[Math.floor(Math.random() * extrovertColors.length)];
    this.speed = random(1, maxFallingSpeed);
    this.weight = random(2, 5);
  }

  fall() {
    stroke(this.color);
    strokeWeight(this.weight);
    noFill();
    square(this.x, this.y, this.r);
    this.y += this.speed;
  }

  checkCollision() {
    if ((mouseX > this.x && mouseX < (this.x + this.r) && mouseY > this.y && mouseY < (this.y + this.r))) {
      this.r = random(75, 200);
      this.x = random(this.r, width - this.r);
      this.y = 0;
      this.color = extrovertColors[Math.floor(Math.random() * extrovertColors.length)];
      this.speed = random(1, maxFallingSpeed);
      this.weight = random(2, 5);
    }
  }
}

class PowerUp {
  constructor(colors, shape) {
    this.r = powerupRadius;
    this.colors = colors;
    this.color = this.colors[Math.floor(Math.random() * colors.length)];
    this.x = random(powerupRadius,width - powerupRadius);
    this.y = random(powerupRadius,height - powerupRadius);
    this.type = random(0, 3);
    this.hasBeenClicked = false;
    this.shape = shape;
    this.countdown = 0;
    this.respawnTime = 5;
    this.offset = 1;
    this.numberTimesClicked = 0;
  }

  drawPowerUp() {
    if (!this.hasBeenClicked) {
      noStroke();
      fill(this.color);
      if (this.shape == "circle") {
        circle(this.x, this.y, this.r);
        stroke("white");
        noFill();
        strokeWeight(1);
        circle(this.x, this.y, this.r + this.offset + 2);
        stroke("white");
        noFill();
        strokeWeight(1);
        circle(this.x, this.y, this.r + this.offset + 4);
      } else {
        // Extrovert
        square(this.x, this.y, this.r);
        stroke("white");
        noFill();
        strokeWeight(1);
        square(this.x + (this.offset + 2), this.y + (this.offset + 2), this.r + this.offset + 2);
        stroke("white");
        noFill();
        strokeWeight(1);
        square(this.x - this.offset, this.y - this.offset, this.r + this.offset + 4);
      }
      if (this.offset > 30) {
        this.offset = 1;
      }
      this.offset++;
    } else if (this.countdown > this.respawnTime) {
      this.r = random(50, 100);
      this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
      this.x = random(powerupRadius,width - powerupRadius);
      this.y = random(powerupRadius,height - powerupRadius);
      this.hasBeenClicked = false;
      this.offset = 1;
    }
    this.countdown++;
  }

  checkHasBeenClicked() {
    if (this.shape == "circle") {
      if (mouseIsPressed && !this.hasBeenClicked && (dist(mouseX, mouseY, this.x, this.y) < this.r)) {
        this.hasBeenClicked = true;
        if (textIndex < introvertText.length) {
          spawnNewDescriptor(introvertText, introvertTextColors);
        }
        this.countdown = 0;
        this.respawnTime = random(0, 30);
        this.numberTimesClicked++;
        if (this.numberTimesClicked % 8 == 0 && this.numberTimesClicked != 0) {
          fallingShapes.push(new FallingCircle());
          maxFallingSpeed++;
        }
        if (powerUp.numberTimesClicked % 25 == 0 && powerUp.numberTimesClicked != 0) {
          energy = 100;
          $(".energy").html("energy: " + energy);
          currentText = awesomeText[[Math.floor(Math.random() * awesomeText.length)]];
          textFill = introvertTextColors[Math.floor(Math.random() * introvertTextColors.length)];
          currentTextSize = 1;
          textSizeDesc = (30, 50);
          textX = random(200, width / 2);
          textY = random(200, height - 200);
        } else if (textIndex >= introvertText.length) {
          currentText="";
        }
        particleMode = Math.floor(random(0, numOfParticleModes));  
        $(".score").html("score: " + this.numberTimesClicked);
      }
    } else {
      // Square
      if (mouseIsPressed && !this.hasBeenClicked && (mouseX > this.x && mouseX < (this.x + this.r) && mouseY > this.y && mouseY < (this.y + this.r)) ) {
        this.hasBeenClicked = true;
        if (textIndex < extrovertText.length) {
          spawnNewDescriptor(extrovertText, extrovertTextColors);
        }
        this.countdown = 0;
        this.respawnTime = random(0, 30);
        this.numberTimesClicked++;
        if (this.numberTimesClicked % 10 == 0 && this.numberTimesClicked != 0) {
          if (fallingShapes.length < 12) {
            fallingShapes.push(new FallingSquare());
          }
          if (maxFallingSpeed < 20) {
            maxFallingSpeed++;
          }
        }
        if (powerUp.numberTimesClicked % 25 == 0 && powerUp.numberTimesClicked != 0) {
          energy = 100;
          maxFallingSpeed = minimumFallingSpeed;
          if (minimumFallingSpeed < 15) {
            minimumFallingSpeed++;
          }
          currentText = awesomeText[[Math.floor(Math.random() * awesomeText.length)]];
          textFill = extrovertTextColors[Math.floor(Math.random() * extrovertTextColors.length)];
          currentTextSize = 1;
          textSizeDesc = (30, 50);
          textX = random(200, width / 2);
          textY = random(200, height - 200);
        } else if (textIndex >= extrovertText.length) {
          currentText="";
        }
        particleMode = Math.floor(random(0, numOfParticleModes));  
        $(".score").html("score: " + this.numberTimesClicked);
      }
    }
  }
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

class Particle {
  constructor(colors, shape){
    this.x = random(0,width);
    this.y = random(0,height);
    this.r = random(5,20);
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.shape = shape;
    this.xSpeed = random(-2,2);
    this.ySpeed = random(-2,2);
    this.cluster = 0;
  }

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
      this.ySpeed = random(-2,2);
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
    