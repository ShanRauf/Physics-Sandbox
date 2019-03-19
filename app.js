import Box from './js/bodies/Box';
import Circle from './js/bodies/Circle';
// import Trapezoid from './js/bodies/Trapezoid';

// module aliases
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const engine = Engine.create();
const world = engine.world;

var box1 = new Box(200, 100, 80, 80);
var ground = new Box(400, 700, 810, 60, { isStatic: true, friction: 1, restitution: 1 });
var circle1 = new Circle(300, 300, 30);

var objects = [box1, circle1, ground];

const s = (sketch) => {    
    sketch.setup = () => {
        sketch.createCanvas(800, 800);        

        World.add(world, [box1.body, circle1.body, ground.body]);
        Engine.run(engine);
    }

    sketch.draw = () => {
        sketch.background(51);
        
        for (let i = 0; i < objects.length; i++) {
            objects[i].show(sketch);
        }
    }
    sketch.mouseDragged = () => {
        let circle2 = new Circle(sketch.mouseX, sketch.mouseY, 30);
        World.add(world, circle2.body);
        objects.push(circle2);
    }
}

var P5 = new p5(s);