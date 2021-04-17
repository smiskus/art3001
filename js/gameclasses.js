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
    constructor(colors, shape, xmin, xmax, ymin, ymax){
      this.x = random(xmin, xmax);
      this.y = random(ymin, ymax);
      this.r = random(5,20);
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.shape = shape;
      this.xSpeed = random(-2,2);
      this.ySpeed = random(-2,2);
      this.cluster = 0;
      this.xmin = xmin;
      this.xmax = xmax;
      this.ymin = ymin;
      this.ymax = ymax;
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
      if(this.x < this.xmin || this.x > this.xmax)
        this.xSpeed*=-1;
      if(this.y < this.ymin || this.y > this.ymax)
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
      if(this.x < this.xmin || this.x > this.xmax)
      this.xSpeed*=-1;
      if(this.y < this.ymin || this.y > this.ymax)
      this.ySpeed*=-1;
      if (Math.floor(this.x) % 10 == 0) {
        this.y+=this.ySpeed;
      } else {
        this.x+=this.xSpeed;
        this.y+=this.ySpeed;
      }
    }
  
    horizontalLineParticles() {
      if(this.x < this.xmin || this.x > this.xmax)
      this.xSpeed*=-1;
      if(this.y < this.ymin || this.y > this.ymax)
      this.ySpeed*=-1;
      if (Math.floor(this.y) % 10 == 0) {
        this.x+=this.xSpeed;
      } else {
        this.x+=this.xSpeed;
        this.y+=this.ySpeed;
      }
    }
  
    gridParticles() {
      if(this.x < this.xmin || this.x > this.xmax)
      this.xSpeed*=-1;
      if(this.y < this.ymin || this.y > this.ymax)
      this.ySpeed*=-1;
      if (Math.floor(this.y) % 10 != 0 || Math.floor(this.x) % 10 != 0) {
        this.x+=this.xSpeed;
        this.y+=this.ySpeed;
      }
    }
  
    scatterParticle() {
      this.x+=this.xSpeed;
      this.y+=this.ySpeed;
      return (this.x < this.xmin || this.x > this.xmax) && (this.y < this.ymin || this.y > this.ymax);
    }
  
    unscatterParticles() {
      if (this.x < this.xmin || this.x > this.xmax) {
        this.xSpeed*=-1;
        if (this.x < 0) {
          this.x = 0; 
        } else {
          this.x = width;
        }     
      }
      if(this.y < this.ymin || this.y > this.ymax) {
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