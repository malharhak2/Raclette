define (["rDebug", "rutils", "rCONFIG", "rTilesManager", "rAnimationManager", "rimageManager", "rCanvasManager", "rCamera", "rTime"], 
	function (debug, utils, config, tilesManager, animationManager, imageManager, canvasManager, camera, time) {
	var Renderer = function (args) {
		this.type = args.type;
		this.image = args.image;
		if (this.type == "tileset"){
			this.image = tilesManager.getTilesetNameFromTile(args.name);
		}
		this.name = args.name;
		this.width = args.width;
		this.height = args.height;
		this.offset = args.offset;
		this.position = args.position;
		this.state = args.state;
		this.dir = args.dir;
		this.layer = args.layer || "Background";
		this.animating = true;
		this.animCoeff = 1;
		this.init();

	};

	Renderer.prototype.update = function (args) {
		if (this.type == "spritesheet" && this.animating) {
			animationManager.animate(this);
		} else if (this.type == "tileset") {

		}
		this.position = args.position;
		this.state = args.state;
		this.dir = args.dir;
	};

	Renderer.prototype.getAnimKey = function () {
		return this.animation.step;
	}

	Renderer.prototype.pauseAnim = function () {
		this.animating = false;
	};
	Renderer.prototype.resumeAnim = function () {
		this.animating = true;
	}
	Renderer.prototype.init = function () {
		if (this.type == "spritesheet") {
			this.animation = animationManager.createAnim ({
				animName : this.image
			});
			this.animation.coordinates = {
				sx : 0,
				sy : 0,
				dw : 0,
				dh : 0

		 	};
			animationManager.animate(this);
		} else if (this.type == "tileset") {
			this.tileset = tilesManager.getTile(this.name);
		}
	};

	Renderer.prototype.render = function () {
		var co = this.getRenderCoordinates ();
		if (co) {
			this.renderInfos = {
				image : imageManager.get(this.image),
				sx : Math.floor(co.sx),
				sy : Math.floor(co.sy),
				sw : Math.floor(co.sw),
				sh : Math.floor(co.sh),
				dx : Math.floor((co.dx - this.offset.x) * config.unitSize),
				dy : Math.floor((co.dy - this.offset.y) * config.unitSize),
				dw : Math.floor(co.dw * config.unitSize),
				dh : Math.floor(co.dh * config.unitSize)
			};
			canvasManager.ctx.drawImage(
				this.renderInfos.image, 
				this.renderInfos.sx,
				this.renderInfos.sy,
				this.renderInfos.sw,
				this.renderInfos.sh,
				this.renderInfos.dx,
				this.renderInfos.dy,
				this.renderInfos.dw,
				this.renderInfos.dh
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
			if (this.tileset.animated) {
				var anim = this.tileset.anims[this.tileset.currentAnim];
				coordinates.sx = anim.x;
				coordinates.sy = anim.y;
			}
			
		}
		var cameraInfos = camera.isObjectVisible ({
			x : coordinates.dx,
			y : coordinates.dy,
			w : coordinates.dw,
			h : coordinates.dh,
			layer : this.layer
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

	Renderer.prototype.onAnimEnd = function(callback){
		var that = this;
		that.animation.step = 0;
		debug.log("assignation", "onAnimEnd")
		this.onEnd = function () {
			debug.log("this.name", "onEnd", "appel callback", callback, that.name)
			callback();
		};
	}

	return Renderer;
});