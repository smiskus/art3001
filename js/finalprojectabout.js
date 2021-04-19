const introvertFacts = [
  "They like focusing on their inner thoughts and like to process things before acting upon them.",
  "While sometimes viewed as shy and quiet, this does not define the introvert personality.",
  "Introverts get drained by being around too many people, and often like to keep few but very close friendships,",
  "They are more comfortable with writing their thoughts down than speaking them, as they'll be able to take the time to sort out what they want to say.",
  "When working on tasks, introverts often prefer to work alone and be independent.",
  "Introverts are those who get their energy from being alone."
]

const extrovertFacts = [
  "They like talking to other people and sparking discussions to solve problems.",
  "While sometimes perceived as being rash and bold, this does not define the extrovert personality.",
  "Extroverts don't mind being the center of attention and often take on leadership roles because they enjoy group interaction.",
  "They often make a lot of friends because they enjoy being in large groups.",
  "In general, they like taking more risks and making quick decisions.",
  "Extroverts are those who get their energy from being around others."
]

const ambivertFacts = [
  "Ambiverts have a balance both traits!",
  "They can change based on the situation and context.",
  "So they might really enjoy being in large groups",
  "But also value having alone time as well",
  "Not everyone is solely one personality over another",
  "We all have a mix of traits, which makes us unique",
  "These definitions just help us understand ourselves better"
]

let introvertParticles = [];
var introvertColors = ['blue', 'purple', 'violet', 'aqua', 'dodgerblue'];

let extrovertedParticles = [];
var extrovertColors = ['yellow', 'red', 'orange', 'gold', 'lightpink'];

var particleMode = 0;
var time = 0;
var powerupRadius = 60;
var ambivertIndex = 0;

let introPowerUp;
let extroPowerUp;

let lastMouseX;
let lastMouseY;
let ripples = [];

$(document).ready( function() { 
  $(".bottom-text").hover(function() {
    $(".bottom-text").css("cursor", "pointer");
  })

  $(".bottom-text").click(function() {
    $(".bottom-text").text(ambivertFacts[ambivertIndex % ambivertFacts.length]);
    ambivertIndex++;
  })
})

function setup() {
    var canvas = createCanvas(windowWidth, windowHeight / 3);
    width = windowWidth;
    height = windowHeight / 3;
    canvas.parent('canvas-introvert');
    background("#1b142a");   
    var maxNumberOfParticles = width / 50;
    if (maxNumberOfParticles > 150) {
      maxNumberOfParticles = 150;
    }
    for(let i = 0;i < maxNumberOfParticles;i++){
        introvertParticles.push(new Particle(introvertColors, "circle", 0, width / 2, 0, height));
        extrovertedParticles.push(new Particle(extrovertColors, "square", windowWidth / 2, windowWidth, 0, height));
    }
    maxRippleRadius = width / 20;
    introPowerUp = new IntroPowerUp();
    extroPowerUp = new ExtroPowerUp();
}

function draw() {
    background("#1b142a"); 
    drawParticles(introvertParticles);
    drawParticles(extrovertedParticles);
    introPowerUp.drawPowerUp();
    introPowerUp.checkHasBeenClicked();
    extroPowerUp.drawPowerUp();
    extroPowerUp.checkHasBeenClicked();
    for(let i = 0;i<ripples.length;i++) {
        ripples[i].ripple();
      }
    trimRipples();
    if (mouseX > width / 2) {
        if (time % 2 == 0 && !(lastMouseX == mouseX && lastMouseY == mouseY)) {
            ripples.push(new Ripple(extrovertColors, "square", mouseX - (maxRippleRadius / 2), mouseY - (maxRippleRadius / 2)));
            lastMouseX = mouseX;
            lastMouseY = mouseY;
        }  
        squareCursor();
    } else {
        if (time % 2 == 0 && !(lastMouseX == mouseX && lastMouseY == mouseY)) {
            ripples.push(new Ripple(introvertColors, "circle", mouseX, mouseY));
            lastMouseX = mouseX;
            lastMouseY = mouseY;
        } 
        sphereCursor(); 
    }
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

function trimRipples() {
    let tempArray = [];
    for (let i = 0; i < ripples.length; i++) {
      if (ripples[i].active) {
        tempArray.push(ripples[i]);
      }
    }
    ripples = tempArray;
  } 

function drawParticles(particles) {
    for(let i = 0;i<particles.length;i++) {
        particles[i].createParticle(color);
        particles[i].moveParticle();         
    }
}

class ExtroPowerUp {
  constructor() {
    this.r = powerupRadius;
    this.color = extrovertColors[Math.floor(Math.random() * extrovertColors.length)];
    this.x = random((width / 2) + powerupRadius,width - powerupRadius);
    this.y = random(powerupRadius,height - powerupRadius);
    this.hasBeenClicked = false;
    this.numberTimesClicked = 0;
    this.offset = 1;
  }

  drawPowerUp() {
    if (!this.hasBeenClicked) {
      noStroke();
      fill(this.color);
      square(this.x, this.y, this.r);
      stroke("white");
      noFill();
      strokeWeight(1);
      square(this.x + (this.offset + 2), this.y + (this.offset + 2), this.r + this.offset + 2);
      stroke("white");
      noFill();
      strokeWeight(1);
      square(this.x - this.offset, this.y - this.offset, this.r + this.offset + 4);
      if (this.offset > 30) {
        this.offset = 1;
      }
      this.offset++;      
    } else {
      this.r = random(60, 90);
      this.color = extrovertColors[Math.floor(Math.random() * extrovertColors.length)];
      this.x = random((width / 2) + powerupRadius,width - powerupRadius);
      this.y = random(powerupRadius,height - powerupRadius);
      this.hasBeenClicked = false;
      this.offset = 1;
    }
  }

  checkHasBeenClicked() {
    if (mouseIsPressed && !this.hasBeenClicked && (mouseX > this.x && mouseX < (this.x + this.r) && mouseY > this.y && mouseY < (this.y + this.r)) ) {
      this.hasBeenClicked = true;
      this.numberTimesClicked++;
      $("#extrovert-info").text(extrovertFacts[this.numberTimesClicked % extrovertFacts.length]);
    }
  }
}

class IntroPowerUp {
  constructor() {
    this.r = powerupRadius;
    this.color = introvertColors[Math.floor(Math.random() * introvertColors.length)];
    this.x = random(powerupRadius,(width / 2) - powerupRadius);
    this.y = random(powerupRadius,height - powerupRadius);
    this.hasBeenClicked = false;
    this.numberTimesClicked = 0;
    this.offset = 1;
  }

  drawPowerUp() {
    if (!this.hasBeenClicked) {
      noStroke();
      fill(this.color);
      circle(this.x, this.y, this.r);
      stroke("white");
      noFill();
      strokeWeight(1);
      circle(this.x, this.y, this.r + this.offset + 2);
      stroke("white");
      noFill();
      strokeWeight(1);
      circle(this.x, this.y, this.r + this.offset + 4); 
      if (this.offset > 30) {
        this.offset = 1;
      }
      this.offset++;     
    } else {
      this.r = random(60, 90);
      this.color = introvertColors[Math.floor(Math.random() * introvertColors.length)];
      this.x = random(powerupRadius,(width / 2) - powerupRadius);
      this.y = random(powerupRadius,height - powerupRadius);
      this.hasBeenClicked = false;
      this.offset = 1;
    }
  }

  
  checkHasBeenClicked() {
    if (mouseIsPressed && !this.hasBeenClicked && (dist(mouseX, mouseY, this.x, this.y) < this.r)) {
      this.hasBeenClicked = true;
      this.numberTimesClicked++;
      $("#introvert-info").text(introvertFacts[this.numberTimesClicked % introvertFacts.length]);
    }
  }
}