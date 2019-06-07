var Matter = require('matter-js');

var matterAttractors = require('matter-attractors');
Matter.use('matter-attractors');

import Box from './js/bodies/Box';
import Circle from './js/bodies/Circle';
import Pendulum from './js/bodies/Pendulum';
import Car from './js/bodies/Car';
import NewtonCradle from './js/bodies/NewtonCradle';
import Ruler from './js/bodies/Ruler';
import Stopwatch from './js/Stopwatch';
import {pad0, clearChildrne} from './js/Stopwatch';

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

var defaultCategory = 0x0001,
    transparentCategory = 0x0002,
    groundCategory = 0x0003;

var objectNumber = 0; // Keeps track of total objects added; used to reference objects

var objects = {}; // Stores all objects in simulation

var showTrail = false; // When user presses button to make true, a trail will follow objects

var currentRow = 0; // Start at row index 0 for ground, then it increments/decrements based on adding/deleting objects
	console.log("test");
    var sitePath = location.pathname.split('/');
    sitePath = sitePath[sitePath.length - 1];
    console.log(sitePath);
    if(sitePath == 'index.html' || sitePath == '') {
        friction();
    }
    else if(sitePath == 'pendulum.html') {
        pendulum();
    }
    else if(sitePath == 'wrecking-ball.html') {
        wreckingBall();
    } 
    else if(sitePath == 'momentum.html') {
        momentum();
    } 
    else if(sitePath == 'static-equilibrium.html') {
        staticEquilibrium();
    }
    else if(sitePath == 'incline.html') {
        incline();
    }

window.onload = () => {
	const simulatorContainer = document.getElementById('physics-simulator');
    const table = document.getElementById("table");
    const applyForceButton = document.getElementById("apply-force");

    var stopwatch = new Stopwatch(
        document.querySelector('.stopwatch'),
        document.querySelector('.results')
    );

    document.getElementById("start").addEventListener("click", function() {
        stopwatch.start();
    });
    document.getElementById("lap").addEventListener("click", function() {
        stopwatch.lap();
    });
    document.getElementById("pause").addEventListener("click", function() {
        stopwatch.pause();
    });
    document.getElementById("restart").addEventListener("click", function() {
        stopwatch.restart();
    });
    document.getElementById("reset").addEventListener("click", function() {
        stopwatch.reset();
    });
    document.getElementById("clear").addEventListener("click", function() {
        stopwatch.clear();
    });

    // Renderer options
    var options = {
        width: 960,
        height: 540,
        showCollisions: false,
        wireframes: false,
        background: './img/grass-field.jpg'
    }

    var render = Render.create({
        element: simulatorContainer,
        engine: engine,
        options: options
    });
    Render.run(render);
    
    Engine.run(engine);

    var rulerHorizontal = new Ruler(500, 510, 1020, 1, {
        collisionFilter: {
            category: 0x0002,
            mask: 0x0002
        },
        render: {
            sprite: {
                    texture: './img/rulerHorizontal.png'
                }
            }
        }
    );
    World.add(world, rulerHorizontal.body);

    var ground = new Box(400, 540, 1200, 60, {
        label: 'ground' + objectNumber, 
        friction: 0, 
        isStatic: true, 
        collisionFilter: {category: transparentCategory}, 
        render: {visible: false}, 
        restitution: 0 });
    World.add(world, ground.body);
    objects[objectNumber] = ground;
    createRow(ground);

    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: .2,
                render: {
                    visible: false
                }
            }
        });
        mouseConstraint.collisionFilter.mask = defaultCategory | transparentCategory;
        mouseConstraint.collisionFilter.category = defaultCategory;
    Mouse.setElement(mouse, simulatorContainer);
    World.add(world, mouseConstraint);

    Events.on(mouseConstraint, "mousedown", () => {
        if(mouseConstraint.body == null) {
            // Do nothing
        }
        else {
            if (mouseConstraint.body.render.lineWidth == 0) {
                mouseConstraint.body.render.lineWidth = 10;
                let objectIndex = parseInt(mouseConstraint.body.id) - 3; // cuz 1st object after ground has id of 4 i guess...
                applyForceButton.addEventListener("click", function(){
                    let xVector = parseFloat(document.getElementById("force").value.split(" ")[0]);
                    let yVector = parseFloat(document.getElementById("force").value.split(" ")[1]);
                    yVector *= -1;
                    
                    Body.applyForce(
                        objects[objectIndex].body, 
                        Vector.create(objects[objectIndex].body.position.x, objects[objectIndex].body.position.y), 
                        Vector.create(xVector, yVector)
                    );
                });            
            }
            // else {
            //     mouseConstraint.body.render.lineWidth = 0;
            //     }
           }
    });

    // Physics Constants
    var constantsTable = document.getElementById('physics-constants-table');
    constantsTable.rows[1].cells[1].innerHTML = world.gravity.y;

    $('#physics-constants-table tr td').on("DOMSubtreeModified", function(){
        var physicsConstant = this.cellIndex; // which column
        // if((isNaN(this.innerHTML) || this.innerHTML == '' || this.innerHTML > 100) || this.innerHTML < 0) {
        //     return;
        // }
        if(physicsConstant == 1) { // Gravity
            world.gravity.y = this.innerHTML;
        }
        else if(objectNumber == 1) { // Air Resistance
            for(let i=0; i<objects.length; i++) {
                objects[this.parentNode.id].body.frictionAir = this.innerHTML;
            }
        }
    });

    function createRow(object) {
        var row = table.insertRow(currentRow);
        currentRow++;
        row.id = objectNumber;

        var objectLabel = row.insertCell(0);
        objectLabel.id = objectNumber;
        objectLabel.contentEditable = 'true';
        objectLabel.className += 'pt-3-half';
        objectLabel.innerHTML = object.body.label;

        var mass = row.insertCell(1);
        mass.id = objectNumber;
        mass.contentEditable = 'true';
        mass.className += 'pt-3-half';
        mass.innerHTML = object.body.mass;

        var position = row.insertCell(2);
        position.id = objectNumber;
        position.contentEditable = 'true';
        position.className += 'pt-3-half';
        position.innerHTML = object.body.position.x + ' ' + object.body.position.y;

        var velocity = row.insertCell(3);
        velocity.id = objectNumber;
        velocity.contentEditable = 'true';
        velocity.className += 'pt-3-half';
        velocity.innerHTML = object.body.velocity.x + ' ' + object.body.velocity.y;

        var torque = row.insertCell(4);
        torque.id = objectNumber;
        torque.contentEditable = 'true';
        torque.className += 'pt-3-half';
        torque.innerHTML = object.body.torque;

        var angularVelocity = row.insertCell(5);
        angularVelocity.id = objectNumber;
        angularVelocity.contentEditable = 'true';
        angularVelocity.className += 'pt-3-half';
        angularVelocity.innerHTML = object.body.angularVelocity;

        var inertia = row.insertCell(6);
        inertia.id = objectNumber;
        inertia.contentEditable = 'true';
        inertia.className += 'pt-3-half';
        inertia.innerHTML = object.body.inertia.toFixed(4);

        var density = row.insertCell(7);
        density.id = objectNumber;
        density.contentEditable = 'true';
        density.className += 'pt-3-half';
        density.innerHTML = object.body.density.toFixed(4);

        var restitution = row.insertCell(8);
        restitution.id = objectNumber;
        restitution.contentEditable = 'true';
        restitution.className += 'pt-3-half';
        restitution.innerHTML = object.body.restitution;

        var friction = row.insertCell(9);
        friction.id = objectNumber;
        friction.contentEditable = 'true';
        friction.className += 'pt-3-half';
        friction.innerHTML = object.body.friction;

        var frictionStatic = row.insertCell(10);
        frictionStatic.id = objectNumber;
        frictionStatic.contentEditable = 'true';
        frictionStatic.className += 'pt-3-half';
        frictionStatic.innerHTML = object.body.frictionStatic;

        var removeButton = row.insertCell(11);
        var btn = document.createElement("BUTTON");
        btn.innerHTML = 'Remove';
        btn.className += 'btn btn-danger btn-rounded btn-sm my-0';
        btn.value = objectNumber; // Used to locate the object to remove from world
        removeButton.appendChild(btn);
        btn.addEventListener("click", function(){
            World.remove(world, objects[this.value].body);
            table.deleteRow(this.parentNode.parentNode.rowIndex-1);
            currentRow--;
        });

        Events.on(engine, "afterUpdate", function(){
            if (document.getElementById("object-path-checkbox").checked) {
                showTrail = true;
            }
            else {
                showTrail = false;
            }
            if(showTrail) {
                // render.context.fillRect(objects[objectNumber].body.position.x, objects[objectNumber].body.position.y, 5, 5);
            }
        })

        objectNumber++;

        $('#table tr td').on("DOMSubtreeModified", function(){
            var objectColumn = this.cellIndex;
            var currentObject = this.id; // id of <td> is the key of the objected being editted in objects
            
            // Need if statement to avoid invalid inputs - prev statemetn wasn't working...

            if(objectColumn == 0) {
                objects[currentObject].body.label = this.innerHTML;
            }
            else if(objectColumn == 1) {
                Body.setMass(objects[currentObject].body, this.innerHTML);
            }
            else if(objectColumn == 2) {
                Body.setPosition(objects[currentObject].body, Vector.create(
                    parseInt(this.innerHTML.split(" ")[0]),
                    540 - parseInt(this.innerHTML.split(" ")[1])
                ));
            }
            else if(objectColumn == 3) {
                Body.setVelocity(objects[currentObject].body, Vector.create(
                    parseInt(this.innerHTML.split(" ")[0]),
                    parseInt(this.innerHTML.split(" ")[1])
                ));
            }
            else if(objectColumn == 4) {
                objects[currentObject].body.torque = this.innerHTML;
            }
            else if(objectColumn == 5) {
                Body.setAngularVelocity(objects[currentObject].body, this.innerHTML);
            }
            else if(objectColumn == 6) {
                Body.setInertia(objects[currentObject].body, this.innerHTML);
            }
            else if(objectColumn == 7) {
                Body.setDensity(objects[currentObject].body, this.innerHTML);
            }
            else if(objectColumn == 8) {
                objects[currentObject].body.restitution = this.innerHTML;
            }
            else if(objectColumn == 9) {
                objects[currentObject].body.friction = this.innerHTML;
            }
            else if(objectColumn == 10) {
                objects[currentObject].body.frictionStatic = this.innerHTML;
            }
        });
    }

	document.getElementById("create-box-button").addEventListener("click", createBox);
	document.getElementById("create-circle-button").addEventListener("click", createCircle);
	document.getElementById("create-car-button").addEventListener("click", createCar);

    function createBox() {
        var box = new Box(550, 100, 60, 60, {
            friction: 1, 
            mass: 15,
            collisionFilter: {
                category: defaultCategory}, 
            frictionAir: 0});
        World.add(world, box.body);
        box.body.label += objectNumber;
        objects[objectNumber] = box;
        createRow(box);
    }

    function createCircle() {
        var circle = new Circle(400, 100, 66, {
        friction: 0.3, 
        collisionFilter: {
            category: defaultCategory},
        restitution: 0,
        render: {
            sprite: {
                texture: './img/tempCircle.png'
            }
        },
        frictionAir: 0
        });
        World.add(world, circle.body);
        circle.body.label += objectNumber;
        objects[objectNumber] = circle;
        createRow(circle);
    }

    function createCar() {
        var car = new Car(500, 100, 200, 40, 35);
        World.add(world, car.body);
    }
}

function friction() {

}

function pendulum() {
    var cradle = new NewtonCradle(280, 100, 5, 30, 200);
    World.add(world, cradle.body);
}

function wreckingBall() {
    const objects = [];
    var ground = new Box(400, 540, 1200, 60, {label: 'ground', friction: 0, isStatic: true, collisionFilter: {category: transparentCategory}, render: {visible: false}, restitution: 0 });
    World.add(world, ground.body);
    // // Wrecking Ball
    var rows = 10,
        yy = 600 - 21 - 40 * rows;
    
    var stack = Composites.stack(400, yy, 5, rows, 0, 0, function(x, y) {
        return Bodies.rectangle(x, y, 40, 40);
    });
    
    World.add(world, [stack]);
    
    var ball = Bodies.circle(100, 300, 50, { density: 0.04, frictionAir: 0.005});
    
    World.add(world, ball);
    World.add(world, Constraint.create({
        pointA: { x: 300, y: 100 },
        bodyB: ball
    }));
}

function momentum() {
}

function staticEquilibrium() {  
	var ground = new Box(400, 540, 1200, 60, {label: 'ground', friction: 0, isStatic: true, collisionFilter: {category: transparentCategory}, render: {visible: false}, restitution: 0 });

    // Catapult
    var group = Body.nextGroup(true);

    var stack = Composites.stack(250, 255, 1, 6, 0, 0, function(x, y) {
        return Bodies.rectangle(x, y, 30, 30);
    });

    var catapult = Bodies.rectangle(400, 470, 320, 20, { collisionFilter: { group: group } });

    World.add(world, ground.body);
    
    World.add(world, [
        stack,
        catapult,
        // Bodies.rectangle(250, 505, 20, 50, { isStatic: true }),
        Bodies.rectangle(400, 485, 20, 80, { isStatic: true, collisionFilter: { group: group } }),
        Bodies.circle(560, 100, 50, { density: 0.005 }),
        Constraint.create({ 
            bodyA: catapult, 
            pointB: Vector.clone(catapult.position),
            stiffness: 1,
            length: 0
        })
    ]);
}

function incline() {
    var incline = new Box(250, 400, 800, 30, {
            isStatic: true,
            friction: 0,
            angle: 0.436332
        });
    World.add(world, incline.body);
}