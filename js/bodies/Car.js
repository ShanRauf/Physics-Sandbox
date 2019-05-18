var Matter = require('matter-js');

export default class Car {
	constructor(x, y, w, h, wheelSize) {
		this.body = Matter.Composites.car(x, y, w, h, wheelSize);
	}
}