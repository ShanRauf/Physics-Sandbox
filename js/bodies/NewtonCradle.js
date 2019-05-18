var Matter = require('matter-js');

export default class NewtonCradle {
	constructor(x, y, n, r, l) {	
	    this.body = Matter.Composites.newtonsCradle(x, y, n, r, l);
	    Matter.Body.translate(this.body.bodies[0], { x: -180, y: -100 });
	}
}