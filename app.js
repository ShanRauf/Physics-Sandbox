var Matter = require('matter-js');

var matterAttractors = require('matter-attractors');
Matter.use('matter-attractors');

import Box from './js/bodies/Box';
import Circle from './js/bodies/Circle';
import Pendulum from './js/bodies/Pendulum';
import Car from './js/bodies/Car';
import NewtonCradle from './js/bodies/NewtonCradle';
// import Trapezoid from './js/bodies/Trapezoid';
// import Polygon from './js/bodies/Polygon';

// module aliases
const Engine = Matter.Engine;
const World = Matter.World;
const Body = Matter.Body;
const Events = Matter.Events;
const Vector = Matter.Vector;
const Bodies = Matter.Bodies;
const engine = Engine.create();
const world = engine.world;
const Composites = Matter.Composites;
const Constraint = Matter.Constraint;
const MouseConstraint = Matter.MouseConstraint;
const Mouse = Matter.Mouse;
const Render = Matter.Render;

// (How to do it) var box1 = new Box(100, 100, 80, 80, {render: {sprite: {texture: './img/box.png'}}});

// Objects
var box1 = new Box(100, 100, 80, 80, {friction: 0});
console.log(box1);
var ground = new Box(400, 540, 1200, 60, { isStatic: true, render: {visible: false}, friction: 0, restitution: 1 });
var circle1 = new Circle(600, 300, 30);
console.log(circle1);
var pendulum = new Pendulum(400, 400, 1, 20, 80);
var car = new Car(400, 400, 150, 30, 30);
var cradle = new NewtonCradle(280, 100, 5, 30, 200);

window.onload = () => {
	const simulatorContainer = document.getElementById('physics-simulator');

    // Renderer options
    var options = {
        width: 960,
        height: 540,
        showCollisions: false,
        wireframes: false,
        background: './img/grass-field.jpg'
    }

    // create a renderer
    var render = Render.create({
        element: simulatorContainer,
        engine: engine,
        options: options
    });

    // run the renderer
    Render.run(render);

	var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 1,
                render: {
                    visible: false
                }
            }
        });
    World.add(world, mouseConstraint);
    World.add(world, ground.body)
    World.add(world, [box1.body, circle1.body]);
    Engine.run(engine);

    // // Wrecking Ball
    // var rows = 10,
    //     yy = 600 - 21 - 40 * rows;
    
    // var stack = Composites.stack(400, yy, 5, rows, 0, 0, function(x, y) {
    //     return Bodies.rectangle(x, y, 40, 40);
    // });
    
    // World.add(world, [stack]);
    
    // var ball = Bodies.circle(100, 300, 50, { density: 0.04, frictionAir: 0.005});
    
    // World.add(world, ball);
    // World.add(world, Constraint.create({
    //     pointA: { x: 300, y: 100 },
    //     bodyB: ball
    // }));

	// Catapult
    // var group = Body.nextGroup(true);

    // var stack = Composites.stack(250, 255, 1, 6, 0, 0, function(x, y) {
    //     return Bodies.rectangle(x, y, 30, 30);
    // });

    // var catapult = Bodies.rectangle(400, 470, 320, 20, { collisionFilter: { group: group } });

    // World.add(world, [
    //     stack,
    //     catapult,
    //     Bodies.rectangle(250, 505, 20, 50, { isStatic: true }),
    //     Bodies.rectangle(400, 485, 20, 80, { isStatic: true, collisionFilter: { group: group } }),
    //     Bodies.circle(560, 100, 50, { density: 0.005 }),
    //     Constraint.create({ 
    //         bodyA: catapult, 
    //         pointB: Vector.clone(catapult.position),
    //         stiffness: 1,
    //         length: 0
    //     })
    // ]);

// 2 attracted objects

// var body = Matter.Bodies.circle(100, 100, 25, {
//   plugin: {
//     attractors: [
//       function(bodyA, bodyB) {
//         return {
//           x: (bodyA.position.x - bodyB.position.x) * 1e-6,
//           y: (bodyA.position.y - bodyB.position.y) * 1e-6,
//         };
//       }
//     ]
//   }
// });
// World.add(world, body);
}