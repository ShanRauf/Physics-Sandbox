export default class Trapezoid {
	constructor(x, y, w, h, slope, options) {
		this.body = Matter.Bodies.trapezoid(x, y, w, h, slope, options);
		console.log(this.body);
	}
}