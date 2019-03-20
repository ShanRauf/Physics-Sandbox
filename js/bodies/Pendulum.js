// Create composite - isStatic box as anchor for massless string, on which a circle is attached/swinging
export default class Pendulum {
	constructor(x, y, number, size, length) {
		return Matter.Composites.newtonsCradle(x, y, number, size, length);
	}

	show(sketch) {
		var pos = this.anchor.body.position;
		sketch.push();
		sketch.translate(pos.x, pos.y);
		sketch.rectMode(sketch.CENTER);
		sketch.stroke(255);
		sketch.fill(127);
		sketch.strokeWeight(2);
		sketch.rect(0, 0, this.anchor.w, this.anchor.h);
		sketch.pop();

		var pos = this.circle.body.position;
		var angle = this.circle.body.angle;
		sketch.push();
		sketch.translate(pos.x, pos.y);
		sketch.rotate(angle);
		sketch.rectMode(sketch.CENTER);
		sketch.stroke(255);
		sketch.fill(127);
		sketch.strokeWeight(2);
		sketch.circle(0, 0, this.circle.body.circleRadius);
		sketch.pop();
	}

	isOffScreen(sketch) {
		return false; // The pendulum physically cannot go offscreen
	}
}

