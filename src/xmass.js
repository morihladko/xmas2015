import _ from 'lodash';
import Snow from './snow';


export default class Xmass {
	constructor() {
	}

	render(dt) {
		return this.snow.buff.map(row => {
			return row.join('');
		}).join('\n');
	}

	update(dt) {
		this.snow.update(dt);
	}

	load() {
		this.canvas = document.getElementById('canvas');

		this.getSize();

		this.snow = new Snow(this.cols, this.rows);

		this.spawnFlake();
	}

	spawnFlake() {
		this.snow.spawnFlake();

		setTimeout(() => {
			this.spawnFlake();
		}, Math.max(30, 10000 / this.cols));
	}

	getSize() {
		let scout = document.getElementById('scout');

		let rect = scout.getBoundingClientRect();

		if (!rect || !rect.height || !rect.width) {
			window.alert('Sorry, unsupported browser :(');
		}

		this.flakeWidth  = rect.width;
		this.flakeHeight = rect.height;

		scout.parentNode.removeChild(scout);

		this.resize();
	}

	resize() {
		this.width  = window.innerWidth;
		this.height = window.innerHeight;

		this.cols = Math.ceil(this.width / this.flakeWidth);
		this.rows = Math.ceil(this.height / this.flakeHeight);

		this.snow = new Snow(this.cols, this.rows);
	}
}
