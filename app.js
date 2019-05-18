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

var mConstraint;



var box1 = new Box(200, 100, 80, 80);
var ground = new Box(400, 600, 810, 60, { isStatic: true, friction: 1, restitution: 1 });
var circle1 = new Circle(300, 300, 30);
var pendulum = new Pendulum(400, 400, 1, 20, 80);
var car = new Car(400, 400, 150, 30, 30);
var cradle = new NewtonCradle(280, 100, 5, 30, 200);

window.onload = () => {
    const simulatorContainer = document.getElementById('physics-simulator');

    var options = {
        width: 800,
        height: 800,
        showCollisions: true,
        wireframes: false
    }

    // create a renderer
    var render = Render.create({
        element: simulatorContainer,
        engine: engine,
        options: options
    });

    // run the renderer
    Render.run(render);


            World.add(world, [box1.body, circle1.body, ground.body, car.body, cradle.body]);
            Engine.run(engine); 

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


   // // an example of using collisionStart event on an engine
   //  Events.on(engine, 'collisionStart', function(event) {
   //      var pairs = event.pairs;

   //      // change object colours to show those starting a collision
   //      for (var i = 0; i < pairs.length; i++) {
   //          var pair = pairs[i];
   //          pair.bodyA.render.fillStyle = '#333';
   //          pair.bodyB.render.fillStyle = '#333';
   //      }
   //  });


   //  // an example of using collisionEnd event on an engine
   //  Events.on(engine, 'collisionEnd', function(event) {
   //      var pairs = event.pairs;

   //      // change object colours to show those ending a collision
   //      for (var i = 0; i < pairs.length; i++) {
   //          var pair = pairs[i];

   //          pair.bodyA.render.fillStyle = '#222';
   //          pair.bodyB.render.fillStyle = '#222';
   //      }
   //  });



    // // an example of using composite events on the world
    // Events.on(world, 'afterAdd', function(event) {
    //     console.log('added to world:', event.object);
    // });

}

//         const s = (sketch) => {    
//         sketch.setup = () => {
//             var canvas = sketch.createCanvas(800, 800);            
//             var canvasmouse = Mouse.create(canvas.elt);
//             canvasmouse.pixelRatio = sketch.pixelDensity();
//             mConstraint = MouseConstraint.create(engine, {
//                     mouse: canvasmouse,
//                     angularStiffness: 1 // Allow bodies to rotate while on mouse
//             });
//             World.add(world, mConstraint);
 
//         }

//         sketch.draw = () => {
//             sketch.background(51);
            
//             for (let i = 0; i < objects.length; i++) {
//                 if(objects[i].isOffScreen(sketch)) {
//                     World.remove(world, objects[i].body);
//                     objects.splice(i, 1);
//                     i--
//                 }
//                 else {
//                     objects[i].show(sketch);
//                 } 
//             }
        
//             if (mConstraint.body) {
//                     var pos = mConstraint.body.position;
//                     sketch.fill(0,255,0);
//                     sketch.ellipse(pos.x, pos.y, 60, 60);
//                 }
//         }
//         sketch.mouseDragged = () => {
//             let circle2 = new Circle(sketch.mouseX, sketch.mouseY, 30);
//             World.add(world, circle2.body);
//             objects.push(circle2);
//         }
//     }

//     var P5 = new p5(s);
// }