export default class Trapezoid {
	constructor(x, y, w, h, slope, options) {
		this.body = Matter.Bodies.trapezoid(x, y, w, h, slope, options);
		console.log(this.body);
	}

	show(sketch) {
		var pos = this.body.position;
		var angle = this.body.angle;
		var vertices = this.body.vertices;

		sketch.push();
		sketch.translate(pos.x, pos.y);
		sketch.rotate(angle);
		sketch.stroke(255);
		sketch.fill(127);
		sketch.strokeWeight(3);

		// sketch.trapezoid?

		sketch.pop();
	}
}