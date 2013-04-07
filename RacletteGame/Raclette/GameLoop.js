define(["Raclette/Game"], function(game) {
	console.log(game);
	function run() // the run is made this way so the requestAnimFrame can access it.
	{
		if (!window.FULLSTOP) requestAnimFrame(run);
		game.logic();
		game.render();
	}

	function init () {

	}

	window.requestAnimFrame = (function(){
		return  window.requestAnimationFrame       || 
		window.webkitRequestAnimationFrame || 
		window.mozRequestAnimationFrame    || 
		window.oRequestAnimationFrame      || 
		window.msRequestAnimationFrame     || 
		function( callback ){
			window.setTimeout(callback, 1000 / 60);
		};
	})();

	return {
		run: run,
		init : init
	};
});