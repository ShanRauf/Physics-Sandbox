var Matter = require('matter-js');

export default class Box {
	constructor(x, y, w, h, options) { // Used to have the world as a parameter so creating a new object would auto add to engine/world...
		this.body = Matter.Bodies.rectangle(x, y, w, h, options);
		this.w = w;
		this.h = h;
	}
}

// Based on the vertices, create method that calculates the exact center of the object;
// could be used for auto moving cursor to center of mass for force application
// I think position actually returns this ^