define(["rCONFIG", "rDebug", "rutils", "rJsonStorer"], function(config, debug, utils, jsonStorer) {
	function Camera() {
		this.x = 0;
		this.y = 0;
		this.width = config.screen.width / config.unitSize;
		this.height = config.screen.height / config.unitSize;
		this.flying = true;
		this.skyHeight = 13;
		this.floorHeight = 7;
		this.standardHeight = 11;
	};
	Camera.prototype.SetPosition= function(args) {
		if (args.x != undefined) {
			this.x = args.x - this.width / 2;
		}
		if (args.y != undefined) {
			this.y = args.y - this.height / 2;
		}
		this.checkPosition();
	};

	Camera.prototype.checkPosition = function () {
		
		var map = jsonStorer.getJson();
		this.maxPosition = {
			x : map.width - this.width,
			y : map.height - this.height,

		};
		this.minPosition = {
			x : 0,
			y : 0
		};
		if (this.x > this.maxPosition.x) {
			this.x = this.maxPosition.x;
		}
		if (this.x < this.minPosition.x) {
			this.x = this.minPosition.x;
		}
		if (this.y > this.maxPosition.y) {
			this.y = this.maxPosition.y;
		}
	};

	Camera.prototype.reset = function () {
		this.x = 0;
		this.y = 0;
	}

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

	Camera.prototype.scroll = function (attached) {
		var map = jsonStorer.getJson();
		if (attached.position.y < (map.height - this.skyHeight)) {
			this.scrollPosition ({
				y : attached.position.y - attached.oldPosition.y
			});
		} else if (attached.position.y > (map.height - this.floorHeight)) {
			this.scrollPosition ({
				y : attached.position.y - attached.oldPosition.y
			});
		} else {
			this.SetPosition ({
				y : map.height - this.standardHeight
			})
		}
		this.SetPosition ({
			x : attached.position.x
		});
	};

	Camera.prototype.scrollPosition = function (args){
		if (args.y != undefined) {
			this.y += args.y;
		}
		if (args.x != undefined) {
			this.x += args.x;
		}
		this.checkPosition();
	}

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
		var x = (this.x ) * parallax.x;
		var y = (this.y ) * parallax.y;
		if (
		args.x + args.w > x &&
		args.x < x + this.w &&
		args.y + args.h > y &&
		args.y < y + this.h) {
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