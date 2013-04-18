define(["rCONFIG", "rDebug", "rutils"], function(config, debug, utils) {
	function Camera() {
		this.x = 0;
		this.y = 0;
		this.width = config.screen.width / config.unitSize;
		this.height = config.screen.height / config.unitSize;
	};
	Camera.prototype.setPosition= function(args) {
		this.x = args.x;
		this.y = args.y;
	};

	Camera.prototype.zoom = function(args) {
		if (args.size) {
			this.zoomSize(args.size)
			return;
		}
		if (args.width != undefined && args.height != undefined) {
			this.zoomPixels({width: args.width, height: args.height});
			return;
		}
		console.error("INVALID Camera.zoom, args:", args);
	};

	Camera.prototype.zoomSize = function(size) {
		this.width *= size;
		this.height *= size;
	};

	Camera.prototype.zoomPixels = function(args) {
		this.width = args.width;
		this.height = args.height;
	};

	Camera.prototype.isObjectVisible = function(args) {
		this.w = this.width;
		this.h = this.height;
		var newArgs = args;
		var parallax = config.layers[args.layer].parallax || {x : 1, y : 1};
		var offset = config.layers[args.layer].offset || {x : 0, y : 0};
		args.x += offset.x;
		args.y += offset.y;
		var x = this.x * parallax.x;
		var y = this.y * parallax.y;
		if (
		args.x * parallax.x + args.w > x &&
		args.x * parallax.x < x + this.w &&
		args.y * parallax.y + args.h > y &&
		args.y * parallax.y < y + this.h) {
			newArgs.x = args.x - x;
			newArgs.y = args.y - y;
			newArgs.w = args.w;
			newArgs.h = args.h;
			return newArgs;
		} else {
			return false
		}
	};
	return new Camera();
});