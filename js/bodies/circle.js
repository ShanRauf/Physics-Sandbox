export default class Circle {
	constructor(x, y, r, options) {
		this.body = Matter.Bodies.circle(x, y, r, options);
	}

	show(sketch) {
		var pos = this.body.position;
		var angle = this.body.angle;

		sketch.push();
		sketch.translate(pos.x, pos.y);
		sketch.rotate(angle);
		sketch.stroke(255);
		sketch.fill(127);
		sketch.strokeWeight(4);
		sketch.circle(0, 0, this.body.circleRadius); // Need to use body parameters in case user changes them in UI... probably
		sketch.pop();
	}
}