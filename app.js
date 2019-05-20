var Matter = require('matter-js');

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

// Objects
var box1 = new Box(100, 100, 80, 80);
var ground = new Box(400, 530, 1200, 60, { isStatic: true, render: {visible: false}, friction: 0.1, restitution: 1 });
var circle1 = new Circle(300, 300, 30);
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
    World.add(world, [box1.body, circle1.body, ground.body, car.body, cradle.body]);

    Engine.run(engine);
}