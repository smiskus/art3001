let introvertParticles = [];
var introvertColors = ['blue', 'purple', 'violet', 'aqua', 'dodgerblue'];

let extrovertedParticles = [];
var extrovertColors = ['yellow', 'red', 'orange', 'gold', 'lightpink'];

var particleMode = 0;

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
        introvertParticles.push(new Particle(introvertColors, "circle", 0, width / 2, 0, height / 2));
        extrovertedParticles.push(new Particle(extrovertColors, "square", windowWidth / 2, windowWidth, 0, height));
    }
    maxRippleRadius = width / 20;
}

function draw() {
    drawParticles(introvertParticles);
    drawParticles(extrovertedParticles);
}

function drawParticles(particles) {
    for(let i = 0;i<particles.length;i++) {
        particles[i].createParticle(color);
        particles[i].moveParticle();         
    }
}