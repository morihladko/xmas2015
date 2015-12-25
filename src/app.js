require('./style.css');
require('./youtube.js');

import Xmass from './xmass';
import now from './time';

let xmass = new Xmass(),
	lastT = now(),
	canvas;

window.xmass = xmass;

function render() {
	window.requestAnimationFrame(() => {
		canvas.innerText = xmass.render();

		render();
	});
}

function update() {
	let t = now();
	
	xmass.update(t - lastT);

	lastT = t;

	setTimeout(update, 1000/60);
}

window.addEventListener('load', () => {
	canvas = document.getElementById('canvas');
	xmass.load();

	update();
	render();
}, false);

window.addEventListener('resize', () => {
	xmass.resize();
}, false);
