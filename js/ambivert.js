let ambivertSong;
let canvas;
const introMode = 0;
const extroMode = 1;
var mode = introMode;
let counter = 0;

var introvertColors = ['blue', 'purple', 'violet', 'aqua', 'dodgerblue'];
var extrovertColors = ['yellow', 'red', 'orange', 'gold', 'lightpink'];

function preload() {
  ambivertSong = loadSound("../../assets/ambivertJam.m4a");
}

$(document).ready( function() { 

  canvas = document.getElementById('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  $("#canvas").hover(function() {
    if (!ambivertSong.isPlaying()) {
      ambivertSong.play();
    }
  })

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
  rock = Bodies.circle(400, 300, 15, rockOptions),
  anchor = { x: 400, y: 300 },
  elastic = Constraint.create({ 
      pointA: anchor, 
      bodyB: rock, 
      stiffness: 0.05
  });

  var pyramid = Composites.stack(0, 0, 20, 2, 0, 0, function(x, y) {
    var introOptions = {
      render: {
        fillStyle: introvertColors[Math.floor(Math.random() * introvertColors.length)]
      }
    }
    return Bodies.circle(x, y, 10, introOptions);
  });

  var ground2 = Bodies.rectangle(610, 250, 200, 20, { isStatic: true, render: { fillStyle: '#060a19' } });

  var pyramid2 = Composites.stack(400, 0, 25, 2, 0, 0, function(x, y) {
    var extroOptions = {
      render: {
        fillStyle: extrovertColors[Math.floor(Math.random() * extrovertColors.length)]
      }
    }
    return Bodies.rectangle(x, y, 15, 15, extroOptions);
  });

  Composite.add(engine.world, [ground, pyramid, pyramid2, rock, elastic]);

  Events.on(engine, 'afterUpdate', function() {
      if (mouseConstraint.mouse.button === -1 && (rock.position.x > 405 || rock.position.y < 295)) {
        if (mode == introMode) {
          var size = random(10, 30);
          rockOptions = { 
            density: 0.004,
            render: {
              fillStyle: introvertColors[Math.floor(Math.random() * introvertColors.length)]
            }
          }
          rock = Bodies.circle(400, 300, size, rockOptions);
        } else {
          var size = random(20, 40);
          rockOptions = { 
            density: 0.004,
            render: {
              fillStyle: extrovertColors[Math.floor(Math.random() * extrovertColors.length)]
            }
          }
          rock = Bodies.rectangle(400, 300, size, size, rockOptions);
        }
        counter++;
        if (counter % 5 == 0) {
          engine.world.gravity.y = 1;
        } else if (counter % 5 == 1) {
          engine.world.gravity.y = -1;
        } else if (counter % 5 == 2) {
          engine.world.gravity.y = 0;
        } else if (counter % 5 == 3) {
          engine.world.gravity.y = 1;
          mode = (mode == introMode) ? extroMode : introMode;
        } else if (counter % 5 == 4) {
          engine.world.gravity.y = -1;
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
