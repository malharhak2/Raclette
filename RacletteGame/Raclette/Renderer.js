define (["Raclette/Debug", "Raclette/utils", "Raclette/CONFIG", "Raclette/TilesManager", "Raclette/AnimationManager", "Raclette/imageManager", "Raclette/CanvasManager", "Raclette/Camera"], 
	function (debug, utils, config, tilesManager, animationManager, imageManager, canvasManager, camera) {
	var Renderer = function (args) {
		this.type = args.type;
		this.image = args.image;
		this.name = args.name;
		this.width = args.width;
		this.height = args.height;
		this.position = args.position;
		this.state = args.state;
		this.dir = args.dir;
		this.init();
		if (utils.chances (50)) {
			debug.log("Renderer", this.position, this.width, this.height);
		}
	};

	Renderer.prototype.update = function (args) {
		if (this.type == "spritesheet") {
			animationManager.animate(this);
		} else if (this.type == "tileset") {

		}
		this.position = args.position;
		this.state = args.state;
		this.dir = args.dir;
	}
	Renderer.prototype.init = function () {
		if (this.type == "spritesheet") {
			this.animation = animationManager.createAnim ({
				animName : this.image
			});
			animationManager.animate(this);
		} else if (this.type == "tileset") {
			this.tileset = tilesManager.getTile(this.name);

		}
	};

	Renderer.prototype.render = function () {
		var co = this.getRenderCoordinates ();
		if (co) {
			var renderInfos = {
				image : this.image,
				sx : co.sx,
				sy : co.sy,
				sw : co.sw,
				sh : co.sh,
				dx : co.dx * config.unitSize,
				dy : co.dy * config.unitSize,
				dw : co.dw * config.unitSize,
				dh : co.dh * config.unitSize
			};
			canvasManager.ctx.drawImage(
				imageManager.get(renderInfos.image), 
				renderInfos.sx,
				renderInfos.sy,
				renderInfos.sw,
				renderInfos.sh,
				renderInfos.dx,
				renderInfos.dy,
				renderInfos.dw,
				renderInfos.dh
			);
		} else {
			return;
		}

	};

	Renderer.prototype.getRenderCoordinates = function () {
		
		var coordinates = {};
		if (this.type == "spritesheet") {
			coordinates = {
				sx : this.animation.coordinates.sx,
				sy : this.animation.coordinates.sy,
				sw : this.animation.coordinates.sw,
				sh : this.animation.coordinates.sh,
				dx : this.position.x,
				dy : this.position.y,
				dw : this.width,
				dh : this.height
			};
		} else if (this.type == "tileset") {
			coordinates = {
				sx : this.tileset.pos.x,
				sy : this.tileset.pos.y,
				sw : this.tileset.caseWidth,
				sh : this.tileset.caseHeight,
				dx : this.position.x,
				dy : this.position.y,
				dw : this.width,
				dh : this.height
			}
		}
		if (this.type == "spritesheet" && utils.chances(10)) {
			debug.log("Renderer", "spritesheet", this);
		}
		var cameraInfos = camera.isObjectVisible ({
			x : coordinates.dx,
			y : coordinates.dy,
			w : coordinates.dw,
			h : coordinates.dh
		});
		if (cameraInfos) {
			coordinates.dx = cameraInfos.x;
			coordinates.dy = cameraInfos.y;
			coordinates.dw = cameraInfos.w;
			coordinates.dh = cameraInfos.h;
			return coordinates;
		} else {
			return false;
		}
	};

	return Renderer;
});