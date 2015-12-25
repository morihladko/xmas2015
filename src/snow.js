import _ from 'lodash';

import Flake from './flake';

const flakes = ['.', '.', '.', '*', '*', '#'];

function random(min, max) {
	return Math.random() * (max - min) + min;
}

function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

const scale = 4;

export default class Snow {
	constructor(width, height) {
		this.width  = width;
		this.height = height;

		this.flakes = [];
		this.flakesToRemove = [];

		this.buff = _.fill(new Array(height), []);
		this.buff.forEach((row, i) => {
			this.buff[i] = _.fill(new Array(width), ' ');
		});

		this.wind = -0.05;

		this.clear();
	}

	spawnFlake() {
		let x, y, flake;

		x = random(0, this.width * scale);
		y = 0;

		flake = flakes[randomInt(0, flakes.length)];

		this.flakes.push(new Flake(x, y, flake));
	}

	clear() {
		this.buff.forEach(row => {
			_.fill(row, ' ');
		});
	}

	update(dt) {
		this.clear();

		this.flakes.forEach((flake, i) => {
			let r, c, cell; 

			flake.update(dt);
			this.blow(flake);

			c = Math.round(flake.x / scale);
			r = Math.round(flake.y / scale);

			if (c < 0 || c >= this.width) {
				return;
			}

			if (r >= this.height) {
				this.removeLater(flake);
				return;
			}

			cell = this.buff[r][c];

			if (cell === ' ' || cell.z < flake.z) {
				this.buff[r][c] = flake;
			}
		});

		this.removeFlakes();
	}
	
	removeLater(flake) {
		this.flakesToRemove.push(flake);
	}

	removeFlakes() {
		this.flakes = _.without(this.flakes, ...this.flakesToRemove);

		this.flakesToRemove = [];
	}

	blow(flake) {
		flake.x += ((3 - flake.z) / 4) * this.wind;
	}
}
