window.onYouTubePlayerAPIReady = function() {
	var player = new YT.Player('player', {
      videoId: 'YVGKfDoANRA', // this is the id of the video at youtube (the stuff after "?v=")
      loop: true,
      events: {
          onReady: function (e) {
              e.target.playVideo();
          }
      }
	}); 
};
