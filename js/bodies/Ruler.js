var Matter = require('matter-js');

export default class Ruler {
	constructor() {
		let options = {
			collisionFilter: {
				category: 0x0001
			},

			render: {
				sprite: {
					texture: './img/ruler.png'
				}
			}
		}
		this.body = Matter.Bodies.rectangle(400, 400, 1020, 340, options);
		// this.w = 1020;
		// this.h = 340;
	}
}
