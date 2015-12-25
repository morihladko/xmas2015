const FLAKES = {
	'.': 1,
	'*': 2,
	'#': 3
};

export default class Flake {
	constructor(x, y, type) {
		this.x = x;
		this.y = y;
		this.z = FLAKES[type]; 

		this.type = type;
	}

	update(dt) {
		this.y += (dt / 1000) * 6;
	}

}

Flake.prototype.toString = function() {
	return this.type;
};
