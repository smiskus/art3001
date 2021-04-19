const ambivertFacts = [
  "USE THE SLINGSHOT TO HIT THE CIRCLE AND SQUARE TARGETS",
  "USE THE SLINGSHOT TO HIT THE CIRCLE AND SQUARE TARGETS",
  "MAKE SURE YOU HIT THE TARGET WITH THE SAME SHAPE",
  "IF YOU HIT THE WRONG TARGET OR YOU MISS YOU LOSE ENERGY",
  "GOOD LUCK!"
]

const awesomeText = [
  "Nice job!",
  "Awesome!",
  "Wonderful!",
  "Right on target!",
  "Bullseye!",
  "Excellent!"
]

let ambivertSong;
let canvas;
const introMode = 0;
const extroMode = 1;
const slingShotPosX = 400;
const slingShotPosY = 400;
var mode = introMode;
let counter = 0;
let currentRock;
let targetRadius = 40;
let rockRadius = 20;
let introTargetX = 100;
let introTargetY = 100;
let score = 0;
let energy = 100;

let extroTargetX = 700;
let extroTargetY = 100;
var hitTarget = false;

var introvertColors = ['blue', 'purple', 'violet', 'aqua', 'dodgerblue'];
var extrovertColors = ['yellow', 'red', 'orange', 'gold', 'lightpink'];

function preload() {
  ambivertSong = loadSound("../../assets/ambivertJam.m4a");
}

$(document).ready( function() { 

  canvas = document.getElementById('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  matterJsSetUp();

})

function matterJsSetUp() {
  // module aliases
  var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Composites = Matter.Composites,
    Events = Matter.Events,
    Constraint = Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Composite = Matter.Composite,
    Bodies = Matter.Bodies;

  // create engine
  var engine = Engine.create(),
    world = engine.world;
  
  // create renderer
  var render = Render.create({
      element: document.getElementById('canvas'),
      engine: engine,
      options: {
        wireframes: false,
        width: window.innerWidth,
        height: window.innerHeight
      }
  });
  
  Render.run(render);
  
  // create runner
  var runner = Runner.create();
  Runner.run(runner, engine);
  
  // add bodies
  var color = introvertColors[Math.floor(Math.random() * introvertColors.length)];

  var ground = Bodies.rectangle(395, 600, 815, 50, { isStatic: true, render: { fillStyle: '#060a19' } }),
  rockOptions = { 
    density: 0.04,
    render: {
      fillStyle: introvertColors[Math.floor(Math.random() * introvertColors.length)]
    }
  },
  rock = Bodies.circle(slingShotPosX, slingShotPosY, rockRadius, rockOptions),
  anchor = { x: slingShotPosX, y: slingShotPosY },
  elastic = Constraint.create({ 
      pointA: anchor, 
      bodyB: rock, 
      stiffness: 0.07
  });

  currentRock = rock;

  var introstack = Composites.stack(0, 0, 20, 2, 0, 0, function(x, y) {
    var introOptions = {
      render: {
        fillStyle: introvertColors[Math.floor(Math.random() * introvertColors.length)]
      }
    }
    return Bodies.circle(x, y, 10, introOptions);
  });

  // Targets
  var introTargetOptions = {
    isStatic: true,
    render: {
      fillStyle: introvertColors[Math.floor(Math.random() * introvertColors.length)]
    }
  }  
  var introTarget = Bodies.circle(introTargetX, introTargetY, targetRadius, introTargetOptions);

  var extroTargetOptions = {
    isStatic: true,
    render: {
      fillStyle: extrovertColors[Math.floor(Math.random() * extrovertColors.length)]
    }
  }
  var extroTarget = Bodies.rectangle(extroTargetX, extroTargetY, targetRadius * 2, targetRadius * 2, extroTargetOptions);

  var ground2 = Bodies.rectangle(395, 0, 815, 50, { isStatic: true, render: { fillStyle: '#060a19' } });

  var extrostack = Composites.stack(400, 0, 25, 2, 0, 0, function(x, y) {
    var extroOptions = {
      render: {
        fillStyle: extrovertColors[Math.floor(Math.random() * extrovertColors.length)]
      }
    }
    return Bodies.rectangle(x, y, 15, 15, extroOptions);
  });

  Composite.add(engine.world, [ground, introstack, ground2, extrostack, rock, elastic, introTarget, extroTarget]);

  Events.on(engine, 'beforeUpdate', function() {

    var rockX = currentRock.position.x;
    var rockY = currentRock.position.y;

    var dxIntro = Math.abs(rockX - introTargetX);
    var dyIntro = Math.abs(rockY - introTargetY);
    var dist = Math.sqrt(dxIntro * dxIntro + dyIntro * dyIntro);

    if (dist < targetRadius + targetRadius && !hitTarget && energy > 0) {
      hitTarget = true;
      if (currentRock.label == 'circle') {
        introTarget.render.fillStyle = introvertColors[Math.floor(Math.random() * introvertColors.length)];
        if (score >= 5 && energy > 0) {
          introTargetX = random(50, 750);
          introTargetY = random(50, 300);
          Matter.Body.setPosition(introTarget, {x: introTargetX, y: introTargetY});
        }
        score++;
        if (score % 15 == 0 && energy > 0) {
          $(".top-text").text(awesomeText[Math.floor(Math.random() * awesomeText.length)]);
          Composite.add(engine.world, introTarget);
          energy += 15;
        } else {
          $(".top-text").text("");
        }
      } else {
        if (score >= 5) {
          energy -= 10;
        }
      }
    }   
    
    if ((rockX < extroTargetX + targetRadius + rockRadius + 3 && rockX > extroTargetX - targetRadius - rockRadius - 3 && rockY < extroTargetY + targetRadius + rockRadius + 3 && rockY > extroTargetY - targetRadius - rockRadius - 3) && !hitTarget && energy > 0) {
      hitTarget = true;
      if (currentRock.label == 'square') {
        extroTarget.render.fillStyle = extrovertColors[Math.floor(Math.random() * extrovertColors.length)];
        if (score >= 5 && energy > 0) {
          extroTargetX = random(50, 750);
          extroTargetY = random(50, 300);
          Matter.Body.setPosition(extroTarget, {x: extroTargetX, y: extroTargetY});
        }
        score++;
        if (score % 15 == 0) {
          $(".top-text").text(awesomeText[Math.floor(Math.random() * awesomeText.length)]);
          energy += 15;
          Composite.add(engine.world, extroTarget);
        } else {
          $(".top-text").text("");
        }
      } else {
        if (score >= 5 && energy > 0) {
          energy -= 10;
          if (energy < 0) {
            energy = 0;
          }
        }
      }
    }

    if (energy > 0) {
      $(".score-text").text("score: " + score);
      $(".energy-text").text("energy: " + energy);
    } else {
      $(".score-text").text("you ran out of energy!");
      $(".energy-text").text("energy: " + energy);
    }

    if (counter > 0 && score < ambivertFacts.length) {
      $(".top-text").text(ambivertFacts[score]);
    }
  })

  Events.on(engine, 'afterUpdate', function() {
      if (mouseConstraint.mouse.button === -1 && (rock.position.y > slingShotPosY + 20)) {
        if (hitTarget == false && score >= 5 && energy > 0) {
          energy -= 5;
          if (energy < 0) {
            energy = 0;
          }
        }
        currentRock = rock;
        hitTarget = false;
        if (!ambivertSong.isPlaying()) {
          ambivertSong.play();
        }
        if (mode == introMode) {
          var size = random(10, 30);
          rockOptions = { 
            density: 0.004,
            label: 'circle',
            render: {
              fillStyle: introvertColors[Math.floor(Math.random() * introvertColors.length)]
            }
          }
          rock = Bodies.circle(slingShotPosX, slingShotPosY, size, rockOptions);
        } else {
          var size = random(20, 40);
          rockOptions = { 
            density: 0.004,
            label: 'square',
            render: {
              fillStyle: extrovertColors[Math.floor(Math.random() * extrovertColors.length)]
            }
          }
          rock = Bodies.rectangle(slingShotPosX, slingShotPosY, size, size, rockOptions);
        }
        counter++;
        if (counter % 2 == 0) {
          var randomInt = Math.floor(Math.random() * 3);
          switch (randomInt) {
            case 0:
              engine.world.gravity.y = -1;
              break;
            case 1:
              engine.world.gravity.y = 0;
              break;
            default:
              engine.world.gravity.y = 1;
              break;
          }
        }

        if (Math.floor(Math.random() * 2) == 1) {
          mode = (mode == introMode) ? extroMode : introMode;
        }

        Composite.add(engine.world, rock);
        elastic.bodyB = rock;        
      }
  });
  
  // add mouse control
  var mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine, {
          mouse: mouse,
          constraint: {
              stiffness: 0.2,
              render: {
                  visible: false
              }
          }
      });
  
  Composite.add(world, mouseConstraint);
  
  // keep the mouse in sync with rendering
  render.mouse = mouse;
  
  // fit the render viewport to the scene
  Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: 800, y: 600 }
  });

  engine.world.gravity.y = 1;
  
  // context for MatterTools.Demo
  return {
      engine: engine,
      runner: runner,
      render: render,
      canvas: render.canvas,
      stop: function() {
          Matter.Render.stop(render);
          Matter.Runner.stop(runner);
      }
  };
}

function setup() {
  
}
