var width;
var height;
var currentMode = 0;
let particles = [];
const defaultMode = 0;
const hoverIntro = 1;
const hoverExtro = 2;
const introMode = 3;
const extroMode = 4;

$(document).ready( function() {   
    $(".introvert").hover(function() {        
        currentMode = hoverIntro;
    }, function() {
        currentMode = defaultMode;
    })

    $(".extrovert").hover(function() {        
        currentMode = hoverExtro;
    }, function() {
        currentMode = defaultMode;
    })

    $(".introvert").click(function() {        
        currentMode = introMode;
    })

    $(".extrovert").click(function() {        
        currentMode = extroMode;
    })
})

function setup() {
    var canvas = createCanvas(windowWidth, windowHeight);
    width = windowWidth;
    height = windowHeight;
    console.log("width: " + width + " height: " + height);
    canvas.parent('canvas');
    background("#1b142a");   
    for(let i = 0;i<width/10;i++){
        particles.push(new Particle());
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    width = windowWidth;
    height = windowHeight;
    background("#1b142a");  

}

function draw() {  
    switch(currentMode) {
        case defaultMode:
            background("#1b142a");    
            drawStartingSymbol();                     
            break;
        case hoverExtro:
            background("#1b142a");   
            drawStartingSymbol(); 
            drawParticles('yellow')          
            break;
        case hoverIntro:
            background("#1b142a");   
            drawStartingSymbol();
            drawParticles('pink')
            break;
        case extroMode:
            background("#1b142a");   
            break;
        case introMode:
            background("#1b142a");   
            break;
        default:
            break;
    }
}

function drawStartingSymbol() {
    stroke(255);
    strokeWeight(3);
    line(0, height / 2, width, height / 2);
    noFill();
    circle(width / 2, height / 2, height / 4);
}

function drawParticles(color) {
    for(let i = 0;i<particles.length;i++) {
        particles[i].createParticle(color);
        particles[i].moveParticle();
        particles[i].joinParticles(particles.slice(i));
    }
}

// this class describes the properties of a single particle.
class Particle {
    // setting the co-ordinates, radius and the
    // speed of a particle in both the co-ordinates axes.
      constructor(){
        this.x = random(0,width);
        this.y = random(0,height);
        this.r = random(1,8);
        this.xSpeed = random(-2,2);
        this.ySpeed = random(-1,1.5);
      }
    
    // creation of a particle.
      createParticle(color) {
        noStroke();
        fill(color);
        circle(this.x,this.y,this.r);
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
    
    // this function creates the connections(lines)
    // between particles which are less than a certain distance apart
      joinParticles(particles) {
        particles.forEach(element =>{
          let dis = dist(this.x,this.y,element.x,element.y);
          if(dis<85) {
            stroke('rgba(255,255,255,0.04)');
            line(this.x,this.y,element.x,element.y);
          }
        });
      }
    }
    