// import {Bodies} from "matter";

class Box {
	constructor(x, y, w, h) {
		this.body = Matter.Bodies.rectangle(x, y, w, h);
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}

	// show() {
	// 	var pos = this.body.position;
	// 	var angle = this.body.angle;

	// 	push();

	// 	translate(pos.x, pos.y);
	// 	rect(0, 0, this.w, this.h);
	// 	pop();
	// }
}

export default Box;