var Matter = require('matter-js');

export default class Body {
	constructor() {
		// add to objects array; super() in child classes
	}
	isOffScreen(sketch) {
		var pos = this.body.position;
		console.log("test");
		return (pos.y > sketch.height + 100);
	}
	setDisplacement() {
		// Add or subtract from global x and y variables to get displacement
	}
	setDistance() {
		// Add all movement of object to global x and y variables
	}
	updateDOM() {
		// Runs after every engine update
	}
}