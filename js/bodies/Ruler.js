var Matter = require('matter-js');

export default class Ruler {
	constructor(x, y, w, h, options) {
		this.body = Matter.Bodies.rectangle(x, y, w, h, options);
		// this.w = 1020;
		// this.h = 340;
	}
}