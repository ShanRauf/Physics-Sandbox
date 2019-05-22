var Matter = require('matter-js');

export default class Boundary {
	constructor(x, y, w, h, options) {
		this.body = Matter.Bodies.rectangle(x, y, w, h, options);
		this.body.isStatic = true;
		this.w = w;
		this.h = h; // Fix this to use vertices and what not I think? Need to use body parameters in case user changes them in UI

	}
}