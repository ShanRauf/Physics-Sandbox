var Matter = require('matter-js');

export default class Pendulum {
	constructor(x, y, number, size, length) {
		this.body = Matter.Composites.newtonsCradle(x, y, number, size, length);
	}
}

