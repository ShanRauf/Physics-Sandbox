// import {Bodies} from "matter";
import Box from './js/bodies/Box.js';

// module aliases
var Engine = Matter.Engine;
var World = Matter.World;

var engine;
var world;
var ground = Matter.Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
var box1 = new Box(200, 100, 50, 50);

let s = (sk) => {    
    sk.setup = () =>{
        sk.createCanvas(800, 800);;
        engine = Engine.create();
        world = engine.world

        Engine.run(engine);
    
        World.add(world, [box1, ground]);
    }

    sk.draw = () =>{
        sk.background(51);
        // box1.show();
    }
}

const P5 = new p5(s);