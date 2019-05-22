var Matter = require('matter-js');

export default class Body {
	isOffScreen(sketch) {
		var pos = this.body.position;
		console.log("test");
		return (pos.y > sketch.height + 100);
	}
}