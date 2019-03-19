export default class Box {
	constructor(x, y, w, h, options) {
		this.body = Matter.Bodies.rectangle(x, y, w, h, options);
		this.w = w;
		this.h = h; // Fix this to use vertices and what not I think? Need to use body parameters in case user changes them in UI
	}

	show(sketch) {
		var pos = this.body.position;
		var angle = this.body.angle;
		sketch.push();
		sketch.translate(pos.x, pos.y);
		sketch.rotate(angle);
		sketch.rectMode(sketch.CENTER);
		sketch.stroke(255);
		sketch.fill(127);
		sketch.strokeWeight(4);
		sketch.rect(0, 0, this.w, this.h);
		sketch.pop();
	}
}
