let now = (function() {
	if (window.performance) {
		return (
			window.performance.now    ||
			window.performance.mozNow ||
			window.performance.msNow  ||
			window.performance.oNow   ||
			window.performance.webkitNow).bind(window.performance);
	} else {
		return Date.now;
	}

})();

export default now;
