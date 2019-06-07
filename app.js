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

window.onload = () => {
	const simulatorContainer = document.getElementById('physics-simulator');
    const table = document.getElementById("table");
    const applyForceButton = document.getElementById("apply-force");
 
    document.getElementById("clear").addEventListener("click", World.clear(world, true));

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
                console.log(mouseConstraint.body);
                var selectedBody = mouseConstraint.body;
                applyForceButton.addEventListener("click", function(){
                    let xVector = parseInt(document.getElementById("force").value.split(" ")[0]);
                    let yVector = parseInt(document.getElementById("force").value.split(" ")[1]);
                    yVector *= -1;
                    
                    Body.applyForce(
                        selectedBody, 
                        Vector.create(selectedBody.position.x, selectedBody.position.y), 
                        Vector.create(xVector, yVector)
                    );
                });            
            }
            else {
                mouseConstraint.body.render.lineWidth = 0;
                }
            }
        });


    // Physics Constants
    var constantsTable = document.getElementById('physics-constants-table');
    constantsTable.rows[1].cells[1].innerHTML = world.gravity.y;

    $('#physics-constants-table tr td').on("DOMSubtreeModified", function(){
        var physicsConstant = this.cellIndex; // which column
        if((isNaN(this.innerHTML) || this.innerHTML == '' || this.innerHTML > 100) || this.innerHTML < 0) {
            // Do nothing - either too large of a value, or nothing in table
            return;
        }
        if(physicsConstant == 1) { // Gravity
            world.gravity.y = this.innerHTML;
        }
        else if(objectNumber == 1) { // Air Resistance
            for(let i=0; i<objects.length; i++) {
                objects[this.parentNode.id].body.frictionAir = this.innerHTML;
            }
        }
    });
    
    var sitePath = window.location.pathname;
    if(sitePath == '/') {
        document.getElementById("create-box-button").addEventListener("click", createBox);
		document.getElementById("create-circle-button").addEventListener("click", createCircle);
		document.getElementById("create-car-button").addEventListener("click", createCar);
        friction();
    }

    else if(sitePath == '/pendulum.html') {
        document.getElementById("create-box-button").addEventListener("click", createBox);
		document.getElementById("create-circle-button").addEventListener("click", createCircle);
		document.getElementById("create-car-button").addEventListener("click", createCar);
        pendulum();
    }
    else if(sitePath == '/wrecking-ball.html') {
        document.getElementById("create-box-button").addEventListener("click", createBox);
		document.getElementById("create-circle-button").addEventListener("click", createCircle);
		document.getElementById("create-car-button").addEventListener("click", createCar);
        wreckingBall();
    } 
    else if(sitePath == '/momentum.html') {
        document.getElementById("create-box-button").addEventListener("click", createBox);
		document.getElementById("create-circle-button").addEventListener("click", createCircle);
		document.getElementById("create-car-button").addEventListener("click", createCar);
        momentum();
    } 
    else if(sitePath == '/static-equilibrium.html') {
        document.getElementById("create-box-button").addEventListener("click", createBox);
		document.getElementById("create-circle-button").addEventListener("click", createCircle);
		document.getElementById("create-car-button").addEventListener("click", createCar);
        staticEquilibrium();
    }
    else if(sitePath == '/incline.html') {
        document.getElementById("create-box-button").addEventListener("click", createBox);
		document.getElementById("create-circle-button").addEventListener("click", createCircle);
		document.getElementById("create-car-button").addEventListener("click", createCar);
        incline();
    }
}


function createRow(object) {
    var row = table.insertRow(objectNumber);
    row.id = objectNumber;
    console.log(objectNumber);

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
    inertia.innerHTML = Math.round(object.body.inertia);

    var density = row.insertCell(7);
    density.id = objectNumber;
    density.contentEditable = 'true';
    density.className += 'pt-3-half';
    density.innerHTML = object.body.density;

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
    });

    objectNumber++;

    $('#table tr td').on("DOMSubtreeModified", function(){
        console.log(this);
        var objectColumn = this.cellIndex;
        var currentObject = this.id; // id of <td> is the key of the objected being editted in objects
        if((isNaN(this.innerHTML) || this.innerHTML == '' || this.innerHTML > 100) || this.innerHTML < 0) {
            return; // Do nothing
        }
        if(objectColumn == 0) {
            objects[currentObject].body.label = this.innerHTML;
        }
        else if(objectColumn == 1) {
            Body.setMass(objects[currentObject].body, this.innerHTML);
        }
        else if(objectColumn == 2) {
            Body.setPosition(objects[currentObject].body, Vector.create(
                Number(document.getElementById("force").value.split(" ")[0]),
                Number(document.getElementById("force").value.split(" ")[0])
            ));
        }
        else if(objectColumn == 3) {
            Body.setVelocity(objects[currentObject].body, Vector.create(
                Number(document.getElementById("force").value.split(" ")[0]),
                Number(document.getElementById("force").value.split(" ")[0])
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

function friction() {

}

function pendulum() {
    var objects = [];
    var ground = new Box(400, 540, 1200, 60, {label: 'ground', friction: 0, isStatic: true, collisionFilter: {category: transparentCategory}, render: {visible: false}, restitution: 0 });
    // var pendulum = new Pendulum(400, 200, 1, 25, 100);
   
    var cradle = new NewtonCradle(280, 100, 5, 30, 200);

    objects = [cradle, ground];
    for (let i=0; i < objects.length; i++) {
        World.add(world, objects[i].body);
    };

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
    var objects = [];
    // Objects
    var ground = new Box(400, 540, 1200, 60, {label: 'ground', friction: 0, isStatic: true, collisionFilter: {category: transparentCategory}, render: {visible: false}, restitution: 0 });
    var box1 = new Box(100, 100, 70, 70, {
        label: 'box1', 
        // render: {
            // sprite: {
            //     texture: './img/box.png'}
            // }, 
        friction: 0.1, 
        collisionFilter: {
            category: defaultCategory}, 
        frictionAir: 0
    });
    console.log(box1);
    var box2 = new Box(300, 100, 70, 70, {
        label: 'box2', 
        // render: {
            // sprite: {
            //     texture: './img/box.png'}
            // }, 
        friction: 0.1, 
        collisionFilter: {
            category: defaultCategory}, 
        frictionAir: 0
    });

    objects = [box1, box2, ground];
    
    for (let i=0; i < objects.length; i++) {
        World.add(world, objects[i].body);
    };
    
    createRows(objects);
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
    var objects = [];

    var ground = new Box(400, 540, 1200, 60, {label: 'ground', friction: 0, isStatic: true, collisionFilter: {category: transparentCategory}, render: {visible: false}, restitution: 0 });
    var incline = new Box(250, 400, 800, 30, {
        isStatic: true,
        friction: 0,
        angle: 0.436332
    });

    var box1 = new Box(100, 100, 80, 80, {
        label: 'box', 
        // render: {
            // sprite: {
            //     texture: './img/box.png'}
            // }, 
        friction: 0.1, 
        collisionFilter: {
            category: defaultCategory}, 
        frictionAir: 0});
    
    var circle1 = new Circle(600, 300, 49, {
    label: 'circle',
    render: {
        sprite: {
            texture: './img/ball.png'}
        },
    friction: 0.1, 
    collisionFilter: {
        category: defaultCategory},
    restitution: 0,
    frictionAir: 0
    });

    objects = [box1, circle1, incline, ground];

    for (let i=0; i < objects.length; i++) {
        World.add(world, objects[i].body);
    };

    createRows(objects);
}

function createBox() {
	var box = new Box(550, 100, 60, 60, {
        friction: 1, 
        mass: 15,
        collisionFilter: {
            category: defaultCategory}, 
        frictionAir: 0});
	World.add(world, box.body);
    objects[objectNumber] = box;
	createRow(box);
}

function createCircle() {
	var circle = new Circle(400, 100, 36, {
    friction: 0, 
    collisionFilter: {
        category: defaultCategory},
    restitution: 0,
    frictionAir: 0
    });
	World.add(world, circle.body);
    objects[objectNumber] = circle;
	createRow(circle);
}

function createCar() {
	var car = new Car(500, 100, 200, 40, 35);
	World.add(world, car.body);
}