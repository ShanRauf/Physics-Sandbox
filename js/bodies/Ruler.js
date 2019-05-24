var Matter = require('matter-js');

export default class Ruler {
	constructor() {
		let options = {
		    collisionFilter: {
		    	category: 0x0002,
		    	mask: 0x0002

		    },
		    render: {
		        sprite: {
		                texture: './img/ruler.png'
		            }
		        }
			}
		this.body = Matter.Bodies.rectangle(500, 500, 1020, 50, options);
		// this.w = 1020;
		// this.h = 340;
	}
}