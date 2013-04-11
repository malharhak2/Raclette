define (["Raclette/Debug", "Raclette/utils", "Raclette/CONFIG", "Raclette/TilesManager", "Raclette/AnimationManager", "Raclette/imageManager", "Raclette/CanvasManager"], 
	function (debug, utils, config, tilesManager, animationManager, imageManager, canvasManager) {
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
		var renderInfos = {
			image : this.image,
			sx : co.sx,
			sy : co.sy,
			sw : co.sw,
			sh : co.sh,
			dx : co.dx,
			dy : co.dy,
			dw : co.dw * config.unitSize,
			dh : co.dh * config.unitSize
		};
		if (utils.chances (50)) {
			debug.log ("Renderer", renderInfos);
		}
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
			if (utils.chances (300) ) {
				debug.log("Renderer", this.type, this.tileset, this.position);
			}
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
		return coordinates;
	};

	return Renderer;
});