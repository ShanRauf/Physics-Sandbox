export default class Car {
	constructor(x, y, w, h, wheelSize) {
		Matter.Composites.car(x, y, w, h, wheelSize);
	}

	show(sketch) {
		//
	}

	isOffScreen(sketch) {
		var pos = this.body.position;
		return (pos.y < -500);
	}
}
