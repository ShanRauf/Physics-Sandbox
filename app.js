import Box from './js/bodies/Box';
import Circle from './js/bodies/Circle';
import Pendulum from './js/bodies/Pendulum';
// import Trapezoid from './js/bodies/Trapezoid';
// import Polygon from './js/bodies/Polygon';

// module aliases
const Engine = Matter.Engine;
const World = Matter.World;
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
console.log(box1);

var ground = new Box(400, 600, 810, 60, { isStatic: true, friction: 1, restitution: 1 });

var circle1 = new Circle(300, 300, 30);
console.log(circle1);

var pendulum = new Pendulum(400, 400, 1, 20, 50);
console.log(pendulum);

var objects = [box1, circle1, ground];


// const s = (sketch) => {    
//     sketch.setup = () => {
//         var canvas = sketch.createCanvas(800, 800);        

//         World.add(world, [box1.body, circle1.body, ground.body]);
//         // Engine.run(engine);

//         var canvasmouse = Mouse.create(canvas.elt);
//         canvasmouse.pixelRatio = sketch.pixelDensity();
//         mConstraint = MouseConstraint.create(engine, {
//                 mouse: canvasmouse,
//                 angularStiffness: 1 // Allow bodies to rotate while on mouse
//         });

//         World.add(world, mConstraint);  
//     }

//     sketch.draw = () => {
//         sketch.background(51);
        
//         for (let i = 0; i < objects.length; i++) {
//             if(objects[i].isOffScreen(sketch)) {
//                 World.remove(world, objects[i].body);
//                 objects.splice(i, 1);
//                 i--
//             }
//             else {
//                 objects[i].show(sketch);
//             } 
//         }
    
//         if (mConstraint.body) {
//                 var pos = mConstraint.body.position;
//                 sketch.fill(0,255,0);
//                 sketch.ellipse(pos.x, pos.y, 60, 60);
//             }
//     }
//     // sketch.mouseDragged = () => {
//     //     let circle2 = new Circle(sketch.mouseX, sketch.mouseY, 30);
//     //     World.add(world, circle2.body);
//     //     objects.push(circle2);
//     // }
// }

// var P5 = new p5(s);

window.onload = () => {
    
    var canvasmouse = Mouse.create(document.body);
    mConstraint = MouseConstraint.create(engine, {
            mouse: canvasmouse,
            angularStiffness: 1 // Allow bodies to rotate while on mouse
    });

    World.add(world, [box1.body, circle1.body, ground.body]);
    World.add(world, mConstraint);
    
    Engine.run(engine);

    var options = {
        width: 800,
        height: 800
    }

    // create a renderer
    var render = Render.create({
        element: document.body,
        engine: engine,
        options: options
    });
    console.log(render);

    // run the renderer
    Render.run(render);
}

