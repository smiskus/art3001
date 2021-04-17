let introvertParticles = [];
var introvertColors = ['blue', 'purple', 'violet', 'aqua', 'dodgerblue'];

let extrovertedParticles = [];
var extrovertColors = ['yellow', 'red', 'orange', 'gold', 'lightpink'];

var particleMode = 0;
var time = 0;

let lastMouseX;
let lastMouseY;
let ripples = [];

function setup() {
    var canvas = createCanvas(windowWidth, windowHeight / 2);
    width = windowWidth;
    height = windowHeight / 2;
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
}

function draw() {
    background("#1b142a"); 
    drawParticles(introvertParticles);
    drawParticles(extrovertedParticles);
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