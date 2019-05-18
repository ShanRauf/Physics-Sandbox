var Matter = require('matter-js');

export default class Circle {
	constructor(x, y, r, options) {
		this.body = Matter.Bodies.circle(x, y, r, options);
	}
}