// module aliases
var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;

var engine;
var world;
var box1;
var ground;

function setup() {
    createCanvas(800, 800);
    engine = Engine.create();
    world = engine.world

    ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

    // add bodies to the world
    Engine.run(engine);
    box1 = new Box(200, 100, 50, 50);
    World.add(world, ground);
}

function draw() {
    background(51);
    box1.show();
}