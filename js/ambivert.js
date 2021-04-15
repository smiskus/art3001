let ambivertSong;
function preload() {
    ambivertSong = loadSound("../../assets/ambivertJam.m4a");
    console.log("PRELOADED");
}

$(document).ready( function() { 

    $(".heading").click(function() {
        if (!ambivertSong.isPlaying()) {
            ambivertSong.play();
        }
    })

    // module aliases
    var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
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
      width: 800,
      height: 600,
      wireframes: false
    }
});

Render.run(render);

// create runner
var runner = Runner.create();
Runner.run(runner, engine);

// add bodies
Composite.add(world, [

    Bodies.circle(100, 100, 70, { render: {
        fillStyle: 'blue'
      }}),
    Bodies.circle(100, 100, 40, { render: {
        fillStyle: 'purple'
      }}),
    Bodies.circle(100, 100, 30, { render: {
        fillStyle: 'violet'
      }}),
    Bodies.circle(100, 100, 20, { render: {
        fillStyle: 'aqua'
      }}),
    Bodies.circle(100, 100, 40, { render: {
        fillStyle: 'dodgerblue'
      }}),
    Bodies.circle(100, 100, 30, { render: {
        fillStyle: 'aqua'
      }}),

    Bodies.rectangle(630, 100, 90, 90, { render: {
        fillStyle: 'red'
      }}),
    Bodies.rectangle(610, 100, 40, 40, { render: {
        fillStyle: 'yellow'
      }}),
    Bodies.rectangle(600, 100, 50, 50, { render: {
        fillStyle: 'orange'
      }}),
    Bodies.rectangle(510, 100, 30, 30, { render: {
        fillStyle: 'red'
      }}),
    Bodies.rectangle(590, 100, 100, 100, { render: {
        fillStyle: 'lightpink'
      }}),
    Bodies.rectangle(570, 100, 60, 60, { render: {
        fillStyle: 'gold'
      }}),

    // walls
    Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
    Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
    Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
    Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
]);

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

})

function setup() {
}
