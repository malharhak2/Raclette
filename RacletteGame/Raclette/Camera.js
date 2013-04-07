define(["Raclette/CONFIG"], function(config) {
	function Camera() {
		this.x = 0;
		this.y = 0;
		this.width = config.width;
		this.height = config.height;
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
		if (
		args.x + args.w > this.x &&
		args.x < this.x + this.w &&
		args.y + args.h > this.y &&
		args.y < this.y + this.h) {
			newArgs.x -= this.x * this.w / config.width;
			newArgs.y -= this.y * this.h / config.height;
			newArgs.w = newArgs.w * this.w / config.width;
			newArgs.h = newArgs.h * this.h / config.height;
			return newArgs;
		} else {
			return "hidden"
		}
	};
	return Camera;
});